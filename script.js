const cards = document.getElementById('cards');
const newBookBtn = document.querySelector('.new-book-btn')
const addBtn = document.querySelector('.add-btn');
const cancelBtn = document.querySelector('.cancel-btn');
const form = document.getElementById('form');
const formCtn = document.getElementById('form-container');

// Array holds books
let myLibrary = [];
//create book properties
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
  //the form submits a new book card
  addBook() {
    this.title = document.getElementById('book-name').value;
    this.author = document.getElementById('author-name').value;
    this.pages = document.getElementById('book-pages').value;
    this.read = document.getElementById('book-status').checked;

    let addNewBook = new Book(this.title, this.author, this.pages, this.read);
    myLibrary.push(addNewBook);

    cards.querySelectorAll('.card').forEach(e => e.remove());
    setData();
    render();
  }
}
//create library, books displayed on cards
function render() {
  myLibrary.forEach((book) => {
    let bookCard = document.createElement('div')
    bookCard.classList.add('card');
    cards.prepend(bookCard);

    let titleInfo = document.createElement('h1');
    titleInfo.classList.add('card-header');
    titleInfo.textContent = book.title;
    bookCard.appendChild(titleInfo);

    let authorInfo = document.createElement('h5');
    authorInfo.classList.add('card-author');
    authorInfo.textContent = 'By: ' + book.author;
    bookCard.appendChild(authorInfo);

    let pagesInfo = document.createElement('p');
    pagesInfo.classList.add('card-pages');
    pagesInfo.textContent = book.pages + ' pages';
    bookCard.appendChild(pagesInfo);

    let readStatus = document.createElement('p')
    readStatus.classList.add('read-status');
    bookCard.appendChild(readStatus);
    readStatus.setAttribute('unique-id', book.id);
    readColor(book, readStatus);
    updateReadStatus(book, readStatus)

    let bookDeleteBtn = document.createElement('span');
    bookDeleteBtn.classList.add('book-del-btn');
    bookDeleteBtn.textContent = 'x';
    bookDeleteBtn.setAttribute('unique-id', Book.id);
    bookCard.appendChild(bookDeleteBtn);
    bookDeleteBtn.addEventListener('click', (e) => {
      myLibrary.splice(myLibrary.indexOf(Book), 1);
      deleteBook(e);
    });
  });
}
//User input to change read status after creating book
function updateReadStatus(book, readStatus) {
  readStatus.addEventListener('click', () => {
    book.read = !book.read;
    readColor(book, readStatus);
    setData();
  })
}
//changes color of text on read status
function readColor(book, readStatus) {
  if (book.read == true) {
    readStatus.style.color = 'rgb(72, 157, 78)';
    readStatus.textContent = 'Complete';
  } else {
    readStatus.style.color = 'rgb(222, 50, 12)';
    readStatus.textContent = 'Not read';
  };
}

function deleteBook(e) {
  let rmv = e.target.parentElement;
  cards.removeChild(rmv);
  setData();
}

//open and close form with button
function openForm() {
  document.getElementById("form-container").style.display = "block";
}

function closeForm() {
  document.getElementById("form-container").style.display = "none";
}

//user submits form to add book to library
function submitForm() {
  let title = document.getElementById('book-name').value;
  let author = document.getElementById('author-name').value;
  let pages = document.getElementById('book-pages').value;
  if (title == "" || author == "" || pages < 1 || pages > 20000) {
    alert('Please fill out correctly')
  } else {
    document.getElementById('book-pages').value;
    const add = new Book(title, author, pages);
    add.addBook();
    formCtn.style.display = 'none';
    form.reset();
  }
}

//localStorage functions
function setData() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function restore() {
  if (!localStorage.myLibrary) {
    render();
  } else {
    let books = localStorage.getItem('myLibrary');
    books = JSON.parse(books);
    myLibrary = books;
    render();
  }
}

restore();
