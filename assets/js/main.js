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

document.addEventListener("DOMContentLoaded", () => {
  const scrollBtn = document.getElementById("scrollToTopBtn");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      scrollBtn.classList.remove("opacity-0", "pointer-events-none");
      scrollBtn.classList.add("opacity-100", "pointer-events-auto");
    } else {
      scrollBtn.classList.add("opacity-0", "pointer-events-none");
      scrollBtn.classList.remove("opacity-100", "pointer-events-auto");
    }
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
