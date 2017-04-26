




function newBook(title, author, numberOfPages,publishDate){
  this.title=title;
  this.author=author;
  this.numberOfPages= numberOfPages;
  this.publishDates= publishDate;
}

var library = function() {

  }


  library.prototype.myBookArray = new Array();

  library.prototype.addBook = function (book) {
    for (var i = 0; i<this.myBookArray.length; i++){
      if (this.myBookArray[i].title.indexOf(book.title) > -1) {
        return false;
      }
    }
    this.myBookArray.push(book);
    return true;
};

  library.prototype.removeBookByTitle = function (title) {
   for (var i = 0; i < this.myBookArray.length; i++){
      //if (title == this.myBookArray[i].title) {
      if (this.myBookArray[i].title.indexOf(title) > -1) {
        this.myBookArray.splice([i],1);
        return true;
      }
    }
    return false;
};



library.prototype.removeBookByAuthor = function (authorName) {
    var booksRemoved = 0;
 for (var i = this.myBookArray.length-1; i>=0; i--){
    if (authorName == this.myBookArray[i].author) {
    //if (this.myBookArray[i].author.indexOf(author) > -1) {
    this.myBookArray.splice(i,1);
    booksRemoved++;
  }
} if (booksRemoved > 0) { return true;}
  return false;
};


  library.prototype.getRandomBook = function (){};
  library.prototype.getBookByTitle = function (){};
  library.prototype.getBooksByAuthor = function (){};
  library.prototype.getAuthors = function (){};
  library.prototype.getRandomAuthorName = function (){};

  var newLibrary = new library();
  var book1 = new newBook("1987","George Orwell", 3, 1986);
  var book2 = new newBook("Duck Farm","George Orwell", 3, 1986);
  var book3 = new newBook("The Crucible","Arther Miller", 3, 1986);
  var book4 = new newBook("Bling Money","George Orwell", 3, 1987);
  var book5 = new newBook("Zen and the Art of Motorcycle Maintenance","", 3, 1986)

  // var d = new Date(99, 5, 24);
  // //document.getElementById("demo").innerHTML = date
