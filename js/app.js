



function newBook(title, author, numberOfPages,publishDate){
    this.title=title;
    this.author=author;
    this.numberOfPages= numberOfPages;
    this.publishDates= new Date(publishDate);
}

var library = function() {
}


library.prototype.myBookArray = new Array();

library.prototype.addBook = function (book) {
    //check if library has books before running the loop
    if (this.myBookArray.length){
        for (var i = 0; i<this.myBookArray.length; i++) {
            if (book.title == this.myBookArray[i].title) {
                //stops loop if there is a match
                return false;
            }
        } //add book only after for loop is complete
          this.myBookArray.push(book);                      //after checking against all titles in library without a match, add the book
          return true;                                      //stop
    } else {this.myBookArray.push(book);                  //if library is empty add the book
        return true;                                        //stop
    }
};

library.prototype.removeBookByTitle = function (title) {
    for (var i = this.myBookArray.length-1; i >=0; i--) {
        if (title == this.myBookArray[i].title) {
            //remove 1 book starting at index i
            this.myBookArray.splice([i],1);
            return true;
        }
    }   //complete the loop before returning false
        return false;
};



library.prototype.removeBookByAuthor = function (authorName) {
    var booksRemoved = 0;
    //same as removeBookByTitle but need to run loop backwards to remove more than one
    for (var i = this.myBookArray.length-1; i>=0; i--) {
        if (authorName == this.myBookArray[i].author) {
            this.myBookArray.splice(i,1);
            booksRemoved++; //add to booksRemoved if an author matches but don't exit loop until all books are checked
        } //keep looking for author matches until you get to the book at index 0 posiiton
    }
    if (booksRemoved > 0) { return true;}
    return false;
};


library.prototype.getRandomBook = function () {
    if (this.myBookArray.length) {
        var randomBook = this.myBookArray[Math.floor(Math.random() * (this.myBookArray.length))];
        return randomBook;
    } return null;
};


library.prototype.getBookByTitle = function (title) {
    var booksThatMatch = new Array();
    for (var i = 0; i<this.myBookArray.length; i++) {
        var titlesInLibrary = this.myBookArray[i].title;
        //match is an easy way to check if a string matches any part of another string
        if (titlesInLibrary.toLowerCase().match(title.toLowerCase()) !== null) {
            booksThatMatch.push(this.myBookArray[i]);
        }
    }//2nd leg of if statement has to be outside of loop to get more than one match
    return booksThatMatch;
};

library.prototype.getBooksByAuthor = function (author) {
    var booksWithAuthorsThatMatch = new Array();
    for (var i = 0; i<this.myBookArray.length; i++) {
        var authorInLibrary = this.myBookArray[i].author;
        if (authorInLibrary.toLowerCase().match(author.toLowerCase()) !== null) {
            booksWithAuthorsThatMatch.push(this.myBookArray[i]);
        }
    }//2nd leg of if statement has to be outside of loop to get more than one match
    return booksWithAuthorsThatMatch;
};

library.prototype.addBooks = function (books) {
    var listOfBooks = books;
    var notAdded = [];
    //convert library to array of titles
    var Titles=[];
    for (var j = 0; j < this.myBookArray.length; j++) {
        Titles.push(this.myBookArray[j].title);
    }   //check the index of each title of each book you are adding
        //against the array of titles in the library. Add each book
        //with no match to the library and each book with a match to the Not Added list
    for (var i=0; i< listOfBooks.length; i++) {
        if (Titles.indexOf(listOfBooks[i].title)>-1) {
              notAdded.push(listOfBooks[i]);
        } else {this.myBookArray.push(listOfBooks[i]);}
    } //compare length of books you tried to add to books not added to get # of books added
    return listOfBooks.length - notAdded.length;
};


