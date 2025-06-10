let debounceTimeout;
const searchInput = document.getElementById("searchInput");
const bookList = document.getElementById("book-list");
const pagination = document.getElementById("pagination");

searchInput.addEventListener("input", () => {
  clearTimeout(debounceTimeout);
  const query = searchInput.value.trim();

  debounceTimeout = setTimeout(() => {
    fetchBooks(query);
  }, 300);
});

function fetchBooks(query) {
  pagination.classList.add("hidden");
  const loader = document.getElementById("book-list-loader");
  loader.classList.remove("hidden");
  bookList.innerHTML = "";

  fetch("/book-Library/actions/book_search.php?q=" + encodeURIComponent(query))
    .then((response) => response.json())
    .then((data) => {
      if (data.length === 0) {
        bookList.innerHTML =
          '<p class="text-center col-span-full text-gray-500">No results found.</p>';
        return;
      }

      data.forEach((book) => {
        const item = document.createElement("div");
        item.className =
          "bg-white dark:bg-gray-700 rounded-lg shadow-md p-2 mx-auto flex flex-col items-center w-full max-w-[160px] min-h-[320px] hover:scale-105 transition duration-300 ease-in-out";

        const sourceTag = `<span class="mt-2 text-xs px-2 py-1 text-blue-800 dark:text-gray-300 rounded">${book.source}</span>`;

        if (book.cover_id) {
          item.innerHTML = `
            <img src="https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg" alt="${book.title}"
                class="w-[120px] h-[180px] object-contain mb-4 p-2 bg-white rounded shadow" />
            <h3 class="text-md font-semibold text-gray-900 dark:text-white text-center">${book.title}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300 text-center">${book.author}</p>
            ${sourceTag}
          `;
        } else {
          item.innerHTML = `
            <div class="w-full max-w-[150px] h-[200px] flex items-center justify-center bg-gray-200 dark:bg-gray-600 mb-4 rounded text-gray-500 dark:text-gray-400 italic text-center px-2">
              No cover available from this book.
            </div>
            <h3 class="text-md font-semibold text-gray-900 dark:text-white text-center">${book.title}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300 text-center">${book.author}</p>
            ${sourceTag}
          `;
        }

        bookList.appendChild(item);
      });
    })
    .catch((err) => {
      bookList.innerHTML = `<p class="text-red-600">Search error occurred.</p>`;
      console.error(err);
    })
    .finally(() => {
      loader.classList.add("hidden");
    });
}
