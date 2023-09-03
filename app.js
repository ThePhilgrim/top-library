const openModalBtn = document.querySelector('.add-book-btn');
const closeModalBtn = document.querySelector('.close-modal-btn');
const saveBookBtn = document.querySelector('.save-book-btn');

const bookListContainer = document.querySelector('.booklist-container');

const addBookModal = document.querySelector('.add-book-modal');

const addBookForm = document.querySelector('.book-form');

const logBtn = document.getElementById('log');

const bookList = [];

function Book(index, author, title, pages, haveRead) {
  return { index, author, title, pages, haveRead };
}

function showBooksInGrid() {
  bookListContainer.innerHTML = '';

  bookList.forEach((book) => {
    const bookContainer = document.createElement('div');
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
      deleteBook(book);
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
  const index = bookList.length;
  const author = document.getElementById('author').value;
  const title = document.getElementById('title').value;
  const pages = document.getElementById('pages').value;
  const readRadio = document.querySelector('input[name="read-radio"]:checked').value;
  const haveRead = readRadio === 'true';

  bookList.push(new Book(index, author, title, pages, haveRead));

  showBooksInGrid();

  addBookForm.reset();
});

function reIndexBooks(startingIndex) {
  const booksToReIndex = bookList.length - startingIndex;

  if (booksToReIndex === 1) {
    bookList[bookList.length - 1].index -= 1;
  } else {
    for (let i = startingIndex; i < booksToReIndex; i++) {
      const currentIndex = bookList[i].index;

      bookList[i].index = currentIndex - 1;
    }
  }

  showBooksInGrid();
}

function deleteBook(book) {
  const index = book.index;

  bookList.splice(index, 1);

  reIndexBooks(index);
}

showBooksInGrid();
