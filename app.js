




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
    if (this.myBookArray.length){
      for (var i = 0; i<this.myBookArray.length; i++){
        if (book.title == this.myBookArray[i].title) {
            return false;
      }
        }   this.myBookArray.push(book);
            return true;
    } else {this.myBookArray.push(book);
            return true;
    }
};

  library.prototype.removeBookByTitle = function (title) {
   for (var i = this.myBookArray.length-1; i >=0; i--){
      if (title == this.myBookArray[i].title) {
        this.myBookArray.splice([i],1);  //remove 1 book starting at index i
        return true;
      }
  };return false;
};



library.prototype.removeBookByAuthor = function (authorName) {
    var booksRemoved = 0;
 for (var i = this.myBookArray.length-1; i>=0; i--){ //run backwards to make sure that it completes loop even when index
    if (authorName == this.myBookArray[i].author) {
    this.myBookArray.splice(i,1);
    booksRemoved++;                  //add to booksRemoved if an author matches but don't exit loop until all books are checked
  }
} if (booksRemoved > 0) { return true;}
  return false;
};


  library.prototype.getRandomBook = function (){
    if (this.myBookArray.length) {
    var randomBook = this.myBookArray[Math.floor(Math.random() * (this.myBookArray.length))];
    return randomBook;
  } return null;
  };



  library.prototype.getBookByTitle = function (title){
    var booksThatMatch = new Array();
    for (var i = 0; i<this.myBookArray.length; i++){
    var titlesInLibrary = this.myBookArray[i].title
      if (titlesInLibrary.toLowerCase().match(title.toLowerCase()) !== null){
      booksThatMatch.push(this.myBookArray[i]);
      }
    }
    return booksThatMatch;
  };

  library.prototype.getBooksByAuthor = function (author){
    var booksWithAuthorsThatMatch = new Array();
    for (var i = 0; i<this.myBookArray.length; i++){
    var authorInLibrary = this.myBookArray[i].author
      if (authorInLibrary.toLowerCase().match(author.toLowerCase()) !== null){
      booksWithAuthorsThatMatch.push(this.myBookArray[i]);
      }
    }
    return booksWithAuthorsThatMatch;
  };

  library.prototype.addBooks = function (books){
    var listOfBooks = books;
    var notAdded = [];
    var Titles=[];
    for(var j = 0; j < this.myBookArray.length; j++)
    Titles.push(this.myBookArray[j].title);
    for (var i=0; i< listOfBooks.length; i++){
         if (Titles.indexOf(listOfBooks[i].title)>-1) {
         notAdded.push(listOfBooks[i]);
       } else{this.myBookArray.push(listOfBooks[i]);}}
       return listOfBooks.length - notAdded.length;
  };


  library.prototype.getAuthors = function (){
    var stagingObject = {};
    var Authors=[];
	for(var i = 0; i < this.myBookArray.length; i++){
		if (!stagingObject[this.myBookArray[i].author]) //if this does not exist
		{
			stagingObject[this.myBookArray[i].author] = true; //then add key/value pair of author:"xyz" = true to the n object
			Authors.push(this.myBookArray[i].author); //and push, the author into the Authors array
		} //do nothing
	}
	return Authors; //show authors

  };


  library.prototype.getRandomAuthorName = function (){
    if (this.myBookArray.length) {

    var randomNumberInArray = Math.floor(Math.random() * (this.myBookArray.length));
    return this.myBookArray[randomNumberInArray].author;
  } return null;

  };

  var gnewLibrary = new library();

  var gbook1 = new newBook("1987","George Orwell", 3, 1986);
  var gbook2 = new newBook("Duck Farm","George Orwell", 3, 1986);
  var gbook3 = new newBook("The Crucible","Arther Miller", 3, 1986);
  var gbook4 = new newBook("Bling Money","George Orwell", 3, 1987);
  var gbook5 = new newBook("Zen and the Art of Motorcycle Maintenance","Robert M. Persig", 3, 1986);
  var gbook6 = new newBook("The Crucified Church","Joel L. Rissinger", 500, 2010);
  var gbook7 = new newBook("The Social Meaning of Money: Pin Money, Paychecks, Poor Relief, and Other Currencies", "Viviana A. Zelizer", 420,1997);

  function addBooksOnPageLoad(book){
   this.gnewLibrary.addBook(gbook1);
   this.gnewLibrary.addBook(gbook2);
  this.gnewLibrary.addBook(gbook3);
  //  this.gnewLibrary.addBook(gbook4);
  this.gnewLibrary.addBook(gbook6);
  //  this.gnewLibrary.addBook(gbook7);
 }
  this.addBooksOnPageLoad();
  // var d = new Date(99, 5, 24);
  // //document.getElementById("demo").innerHTML = date
