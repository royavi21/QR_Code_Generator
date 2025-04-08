const qrCodeContainer = document.getElementById('qrcode');
const textInput = document.getElementById('text');
const generateBtn = document.getElementById('generate');
const downloadPngBtn = document.getElementById('download-png');
const downloadJpgBtn = document.getElementById('download-jpg');
const downloadButtons = document.getElementById('download-buttons');

// Generate QR Code
generateBtn.addEventListener('click', () => {
  const text = textInput.value.trim();
  if (!text) return alert("Please enter a valid URL or text");

  qrCodeContainer.innerHTML = "";

  const qrCode = new QRCode(qrCodeContainer, {
    text: text,
    width: 256,
    height: 256,
  });

  setTimeout(() => {
    downloadButtons.style.display = "flex";
  }, 300);
});

// Download as PNG
downloadPngBtn.addEventListener('click', () => {
  const img = qrCodeContainer.querySelector('img');
  if (img) {
    const a = document.createElement('a');
    a.href = img.src;
    a.download = 'qr-code.png';
    a.click();
  }
});

// Download as JPG
downloadJpgBtn.addEventListener('click', () => {
  const canvas = qrCodeContainer.querySelector('canvas');
  if (canvas) {
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/jpeg');
    a.download = 'qr-code.jpg';
    a.click();
  }
});

// Dark Mode Toggle Logic
const darkModeToggle = document.getElementById('darkModeToggle');
const themeIcon = document.getElementById('themeIcon');

function updateIcon(isDark) {
  themeIcon.className = isDark ? 'icon fas fa-moon' : 'icon fas fa-lightbulb';
}

darkModeToggle.addEventListener('change', () => {
  const isDark = darkModeToggle.checked;
  document.body.classList.toggle('dark', isDark);
  updateIcon(isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  const isDark = savedTheme === 'dark';
  document.body.classList.toggle('dark', isDark);
  darkModeToggle.checked = isDark;
  updateIcon(isDark);
});
