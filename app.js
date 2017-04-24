function newBook(title, author, numberOfPages,publishDate){
  this.title=title;
  this.author=author;
  this.numberOfPages=numberOfPages;
  this.publishDates=publishDate;
}
  var library = function() {

  }



  function lookAtStuff () {
    console.log(book1);
  }

  library.prototype.myBookArray = new Array();
  library.prototype.addBook = function (){};
  library.prototype.removeBookByTitle = function (){};
  library.prototype.removeBookByAuthor = function (){};
  library.prototype.getRandomBook = function (){};
  library.prototype.getBookByTitl = function (){};
  library.prototype.getBooksByAuthor = function (){};
  library.prototype.getAuthors = function (){};
  library.prototype.getRandomAuthorName = function (){};

  var comedyLibrary = new library();
  var book1 = new newBook("1987","George Orwell", 3, 1986);
  var book2 = new newBook("Duck Farm","George Orwell", 3, 1986);
  var book3 = new newBook("The Crucible","Arther Miller", 3, 1986);
  
