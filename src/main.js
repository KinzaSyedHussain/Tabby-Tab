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
  bgColor.addEventListener('change', (e) => {
    const color = e.target.value;
    document.body.style.backgroundImage = 'none';
    document.body.style.backgroundColor = color;
    localStorage.setItem('customBgColor', color);
    localStorage.removeItem('customBgImage');
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