document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("adminSidebar");
  const toggleBtn = document.getElementById("toggleSidebar");
  const sidebarTextItems = document.querySelectorAll(".sidebar-text");
  const sidebarTitle = document.getElementById("sidebarTitle");

  let isExpanded = true;

  function updateSidebar() {
    if (isExpanded) {
      sidebar.style.width = "16rem"; 
      sidebarTitle.style.visibility = "visible";
      sidebar.classList.remove('collapsed');

      sidebarTextItems.forEach((el) => {
        el.style.opacity = "1";
        el.style.visibility = "visible";
        el.style.transition = "opacity 0.3s ease";
      });

      toggleBtn.innerHTML = "&#8592;"; 
      toggleBtn.style.transform = "none"; 
    } else {
      sidebar.style.width = "5rem"; 
      sidebarTitle.style.visibility = "hidden";
      sidebar.classList.add('collapsed');

      sidebarTextItems.forEach((el) => {
        el.style.opacity = "0";
        el.style.visibility = "hidden";
        el.style.transition = "opacity 0.3s ease";
      });

      toggleBtn.innerHTML = "&#8594;"; 
      toggleBtn.style.transform = "none"; 
    }
  }
  
  toggleBtn.addEventListener("click", () => {
    isExpanded = !isExpanded;
    updateSidebar();
  });

  updateSidebar();
});
