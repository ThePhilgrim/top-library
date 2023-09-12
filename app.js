const openModalBtn = document.querySelector('.add-book-btn');
const closeModalBtn = document.querySelector('.close-modal-btn');
const saveBookBtn = document.querySelector('.save-book-btn');

const bookListContainer = document.querySelector('.booklist-container');

const addBookModal = document.querySelector('.add-book-modal');

const addBookForm = document.querySelector('.book-form');

let bookList = [];

class Book {
  constructor(id, author, title, pages, haveRead) {
    this.id = id;
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.haveRead = haveRead;
  }

  showBookInGrid() {
    const bookContainer = document.createElement('div');
    const deleteBookBtn = document.createElement('button');
    const title = document.createElement('h3');
    const author = document.createElement('p');
    const pages = document.createElement('p');
    const haveReadQuestion = document.createElement('p');

    bookContainer.classList.add('book-container');
    deleteBookBtn.classList.add('delete-book-btn');
    title.classList.add('title');
    author.classList.add('author');
    pages.classList.add('pages');
    haveReadQuestion.classList.add('have-read-question');

    deleteBookBtn.style.background = "url('delete.png') no-repeat center center";
    deleteBookBtn.style.backgroundSize = 'contain';

    title.innerHTML = this.title;
    author.innerHTML = 'Author: ' + this.author;
    pages.innerHTML = 'Pages: ' + this.pages;
    haveReadQuestion.innerHTML = 'Have you read the book?';

    /* Read status Toggle */
    const toggleContainer = document.createElement('div');
    toggleContainer.classList.add('toggle-container');
    const haveReadToggle = document.createElement('input');
    haveReadToggle.classList.add('checkbox');
    haveReadToggle.type = 'checkbox';
    const knobs = document.createElement('div');
    knobs.classList.add('knobs');
    const layer = document.createElement('div');
    layer.classList.add('layer');

    if (this.haveRead) {
      haveReadToggle.checked = true;
    }

    toggleContainer.appendChild(haveReadToggle);
    toggleContainer.appendChild(knobs);
    toggleContainer.appendChild(layer);

    bookContainer.appendChild(deleteBookBtn);
    bookContainer.appendChild(title);
    bookContainer.appendChild(author);
    bookContainer.appendChild(pages);
    bookContainer.appendChild(haveReadQuestion);
    bookContainer.appendChild(toggleContainer);
    bookListContainer.appendChild(bookContainer);

    haveReadToggle.addEventListener('change', () => {
      this.changeReadStatus(haveReadToggle);
    });

    deleteBookBtn.addEventListener('click', () => {
      this.deleteBook(bookContainer);
    });

    displayBookStats();
  }

  changeReadStatus(haveReadToggle) {
    this.haveRead = haveReadToggle.checked;
    displayBookStats();
  }

  deleteBook(bookContainer) {
    bookContainer.remove();
    bookList = bookList.filter((b) => this.id !== b.id);
    displayBookStats();
  }
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

  const newBook = new Book(id, author, title, pages, haveRead);

  bookList.push(newBook);

  newBook.showBookInGrid();

  addBookForm.reset();
});

bookList.forEach((book) => {
  this.showBookInGrid();
});
