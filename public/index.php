<?php include('../includes/header.php'); ?>

<div class="max-w-6xl mx-auto py-8">
    <h2 class="text-2xl font-bold mb-4 text-center">Our Bestsellers:</h2>

    <div class="m-8 swiper bestseller-swiper">


        <div id="bestseller-loader" class="flex justify-center items-center my-12">
            <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>

        <div class="swiper-wrapper mb-10 hidden" id="bestseller-list"></div>

        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-pagination"></div>
    </div>
</div>

<section class="py-20 bg-gray-100 dark:bg-gray-800">
    <div class="container mx-auto px-4">
        <h2 class="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Our Books:</h2>
        <div id="book-list-loader" class="flex justify-center items-center my-12 hidden">
            <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <div id="book-list" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"></div>

        <div id="pagination" class="flex justify-end items-center mt-10"></div>
    </div>
</section>

<button id="scrollToTopBtn"
    class="fixed bottom-8 right-8 p-3 bg-blue-700 text-white rounded-full shadow-lg opacity-0 pointer-events-none transition-opacity duration-300 hover:bg-blue-800 z-50"
    aria-label="Scroll to top">
    <!-- You can use an up arrow icon (SVG) -->
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
    </svg>
</button>

<?php include('../includes/footer.php'); ?>