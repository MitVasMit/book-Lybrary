<aside
  id="adminSidebar"
  class="min-h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white flex flex-col py-6 px-4 transition-all duration-300 ease-in-out"
  style="width: 16rem;"
>
  <!-- Header -->
  <div class="flex items-center justify-between mb-4">
    <h2 id="sidebarTitle" class="text-xl font-bold">Dashboard</h2>
  </div>

  <!-- Button + Nav wrapper -->
  <div class="flex flex-col gap-4">
    <!-- Toggle button (fixed position in layout) -->
    <div class="flex justify-end">
      <button
        id="toggleSidebar"
        class="p-2 rounded hover:bg-gray-100 text-gray-500 dark:text-gray-300 hover:text-blue-500 focus:outline-none text-2xl leading-none transition-transform duration-300"
        title="Toggle sidebar"
      >
        &#8592;
      </button>
    </div>

    <!-- Navigation -->
    <nav class="flex flex-col space-y-2">
      <a href="books.php" class="flex items-center space-x-3 px-3 py-3 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
        <span class="text-xl">📚</span>
        <span class="sidebar-text transition-opacity duration-300">Manage Books</span>
      </a>
      <a href="categories.php" class="flex items-center space-x-3 px-3 py-3 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
        <span class="text-xl">🏷️</span>
        <span class="sidebar-text transition-opacity duration-300">Book Categories</span>
      </a>
      <a href="comments.php" class="flex items-center space-x-3 px-3 py-3 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
        <span class="text-xl">💬</span>
        <span class="sidebar-text transition-opacity duration-300">Private Comments</span>
      </a>
      <a href="reviews.php" class="flex items-center space-x-3 px-3 py-3 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
        <span class="text-xl">⭐</span>
        <span class="sidebar-text transition-opacity duration-300">Reviews</span>
      </a>
    </nav>
  </div>
</aside>
