const cardsCtn = document.getElementById('cards-ctn')
let myLibrary =[];

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

function addBookToLibrary(title, author, pages, read) {
  newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}


addBookToLibrary('The Hobbit', 'JRR Tolkien', 500, true);
addBookToLibrary('The Hobbit', 'JRR Tolkien', 500, false);
console.log(myLibrary);


function render() {
  myLibrary.forEach((book) => {
    let bookCard = document.createElement('div')
    bookCard.classList.add('card');
    cardsCtn.prepend(bookCard);

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
    readStatus.classList.add('readStatus');
    bookCard.appendChild(readStatus);


    bookComplete = () => {
      readStatus.style.color = 'rgb(13, 228, 167)';
      readStatus.textContent = 'Complete';
    };

    bookInComplete = () => {
      readStatus.style.color = 'rgb(222, 50, 12)';
      readStatus.textContent = 'Not read';
    };

    if(book.read == true) {
      bookComplete();
    } else {
      bookInComplete();
    };


});
}

render();
