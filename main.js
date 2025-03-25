const STORAGE_KEY = "bookShelfList";

document.addEventListener("DOMContentLoaded", (e) => {
  const bookForm = document.getElementById("bookForm");
  const searchBookForm = document.getElementById("searchBook");

  bookForm.addEventListener("submit", addBooks);
  searchBookForm.addEventListener("submit", searchBooks);

  renderBooks();
});

function getBooks() {
  JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveBooks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

const uniqueId = () => {
  return new Date().getTime();
};

const addBooks = (event) => {
  event.preventDefault();

  const titleBook = document.getElementById("bookFormTitle").value.trim();
  const authorBook = document.getElementById("bookFormAuthor").value.trim();

  const yearBookForm = document.getElementById("bookFormYear").value.trim();
  const isComplete = document.getElementById("bookFormIsComplete").checked;

  const books = getBooks();
  const newBook = {
    id: uniqueId(),
    testid: `book-${uniqueId()}`,
    titleBook,
    authorBook,
    yearBookForm,
    isComplete,
  };

  books.push(newBook);
  saveBooks(books);
  renderBooks();
  document.getElementById("bookForm").reset();
};

function renderBooks(query = "") {
  const incompleteBookList = document.getElementById("incompleteBookList");
  const completeBookList = document.getElementById("completeBookList");

  incompleteBookList.innerHTML = "";
  completeBookList.innerHTML = "";

  const books = getBooks().filter((book) =>
    book.title.toLowerCase().includes(query)
  );
}
