<?php
require_once __DIR__ . '/../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();
session_start();
include('../includes/header.php');
require_once __DIR__ . '/../includes/autoload.php';

include('../includes/admin/admin_nav.php');

$books = $bookModel->getAllWithCategory();
?>

<main class="ml-64 p-6 bg-gray-100 min-h-screen">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Manage Books</h1>

    <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        <?php foreach ($books as $book): ?>
            <div class="bg-white rounded-xl shadow p-3 flex flex-col justify-between hover:shadow-md transition">
                <img src="/uploads/<?= htmlspecialchars($book['cover_image']) ?>" alt="Cover"
                    class="w-full h-40 object-cover rounded mb-3">
                <h3 class="text-sm font-semibold truncate"><?= htmlspecialchars($book['title']) ?></h3>
                <p class="text-xs text-gray-500 mb-1 truncate"><?= htmlspecialchars($book['author']) ?></p>
                <p class="text-xs text-blue-600 mb-2"><?= htmlspecialchars($book['category_name']) ?></p>

                <div class="mt-auto flex gap-2">
                    <a href="edit_book.php?id=<?= $book['id'] ?>"
                        class="text-xs bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded">Edit</a>
                    <form action="../actions/admin/delete_book.php" method="POST" onsubmit="return confirm('Delete this book?')">
                        <input type="hidden" name="id" value="<?= $book['id'] ?>">
                        <button type="submit"
                            class="text-xs bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded">Delete</button>
                    </form>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
</main>

<?php include('../includes/footer.php'); ?>