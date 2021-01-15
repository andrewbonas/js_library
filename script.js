const cards = document.getElementById('cards');
const newBookBtn = document.querySelector('.new-book-btn')
const addBtn = document.querySelector('.add-btn');
const cancelBtn = document.querySelector('.cancel-btn');
const form = document.getElementById('form');
const formCtn = document.getElementById('form-container');

// Array holds books
let myLibrary = [];
bookLibrary = JSON.parse(localStorage.getItem("myLibrary") || "[]");

//create book properties
function Book(id, title, author, pages, read) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}
//pre-loaded example
addBookToLibrary(1606253782720, 'The Hobbit', 'JRR Tolkien', 500, true);

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

    bookComplete = () => {
      readStatus.style.color = 'rgba(113, 247, 49, 0.94)';
      readStatus.textContent = 'Complete';
    };

    bookInComplete = () => {
      readStatus.style.color = 'rgb(222, 50, 12)';
      readStatus.textContent = 'Not read';
    };

    if (book.read == true) {
      bookComplete();
    } else {
      bookInComplete();
    };

    let bookDelete = document.createElement('span');
    bookDelete.classList.add('book-del-btn');
    bookDelete.textContent = 'x';
    bookDelete.setAttribute('unique-id', Book.id);
    bookCard.appendChild(bookDelete);
  });
}
render();

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
  if ( title == "" || author == "" || pages < 1 || pages > 20000) {
    alert('Please fill out correctly')
  } else {
  document.getElementById('book-pages').value;

  addBook();
  formCtn.style.display = 'none';
  form.reset();
}
}

//the form submits
function addBook() {
  this.id = Date.now();
  this.title = document.getElementById('book-name').value;
  this.author = document.getElementById('author-name').value;
  this.pages = document.getElementById('book-pages').value;
  this.read = document.getElementById('book-status').checked;

  let addNewBook = new Book(id, title, author, pages, read);
  myLibrary.push(addNewBook);

  cards.querySelectorAll('.card').forEach(e => e.remove());
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  render();
}

//delete and update if the book has been read
function adjustBook() {
  cards.addEventListener('click', e => {
    let getId = e.target.getAttribute('unique-id');
    if (e.target.classList.contains('book-del-btn')) {
      for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].id == getId) {
          myLibrary.splice(i, 1);
        };
      };
      let rmv = e.target.parentElement;
      cards.removeChild(rmv);
      localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
    };

    if (e.target.classList.contains('read-status')) {
      for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].id == getId) {
          if (myLibrary[i].read == true) {
            myLibrary[i].read = false;
            e.target.style.color = 'rgb(222, 50, 12)';
            e.target.textContent = 'Not Read';
          } else {
            myLibrary[i].read = true;
            e.target.style.color = 'rgba(113, 247, 49, 0.94)';
            e.target.textContent = 'Complete';
          };
          localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
        };
      };
    };
  });
}
adjustBook();

console.log(myLibrary);
