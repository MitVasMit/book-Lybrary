document.addEventListener("DOMContentLoaded", () => {
  const bestsellerList = document.getElementById("bestseller-list");

  fetch("https://openlibrary.org/search.json?q=bestsellers&limit=9")
    .then(res => res.json())
    .then(data => {
      const books = data.docs;

      books.forEach(book => {
        const cover = book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
          : "/assets/images/no-cover.png";

        const slide = document.createElement("div");
        slide.className = "swiper-slide p-4";

        slide.innerHTML = `
          <div class="bg-white dark:bg-gray-700 rounded shadow p-4 flex flex-col items-center">
            <img src="${cover}" alt="${book.title}" class="w-32 h-40 object-cover rounded mb-2" />
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white text-center">${book.title}</h3>
            <p class="text-xs text-gray-600 dark:text-gray-300 text-center">${book.author_name?.[0] || "Unknown Author"}</p>
          </div>
        `;

        bestsellerList.appendChild(slide);
      });

      // swiper for the carousel
      new Swiper(".bestseller-swiper", {
        slidesPerView: 3,
        spaceBetween: 20,
        loop: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        breakpoints: {
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        },
      });
    })
    .catch(err => {
      bestsellerList.innerHTML = `<p class="text-red-600 mx-auto">Failed to load bestsellers.</p>`;
      console.error(err);
    });
});
