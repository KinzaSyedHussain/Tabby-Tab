function updateTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0')
  document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;


const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'};
document.getElementById('date').textContent = now.toLocaleDateString('en-US', options);
}

setInterval(updateTime, 1000);
updateTime();


const bgUpload = document.getElementById('bg-upload');
const bgColor = document.getElementById('bg-color')
const savedBg = localStorage.getItem('customBg');
const savedBgColor = localStorage.getItem('customBgColor');
if (savedBg) {
  document.body.style.backgroundImage = `url(${savedBg})`;
} else if (savedBgColor) {
  document.body.style.backgroundColor = savedBgColor;
  bgColor.value = savedBgColor;
}

if (bgColor) {
  bgColor.addEventListener('input', (e) => {
    const color = e.target.value;
    document.body.style.backgroundImage = 'none';
    document.body.style.backgroundColor = color;
    localStorage.setItem('customBgColor', color);
    localStorage.removeItem('customBg');
  });
}

if (bgUpload) {
  bgUpload.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const imageData = event.target.result;
      document.body.style.backgroundImage = `url(${imageData})`;
      localStorage.setItem('customBg', imageData);
    };
    reader.readAsDataURL(file);
  }
});
}

const defaultShortcuts = [
  { title: 'GitHub', url: 'https://github.com'},
  { title: 'Youtube', url: 'https://youtube.com'},
  { title: 'Hack Club', url: 'https://hackclub.com' },
  { title: 'Gmail', url: 'https://gmail.com'}
]

let shortcuts = JSON.parse(localStorage.getItem('tabbyShortcuts')) || defaultShortcuts;

function getFaviconUrl(url) {
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  } catch {
    return '';
  }
}

function renderShortcuts() {
  const container = document.getElementById('shortcutlist');
  if (!container) return;
  container.innerHTML = '';


shortcuts.forEach((shortcut, index) => {
  const link = document.createElement('a');
  link.href = shortcuts.url;
  link.className = 'shortcut';
  link.title = shortcut.title;

  const img = document.createElement('img');
  img.src = getFaviconUrl(shortcut.url);
  img.alt = shortcut.title;

  const delBtn = document.createElement('button');
  delBtn.className = 'delete-btn';
  delBtn.textContent = 'x';
  delBtn.onclick = (e) => {
    e.preventDefault();
    shortcuts.splice(index, 1);
    saveShortcuts();
  };

  link.appendChild(img);
  link.appendChild(delBtn);
  container.appendChild(link)
});

}

function saveShortcuts() {
  localStorage.setItem('tabbyShortcuts', JSON.stringify(shortcuts));
  renderShortcuts();
}

const modal = document.getElementById('shortcut-modal');
const addBtn = document.getElementById('addshortcut-btn');
const closeBtn = document.getElementById('close-modal-btn');
const form = document.getElementById('shortcut-form');

addBtn.addEventListener('click', () => modal.showModal());
closeBtn.addEventListener('click', () => modal.close());


form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('shortcut-title').value.trim();
  let url = document.getElementById('shortcut-url').value.trim();

  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
  }

  if (title && url) {
    shortcuts.push({ title, url });
    saveShortcuts();
    form.reset();
    modal.close();
  }
});

renderShortcuts();