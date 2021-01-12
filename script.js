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

console.log(myLibrary);
