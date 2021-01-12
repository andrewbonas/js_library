console.log("hello");

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = false
  this.info = function() {
    console.log(title, 'by ' + author, 'has ' + pages, read);
  }
}

const theHobbit = new Book('The Hobbit', 'JRR Tolkien', 500, true);
theHobbit.info();
