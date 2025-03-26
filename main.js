const STORAGE_KEY = "bookshelf_app";

document.addEventListener("DOMContentLoaded", () => {
  const bookForm = document.getElementById("bookForm");
  const searchBookForm = document.getElementById("searchBook");
  const bookFormIsComplete = document.getElementById("bookFormIsComplete");

  bookForm.addEventListener("submit", addBooks);
  searchBookForm.addEventListener("submit", searchBooks);
  bookFormIsComplete.addEventListener("change", changeText);

  renderBooks();

  function changeText() {
    const spanButton = document.getElementById("textChange");
    const bookFormIsComplete = document.getElementById("bookFormIsComplete");
    const labelCheckbox = document.querySelector(".label-span");
    if (bookFormIsComplete.checked) {
      spanButton.innerText = "Selesai Dibaca";
      labelCheckbox.innerText = "Selesai Dibaca";
    } else {
      spanButton.innerText = "Belum selesai dibaca";
      labelCheckbox.innerText = "Belum selesai dibaca";
    }
  }
});

const getBooks = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

const saveBooks = (books) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
};

const uniqueId = () => {
  return new Date().getTime();
};

const addBooks = (event) => {
  event.preventDefault();

  const title = document.getElementById("bookFormTitle").value.trim();
  const author = document.getElementById("bookFormAuthor").value.trim();
  const yearBook = document.getElementById("bookFormYear").value.trim();
  const year = parseInt(yearBook);

  const isComplete = document.getElementById("bookFormIsComplete").checked;

  const books = getBooks();
  const newBook = {
    id: uniqueId(),
    testid: `book-${uniqueId()}`,
    title,
    author,
    year,
    isComplete,
  };

  books.push(newBook);
  saveBooks(books);
  renderBooks();
  document.getElementById("bookForm").reset();
};

const searchBooks = (e) => {
  e.preventDefault();
  const searchValue = document
    .getElementById("searchBookTitle")
    .value.trim()
    .toLowerCase();
  renderBooks(searchValue);
};

const renderBooks = (searchValue = "") => {
  const incompleteBookList = document.getElementById("incompleteBookList");
  const completeBookList = document.getElementById("completeBookList");

  incompleteBookList.innerHTML = "";
  completeBookList.innerHTML = "";

  const books = getBooks().filter((book) =>
    book.title.toLowerCase().includes(searchValue)
  );

  books.forEach((book) => {
    const bookWrapper = document.createElement("div");
    bookWrapper.classList.add(
      "flex",
      "flex-col",
      "items-start",
      "gap-3",
      "p-5",
      "rounded-md",
      "justify-center",
      "shadow-lg"
    );

    bookWrapper.dataset.bookid = book.id;
    bookWrapper.dataset.testid = "bookItem";
    bookWrapper.innerHTML = `
    <h3 data-testid="bookItemTitle" class="text-xl">Judul : ${book.title}</h3>
    <p data-testid="bookItemAuthor" class="text-xl">Penulis : ${book.author}</p>
    <p data-testid="bookItemYear" class="text-xl">Tahun : ${book.year}</p>
    <div class="flex gap-3">
      <button class="${
        book.isComplete ? "bg-red-400" : "bg-green-400"
      } text-white py-2 px-3 rounded-sm" data-testid="bookItemIsCompleteButton" onclick="toggleBookStatus(${
      book.id
    })">${book.isComplete ? "Belum selesai dibaca" : "Selesai dibaca"}</button>
      <button class="bg-red-500 text-white py-2 px-5 rounded-sm" data-testid="bookItemDeleteButton" onclick="deleteBook(${
        book.id
      })">Hapus</button>
      <button class="bg-yellow-500 text-white py-2 px-6 rounded-sm" data-testid="bookItemEditButton" onclick="editBook(${
        book.id
      })">Edit</button>
    </div>
    `;
    if (book.isComplete) {
      completeBookList.appendChild(bookWrapper);
    } else {
      incompleteBookList.appendChild(bookWrapper);
    }
  });
};

const toggleBookStatus = (id) => {
  const books = getBooks();
  const book = books.find((book) => book.id === id);

  if (book) {
    book.isComplete = !book.isComplete;
    saveBooks(books);
    renderBooks();
  }
};

const deleteBook = (id) => {
  const books = getBooks();
  const confirmDelete = confirm("Apakah anda yakin menghapus buku ini ?");
  if (confirmDelete) {
    const book = books.filter((book) => book.id !== id);
    localStorage.removeItem(STORAGE_KEY, books);
    saveBooks(book);
    renderBooks();
  }
};

const editBook = (id) => {
  const books = getBooks();
  const bookIndex = books.findIndex((book) => book.id === id);

  if (bookIndex !== -1) {
    const newTitle = prompt("Judul Baru : ", books[bookIndex].title);
    const newAuthor = prompt("Author Baru : ", books[bookIndex].author);
    const newYear = prompt("Tahun Baru : ", books[bookIndex].year);

    if (newTitle && newAuthor && newYear) {
      books[bookIndex].title = newTitle;
      books[bookIndex].author = newAuthor;
      books[bookIndex].year = parseInt(newYear);

      saveBooks(books);
      renderBooks();
    }
  }
};

function onlyNum(object) {
  if (object.value.length > 4) {
    object.value = object.value.slice(0, 4);
  }
}