library.prototype.getAuthors = function () {
    var filter = {}; //staging object searches for duplicates before passing authors to a new array
    var Authors=[];//new array of authors in library
	  for(var i = 0; i < this.myBookArray.length; i++) {
		    if (!filter[this.myBookArray[i].author]) {//if this does not exist
			       filter[this.myBookArray[i].author] = true; //then add key/value pair of "author xyz" = true to the n object
			       Authors.push(this.myBookArray[i].author); //and push, the author into the Authors array
		    } //do nothing
	  } return Authors; //show authors
};


library.prototype.getRandomAuthorName = function () {
    if (this.myBookArray.length) {
        var randomNumberInArray = Math.floor(Math.random() * (this.myBookArray.length));
        return this.myBookArray[randomNumberInArray].author;
    } return null;
};

var gnewLibrary = new library();

var gbook1 = new newBook("1987","George Orwell", 3, "1986/03/25");
var gbook2 = new newBook("Duck Farm","George Orwell", 3, "1986/01/20");
var gbook3 = new newBook("The Crucible","Arther Miller", 3, "1886/04/20");
var gbook4 = new newBook("Bling Money","George Orwell", 3, "1987/04/01");
var gbook5 = new newBook("Zen and the Art of Motorcycle Maintenance","Robert M. Persig", 3, "1986/11/15");
var gbook6 = new newBook("The Crucified Church","Joel L. Rissinger", 500, "2010/02/01");
var gbook7 = new newBook("The Social Meaning of Money: Pin Money, Paychecks, Poor Relief, and Other Currencies", "Viviana A. Zelizer", 420,"1997/08/30");


function addBooksOnPageLoad(book) {
    this.gnewLibrary.addBook(gbook1);
    this.gnewLibrary.addBook(gbook2);
    this.gnewLibrary.addBook(gbook3);
    // this.gnewLibrary.addBook(gbook4);
    // this.gnewLibrary.addBook(gbook6);
    // this.gnewLibrary.addBook(gbook7);
};
this.addBooksOnPageLoad();
  // var d = new Date(99, 5, 24);
  // //document.getElementById("demo").innerHTML = date



library.prototype.init = function(){
  this.$submitBtn = $("button.submit");
  this.$addForm = $("button.add-forms");
  this.$formWrapper = $("div.forms");
  this._bindEvents();
};

library.prototype._bindEvents = function(){
  this.$submitBtn.on("click", $.proxy(this._add, this));
  this.$addForm.on("click", $.proxy(this._addForm, this));
};

library.prototype._addBooks = function(arr){

  var _self = this;
  $.each($("form.add-books"), function(index, value){
    var title = $(this).find(".title").val();
    var author = $(this).find(".author").val();
    var numberOfPages = $(this).find(".pages").val();
    var publishDate = $(this).find(".pub-date").val();
    if(title && author && numberOfPages && publishDate) {
      $("#library").append("<li>" + title + ": " +  author  + ", " + numberOfPages + ", " + publishDate + "." + "</li>");

      _self.addBook(book);

    }
  });
};

library.prototype._getValues = function (){
  var books=[], arr2 = [], len;
  $.each($(".aBooks input"),function(Index, val){
        var vInput = $(this).val();
		    books.push(vInput);
  });

  len = (books.length/4)-1;

for(var i = 0; i <= len; i++){
  arr2.push(books.splice(0,4));
}
return arr2;
}

library.prototype._addForm = function(){
  this.$formWrapper.append(this._formHTML);
};

library.prototype._formHTML = function(){
  return '<br /><p>Book ' + ($("form.add-books").length + 1) + '</p><form class="form-inline add-books">'
  + '<div class="form-group aBooks">' +
    '<input type="text" class="form-control input-space" placeholder="title">' +
    '<input type="text" class="form-control input-space" placeholder="author">' +
    '</div>' +
    '<div class="form-group aBooks">' +
    '<input type="number" class="form-control input-space" placeholder="# of pages">' +
    '<input type="date" class="form-control input-space" placeholder="Publish Date">' +
    '</div>' + '</form>';
};

$(function(){
  gnewLibrary.init();
});
