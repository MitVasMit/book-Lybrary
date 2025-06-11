<aside id="adminSidebar" class="w-64 transition-all duration-300 bg-gray-800 text-white h-screen flex flex-col py-6 px-4 space-y-6 fixed left-0 top-0 z-50">
    <div class="flex items-center justify-between">
        <h2 id="sidebarTitle" class="text-xl font-bold">Admin Panel</h2>
        <button id="toggleSidebar" class="text-white focus:outline-none text-2xl leading-none">&times;</button>
    </div>
    <nav class="flex flex-col space-y-2 mt-4">

        <a href="books.php" class="flex items-center space-x-3 hover:bg-gray-700 px-3 py-3 rounded transition-colors">
            <span class="text-xl">📚</span>
            <span class="sidebar-text">Manage Books</span>
        </a>

        <a href="categories.php" class="flex items-center space-x-3 hover:bg-gray-700 px-3 py-3 rounded transition-colors">
            <span class="text-xl">🏷️</span>
            <span class="sidebar-text">Book Categories</span>
        </a>

        <a href="comments.php" class="flex items-center space-x-3 hover:bg-gray-700 px-3 py-3 rounded transition-colors">
            <span class="text-xl">💬</span>
            <span class="sidebar-text">Private Comments</span>
        </a>

        <a href="reviews.php" class="flex items-center space-x-3 hover:bg-gray-700 px-3 py-3 rounded transition-colors">
            <span class="text-xl">⭐</span>
            <span class="sidebar-text">Reviews</span>
        </a>
    </nav>
</aside>