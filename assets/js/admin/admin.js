document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("adminSidebar");
  const toggleBtn = document.getElementById("toggleSidebar");
  const sidebarTextItems = document.querySelectorAll(".sidebar-text");
  const sidebarTitle = document.getElementById("sidebarTitle");

  toggleBtn.addEventListener("click", function () {
    const collapsed = sidebar.classList.contains("w-64");

    if (collapsed) {
      sidebar.classList.remove("w-64");
      sidebar.classList.add("w-20");
      sidebarTitle.style.display = "none";
      sidebarTextItems.forEach((el) => (el.style.display = "none"));
    } else {
      sidebar.classList.add("w-64");
      sidebar.classList.remove("w-20");
      sidebarTitle.style.display = "block";
      sidebarTextItems.forEach((el) => (el.style.display = "inline"));
    }
  });
});
