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