document.addEventListener("DOMContentLoaded", () => {
  const categories = [
    "computer_programming",
    "science",
    "history",
    "fantasy",
    "romance",
    "biography",
    "art",
    "philosophy",
  ];

  const loader = document.getElementById("book-list-loader");
  const bookList = document.getElementById("book-list");
  loader.classList.remove("hidden");
  const pagination = document.getElementById("pagination");

  const booksPerPage = 20;
  let currentPage = 1;
  let books = [];

  //take random category
  const randomCategory =
    categories[Math.floor(Math.random() * categories.length)];

  fetch(`https://openlibrary.org/subjects/${randomCategory}.json?limit=100`)
    .then((res) => res.json())
    .then((data) => {
      loader.classList.add("hidden");
      books = data.works || [];
      renderPage(currentPage);
      setupPagination();
    })
    .catch((err) => {
      loader.classList.add("hidden");
      bookList.innerHTML = `<p class="text-red-600">Error loading Books.</p>`;
      console.error(err);
    });

  function renderPage(page) {
    bookList.innerHTML = "";

    const start = (page - 1) * booksPerPage;
    const end = start + booksPerPage;
    const pageBooks = books.slice(start, end);

    if (pageBooks.length === 0) {
      bookList.innerHTML = `<p class="text-gray-700 dark:text-gray-300">No books to display.</p>`;
      return;
    }

    pageBooks.forEach((book) => {
      const cover = book.cover_id
        ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`
        : null;

      const item = document.createElement("div");
      item.className =
        "bg-white dark:bg-gray-700 rounded-lg shadow-md p-2 mx-auto flex flex-col items-center w-full max-w-[160px] min-h-[320px] hover:scale-105 transition duration-300 ease-in-out cursor-pointer";
      
      // Add click event to open book modal
      item.addEventListener('click', () => {
        console.log('Regular book clicked:', book);
        window.openBookModal(book);
      });

      if (cover) {
        item.innerHTML = `
      <img src="${cover}" alt="${book.title}" 
     class="w-[120px] h-[180px] object-contain mb-4 p-2 bg-white rounded shadow" />

      <h3 class="text-md font-semibold text-gray-900 dark:text-white text-center">${
        book.title
      }</h3>
      <p class="text-sm text-gray-600 dark:text-gray-300 text-center">${
        book.authors?.[0]?.name || "Unknown Author"
      }</p>
    `;
      } else {
        item.innerHTML = `
      <div class="w-full max-w-[150px] h-[200px] flex items-center justify-center bg-gray-200 dark:bg-gray-600 mb-4 rounded text-gray-500 dark:text-gray-400 italic text-center px-2">
        No cover available from this book.
      </div>
      <h3 class="text-md font-semibold text-gray-900 dark:text-white text-center">${
        book.title
      }</h3>
      <p class="text-sm text-gray-600 dark:text-gray-300 text-center">${
        book.authors?.[0]?.name || "Unknown Author"
      }</p>
    `;
      }

      bookList.appendChild(item);
    });
  }

  function setupPagination() {
    pagination.innerHTML = "";

    const totalPages = Math.ceil(books.length / booksPerPage);

    // Create pagination container
    const paginationContainer = document.createElement("div");
    paginationContainer.className = "flex items-center justify-end space-x-2 w-full";

    const prevBtn = document.createElement("button");
    prevBtn.textContent = "Previous";
    prevBtn.disabled = currentPage === 1;
    prevBtn.className =
      "px-3 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:hover:bg-gray-300 text-white rounded-md transition-colors duration-200 text-sm font-medium";
    prevBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        renderPage(currentPage);
        setupPagination();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });

    const pageInfo = document.createElement("div");
    pageInfo.className = "text-xs text-gray-700 dark:text-gray-300 font-medium px-2";
    pageInfo.innerHTML = `Page <span class="font-bold text-blue-600 dark:text-blue-400">${currentPage}</span> of <span class="font-bold">${totalPages}</span>`;

    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Next";
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.className =
      "px-3 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:hover:bg-gray-300 text-white rounded-md transition-colors duration-200 text-sm font-medium";
    nextBtn.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderPage(currentPage);
        setupPagination();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });

    paginationContainer.appendChild(prevBtn);
    paginationContainer.appendChild(pageInfo);
    paginationContainer.appendChild(nextBtn);
    pagination.appendChild(paginationContainer);
  }

  // Modal functions
  let touchStartX = 0;
  let touchEndX = 0;

  // Make openBookModal function globally accessible
  window.openBookModal = function(book) {
    const modal = document.getElementById('bookModal');
    const bookElement = document.getElementById('book');
    const closeBtn = document.getElementById('closeBtn');
    const coverElement = document.querySelector('.cover');
    
    // Update modal content with book data immediately
    document.getElementById('bookTitle').textContent = book.title;
    document.getElementById('bookAuthor').textContent = `Author: ${book.authors?.[0]?.name || "Unknown Author"}`;
    document.getElementById('coverTitle').textContent = book.title;
    document.getElementById('coverAuthor').textContent = book.authors?.[0]?.name || "Unknown Author";
    
    // Set default background immediately
    coverElement.style.background = '#8b5e3c';
    coverElement.style.backgroundImage = 'none';
    
    // Start modal animation immediately (no delay)
    modal.style.display = 'flex';
    
    // Reset close button
    closeBtn.style.opacity = '0';
    closeBtn.style.transition = 'none';
    void closeBtn.offsetWidth;
    
    // Start the opening animation immediately
    setTimeout(() => {
      bookElement.classList.add('opened');
    }, 10);

    // Show close button after animation starts
    setTimeout(() => {
      closeBtn.style.transition = 'opacity 0.4s ease';
      closeBtn.style.opacity = '1';
    }, 400);

    // Add click event listener to modal backdrop
    modal.addEventListener('click', handleModalClick);
    
    // Load cover image immediately (use medium size that's likely already cached)
    if (book.cover_image) {
      const coverImageUrl = `/book-Library/uploads/${book.cover_image}`;
      coverElement.style.background = `linear-gradient(rgba(0,0,0,0.08), rgba(0,0,0,0.08)), url(${coverImageUrl})`;
      coverElement.style.backgroundSize = 'cover';
      coverElement.style.backgroundPosition = 'center';
      coverElement.style.backgroundRepeat = 'no-repeat';
    } else if (book.cover_id) {
      const coverImageUrl = `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`;
      coverElement.style.background = `linear-gradient(rgba(0,0,0,0.08), rgba(0,0,0,0.08)), url(${coverImageUrl})`;
      coverElement.style.backgroundSize = 'cover';
      coverElement.style.backgroundPosition = 'center';
      coverElement.style.backgroundRepeat = 'no-repeat';
    } else {
      // No cover image, keep default background
      coverElement.style.background = '#8b5e3c';
      coverElement.style.backgroundImage = 'none';
    }
    
    // Fetch additional book details if we have a key
    if (book.key) {
      fetch(`https://openlibrary.org${book.key}.json`)
        .then(response => response.json())
        .then(data => {
          if (data.description) {
            const description = typeof data.description === 'string' ? data.description : data.description.value;
            document.getElementById('bookDescription').textContent = description;
          }
          if (data.number_of_pages_median) {
            document.getElementById('bookDetails').textContent = `Pages: ${data.number_of_pages_median}`;
          }
        })
        .catch(err => {
          console.log('Could not fetch book details');
        });
    }
  };

  function handleModalClick(event) {
    const modal = document.getElementById('bookModal');
    const bookWrapper = document.querySelector('.book-wrapper');
    
    // Close modal if clicking on the backdrop (not on the book wrapper)
    if (event.target === modal) {
      window.closeBook();
    }
  }

  // Make closeBook function globally accessible
  window.closeBook = function() {
    const modal = document.getElementById('bookModal');
    const book = document.getElementById('book');
    const closeBtn = document.getElementById('closeBtn');
    
    // Remove the click event listener
    modal.removeEventListener('click', handleModalClick);
    
    closeBtn.style.transition = 'opacity 0.4s ease';
    closeBtn.style.opacity = '0';
    book.classList.remove('opened');
    
    setTimeout(() => {
      modal.style.display = 'none';
    }, 1000);
  };

  // Touch events for mobile
  document.addEventListener('DOMContentLoaded', () => {
    const leftPage = document.querySelector('.left-page');
    
    if (leftPage) {
      leftPage.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      });

      leftPage.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipeGesture();
      });
    }
  });

  function handleSwipeGesture() {
    const swipeThreshold = 50;
    
    if (touchEndX - touchStartX > swipeThreshold) {
      window.closeBook();
    }
  }
});
