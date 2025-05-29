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

  const bookList = document.getElementById("book-list");
  const pagination = document.getElementById("pagination");

  const booksPerPage = 20;
  let currentPage = 1;
  let books = [];

  //take random category
  const randomCategory =
    categories[Math.floor(Math.random() * categories.length)];
  console.log("Kategorie:", randomCategory);

  fetch(`https://openlibrary.org/subjects/${randomCategory}.json?limit=100`)
    .then((res) => res.json())
    .then((data) => {
      books = data.works || [];
      renderPage(currentPage);
      setupPagination();
    })
    .catch((err) => {
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
        "bg-white dark:bg-gray-700 rounded shadow p-8 mx-auto flex flex-col items-center max-w-xs";

      if (cover) {
        item.innerHTML = `
      <img src="${cover}" alt="${book.title}" 
           class="w-full max-w-[150px] max-h-[200px] object-contain mb-4 rounded" />
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

    const prevBtn = document.createElement("button");
    prevBtn.textContent = "Back";
    prevBtn.disabled = currentPage === 1;
    prevBtn.className =
      "px-4 py-2 mr-2 bg-gray-300 dark:bg-gray-600 rounded disabled:opacity-50";
    prevBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        renderPage(currentPage);
        setupPagination();
      }
    });

    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Next";
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.className =
      "px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded disabled:opacity-50";
    nextBtn.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderPage(currentPage);
        setupPagination();
      }
    });

    pagination.appendChild(prevBtn);

    const pageInfo = document.createElement("span");
    pageInfo.textContent = ` Page ${currentPage} from ${totalPages} `;
    pageInfo.className = "text-xs text-gray-500 dark:text-gray-300 mx-2";
    pagination.appendChild(pageInfo);

    pagination.appendChild(nextBtn);

    nextBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    prevBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
