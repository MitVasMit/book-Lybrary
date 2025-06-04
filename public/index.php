<?php include('../includes/header.php'); ?>

<?php if (!empty($_SESSION['errors']['auth'])): ?>
    <div id="flash-message" class="relative bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center max-w-xl mx-auto my-6 transition-opacity duration-500 ease-in-out">
        <span><?= $_SESSION['errors']['auth'];
                unset($_SESSION['errors']['auth']); ?></span>
        <button class="absolute top-0 right-0 px-3 py-2 text-red-700 hover:text-red-900" onclick="dismissFlash()">
            &times;
        </button>
    </div>
<?php endif; ?>

<div class="max-w-6xl mx-auto py-8">
    <h2 class="text-2xl font-bold mb-4 text-center">Our Bestsellers:</h2>

    <div class="m-8 swiper bestseller-swiper">
        <div class="swiper-wrapper mb-10" id="bestseller-list">
            <!-- randering bestsellers here (bestsellers.js fetch) -->
        </div>

        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>

        <div class="swiper-pagination"></div>
    </div>
</div>

<section class="py-20 bg-gray-100 dark:bg-gray-800">
    <div class="container mx-auto px-4">
        <h2 class="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Our Books:</h2>
        <div id="book-list" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            <!-- books rendering here books.js fetch -->
        </div>
        <div id="pagination" class="flex justify-center items-center mt-6"></div>
    </div>
</section>

<?php include('../includes/footer.php'); ?>