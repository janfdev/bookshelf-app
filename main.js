const STORAGE_KEY = "bookshelflist";

document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  const bookForm = document.getElementById("bookFormSubmit");
  const searchBookForm = document.getElementById("searchBook");

  bookForm.addEventListener("submit", addBooks);
  searchBookForm.addEventListener("submit", searchBooks);

  renderBooks();
});

function getBooks() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
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

function searchBooks(e) {
  e.preventDefault();
  const query = document.getElementById("searchBookTitle").value.toLowerCase();
  renderBooks(query);
}

function renderBooks(query) {
  const incompleteBookList = document.getElementById("incompleteBookList");
  const completeBookList = document.getElementById("completeBookList");

  incompleteBookList.innerHTML = "";
  completeBookList.innerHTML = "";

  const books = getBooks().filter((book) =>
    book.title.toLowerCase().includes(query)
  );

  books.forEach((book) => {
    const bookWrapper = document.createElement("div");
    bookWrapper.dataset.bookid = book.id;
    bookWrapper.dataset.testid = "bookItem";
    bookWrapper.innerHTML = `
    <h3 data-testid="bookItemTitle">${book.title}</h3>
    <p data-testid="bookItemAuthor">Penulis ${book.author}</p>
    <p data-testid="bookItemYear">Tahun ${book.year}</p>
    <div>
      <button data-testid="bookItemIsCompleteButton" onclick="toggleBookStatus(${
        book.id
      })">
        ${book.isComplete ? "Selesai dibaca" : "Belum selesai dibaca"}
      </button>
      <button data-testid="bookItemDeleteButton" onclick="deleteBook(${
        book.id
      })">Hapus Buku</button>
      <button data-testid="bookItemEditButton" onclick="editBook(${
        book.id
      })">Edit Buku</button>
    </div>
    `;

    if (book.isComplete) {
      completeBookList.appendChild(bookWrapper);
    } else {
      incompleteBookList.appendChild(bookWrapper);
    }
  });
}
