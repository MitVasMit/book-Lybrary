const toggle = document.getElementById("darkToggle");

function setDarkMode(isDark) {
  if (isDark) {
    document.documentElement.classList.add("dark");
    toggle.textContent = "🌞";
    localStorage.setItem("darkMode", "enabled");
  } else {
    document.documentElement.classList.remove("dark");
    toggle.textContent = "🌙";
    localStorage.setItem("darkMode", "disabled");
  }
}

// when DOM loaded, see if dark-mode enabled/disabled
const darkModeSetting = localStorage.getItem("darkMode");

if (darkModeSetting === "enabled") {
  setDarkMode(true);
} else {
  setDarkMode(false);
}

if (toggle) {
  toggle.addEventListener("click", () => {
    const isDarkNow = document.documentElement.classList.contains("dark");
    setDarkMode(!isDarkNow);
  });
}

function dismissFlash() {
  const flash = document.getElementById("flash-message");
  if (flash) {
    flash.style.transition = "opacity 1s ease";
    flash.style.opacity = "0";

    // Remove from DOM after the fade-out transition completes (1s)
    setTimeout(() => {
      flash.remove();
    }, 1000);
  }
}

// auto-dismiss after 3 sec, then fade for 1 sec
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(dismissFlash, 3000);
});
