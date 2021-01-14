const cards = document.getElementById('cards');
const newBookBtn = document.querySelector('.new-book-btn')
const addBtn = document.querySelector('.add-btn');
const cancelBtn = document.querySelector('.cancel-btn');
const form = document.getElementById('form');
const formCtn = document.getElementById('form-container');

let myLibrary = [];

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


addBookToLibrary(1606253782720, 'The Hobbit', 'JRR Tolkien', 500, true);
addBookToLibrary(1606253782720, 'The Hobbit', 'JRR Tolkien', 500, true);
addBookToLibrary(1606253782720, 'The Hobbit', 'JRR Tolkien', 500, true);



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
      readStatus.style.color = 'rgb(13, 228, 167)';
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

function openForm() {
  document.getElementById("form-container").style.display = "block";
}

function closeForm() {
  document.getElementById("form-container").style.display = "none";
}

function submitFrom() {
  addBook();
  console.log(myLibrary);
  formCtn.style.display = 'none';
  form.reset();
}

function addBook() {
  this.id = Date.now();
  this.title = document.getElementById('book-name').value;
  this.author = document.getElementById('author-name').value;
  this.pages = document.getElementById('book-pages').value;
  this.read = document.getElementById('book-status').checked;

  let addNewBook = new Book(idtitle, author, pages, read);
  myLibrary.push(addNewBook);

  cards.querySelectorAll('.card').forEach(e => e.remove());
  render();

}

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

  };
  if (e.target.classList.contains('read-status')) {
    for (let i = 0; i < myLibrary.length; i++) {
      if (myLibrary[i].id == getId) {
        if (myLibrary[i].read == true) {
          myLibrary[i].read = false;
          e.target.style.color = 'red';
          e.target.textContent = 'Not Read';
        } else {
          myLibrary[i].read = true;
          e.target.style.color = 'green';
          e.target.textContent = 'Complete';
        };
      };
};
  };
});



console.log(myLibrary)
