document.addEventListener("DOMContentLoaded", () => {
  const bestsellerList = document.getElementById("bestseller-list");
  const bestsellerLoader = document.getElementById("bestseller-loader");

  bestsellerLoader.classList.remove("hidden");
  bestsellerList.classList.add("hidden");

  fetch("https://openlibrary.org/search.json?q=bestsellers&limit=9")
    .then((res) => res.json())
    .then((data) => {
      const books = data.docs;

      books.forEach((book) => {
        const cover = book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
          : "/assets/images/no-cover.png";

        const slide = document.createElement("div");
        slide.className = "swiper-slide p-4";

        slide.innerHTML = `
          <div class="bg-white dark:bg-gray-700 rounded shadow p-4 flex flex-col items-center max-w-[180px] mx-auto cursor-pointer hover:scale-105 transition-transform duration-300">
            <div class="w-full h-[220px] p-2 bg-white dark:bg-gray-600 rounded flex items-center justify-center">
              <img src="${cover}" alt="${
          book.title
        }" class="max-h-full object-contain" />
            </div>
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white text-center mt-3">${
              book.title
            }</h3>
            <p class="text-xs text-gray-600 dark:text-gray-300 text-center">${
              book.author_name?.[0] || "Unknown Author"
            }</p>
          </div>
`;

        bestsellerList.appendChild(slide);
        
        // Add click event listener to make the book clickable
        const bookCard = slide.querySelector('div');
        bookCard.addEventListener('click', () => {
          // Convert bestseller data format to match modal expectations
          const bookData = {
            title: book.title,
            authors: [{ name: book.author_name?.[0] || "Unknown Author" }],
            cover_id: book.cover_i,
            key: book.key || null
          };
          
          // Open the modal with the book data
          if (typeof window.openBookModal === 'function') {
            window.openBookModal(bookData);
          }
        });
      });

      bestsellerLoader.classList.add("hidden");
      bestsellerList.classList.remove("hidden");

      // swiper for the carousel
      new Swiper(".bestseller-swiper", {
  slidesPerView: 3,
  spaceBetween: 20,
  loop: true, // Enable infinite loop
  autoplay: {
    delay: 3000, // Time between slides in ms
    disableOnInteraction: false, // Keeps autoplay going after user interaction
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    640: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  },
});
    })
    .catch((err) => {
      bestsellerLoader.classList.add("hidden");
      bestsellerList.innerHTML = `<p class="text-red-600 mx-auto">Failed to load bestsellers.</p>`;
      console.error(err);
    });
});
