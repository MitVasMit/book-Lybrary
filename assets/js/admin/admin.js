document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("adminSidebar");
  const toggleBtn = document.getElementById("toggleSidebar");
  const sidebarTextItems = document.querySelectorAll(".sidebar-text");
  const sidebarTitle = document.getElementById("sidebarTitle");

  let isExpanded = true;

  function updateSidebar() {
    if (isExpanded) {
      sidebar.style.width = "16rem"; // expanded
      sidebarTitle.style.display = "block";

      sidebarTextItems.forEach((el) => {
        el.style.opacity = "1";
        el.style.visibility = "visible";
        el.style.transition = "opacity 0.3s ease";
      });

      toggleBtn.innerHTML = "&#8592;";
      toggleBtn.style.transform = "rotate(0deg)";
    } else {
      sidebar.style.width = "5rem"; // collapsed
      sidebarTitle.style.display = "none";

      sidebarTextItems.forEach((el) => {
        el.style.opacity = "0";
        el.style.visibility = "hidden";
        el.style.transition = "opacity 0.3s ease";
      });

      // toggleBtn.innerHTML = "&#8594;";
      toggleBtn.style.transform = "rotate(180deg)";
      toggleBtn.style.transition = ".5s";
    }
  }
  toggleBtn.addEventListener("click", () => {
    isExpanded = !isExpanded;
    updateSidebar();
  });

  updateSidebar();
});
