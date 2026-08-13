/**
 * =====================================================
 * LOGIN PAGE
 * =====================================================
 * Halaman ini DEMO/UI ONLY - tidak ada autentikasi nyata.
 * Submit form hanya memvalidasi format input di sisi client,
 * lalu redirect ke dashboard (/index.html). Saat backend
 * auth sudah ada, ganti handleSubmit() di bawah supaya
 * memanggil endpoint login sesungguhnya.
 * =====================================================
 */

/* =====================================================
   LIVE CLOCK (telemetry strip)
===================================================== */

function updateClock() {
  const el = document.getElementById("liveClock");
  if (!el) return;

  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  el.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
}

updateClock();
setInterval(updateClock, 1000);

/* =====================================================
   TOGGLE PASSWORD VISIBILITY
===================================================== */

document.getElementById("togglePassword").addEventListener("click", () => {
  const input = document.getElementById("password");
  const btn = document.getElementById("togglePassword");
  const icon = btn.querySelector("i");

  const isHidden = input.type === "password";
  input.type = isHidden ? "text" : "password";
  icon.className = isHidden ? "fa-solid fa-eye-slash" : "fa-solid fa-eye";
  btn.setAttribute("aria-label", isHidden ? "Sembunyikan kata sandi" : "Tampilkan kata sandi");
});

/* =====================================================
   VALIDASI & SUBMIT
===================================================== */

const form = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const btnSubmit = document.getElementById("btnSubmit");

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function clearErrors() {
  emailError.textContent = "";
  passwordError.textContent = "";
  emailInput.classList.remove("invalid");
  passwordInput.classList.remove("invalid");
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  clearErrors();

  let valid = true;

  if (!emailInput.value.trim()) {
    emailError.textContent = "Email wajib diisi.";
    emailInput.classList.add("invalid");
    valid = false;
  } else if (!isValidEmail(emailInput.value.trim())) {
    emailError.textContent = "Format email tidak valid.";
    emailInput.classList.add("invalid");
    valid = false;
  }

  if (!passwordInput.value) {
    passwordError.textContent = "Kata sandi wajib diisi.";
    passwordInput.classList.add("invalid");
    valid = false;
  } else if (passwordInput.value.length < 4) {
    passwordError.textContent = "Kata sandi minimal 4 karakter.";
    passwordInput.classList.add("invalid");
    valid = false;
  }

  if (!valid) return;

  handleSubmit();
});

function handleSubmit() {
  btnSubmit.disabled = true;
  btnSubmit.innerHTML = `<i class="fa-solid fa-spinner"></i> <span class="btn-label">Memverifikasi...</span>`;

  // Simulasi proses autentikasi (demo only, lihat catatan di atas)
  setTimeout(() => {
    location.href = "/index.html";
  }, 900);
}