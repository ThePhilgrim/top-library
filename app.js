const openModalBtn = document.querySelector('.add-book-btn');
const closeModalBtn = document.querySelector('.close-modal-btn');
const saveBookBtn = document.querySelector('.save-book-btn');

const bookListContainer = document.querySelector('.booklist-container');

const addBookModal = document.querySelector('.add-book-modal');

const addBookForm = document.querySelector('.book-form');

let bookList = [];

function Book(id, author, title, pages, haveRead) {
  return { id, author, title, pages, haveRead };
}

function showBooksInGrid() {
  bookListContainer.innerHTML = '';

  bookList.forEach((book) => {
    const bookContainer = document.createElement('div');

    // TODO: Remake into <button>
    const deleteBookBtn = document.createElement('img');
    const title = document.createElement('h3');
    const author = document.createElement('p');
    const pages = document.createElement('p');

    bookContainer.classList.add('book-container');
    deleteBookBtn.classList.add('delete-book-btn');
    title.classList.add('title');
    author.classList.add('author');
    pages.classList.add('pages');

    deleteBookBtn.src = 'delete.png';

    title.innerHTML = book.title;
    author.innerHTML = 'Author: ' + book.author;
    pages.innerHTML = 'Pages: ' + book.pages;

    bookContainer.appendChild(deleteBookBtn);
    bookContainer.appendChild(title);
    bookContainer.appendChild(author);
    bookContainer.appendChild(pages);
    bookListContainer.appendChild(bookContainer);

    deleteBookBtn.addEventListener('click', () => {
      deleteBook(book, bookContainer);
    });
  });

  displayBookStats();
}

function displayBookStats() {
  const statsValueContainer = document.querySelector('.stats-values');

  statsValueContainer.innerHTML = '';

  const noOfBooks = document.createElement('p');
  noOfBooks.classList.add('stats-value');
  noOfBooks.innerHTML = bookList.length;
  statsValueContainer.appendChild(noOfBooks);

  const haveRead = document.createElement('p');
  haveRead.classList.add('stats-value');
  const haveReadValue = bookList.filter((book) => book.haveRead === true).length;
  haveRead.innerHTML = haveReadValue;
  statsValueContainer.appendChild(haveRead);

  const haveNotRead = document.createElement('p');
  haveNotRead.classList.add('stats-value');
  haveNotRead.innerHTML = bookList.length - haveReadValue;
  statsValueContainer.appendChild(haveNotRead);
}

openModalBtn.addEventListener('click', () => {
  addBookModal.style.display = 'grid';
  document.body.style.overflow = 'hidden';
});

closeModalBtn.addEventListener('click', () => {
  addBookModal.style.display = 'none';
  document.body.style.overflow = 'visible';
});

saveBookBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const id = crypto.randomUUID();
  const author = document.getElementById('author').value;
  const title = document.getElementById('title').value;
  const pages = document.getElementById('pages').value;
  const readRadio = document.querySelector('input[name="read-radio"]:checked').value;
  const haveRead = readRadio === 'true'; // Convert string to boolean

  bookList.push(new Book(id, author, title, pages, haveRead));

  showBooksInGrid();

  addBookForm.reset();
});

function deleteBook(book, bookContainer) {
  bookContainer.remove();
  bookList = bookList.filter((b) => book.id !== b.id);
}

showBooksInGrid();
