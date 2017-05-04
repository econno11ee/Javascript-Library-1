



function newBook(title, author, numberOfPages,publishDate){
    this.title=title;
    this.author=author;
    this.numberOfPages= numberOfPages;
    this.publishDates= new Date(publishDate);
}

var library = function() {
}


library.prototype.myBookArray = new Array();





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





  // var d = new Date(99, 5, 24);
  // //document.getElementById("demo").innerHTML = date



library.prototype.init = function(){
  this._bindEvents();
  this.addBooksOnPageLoad();
  this._showBooks();
};

library.prototype._bindEvents = function(){
  $(".remove-author").on("click", $.proxy(this._removeBookByAuthor, this));
  $(".remove-title").on("click", $.proxy(this._removeBookByTitle, this));
  $("button.randomA").on("click", $.proxy(this._getRandomAuthor, this));
  $("button.randomB").on("click", $.proxy(this._getRandomBook, this));
  $("button.submit").on("click", $.proxy(this._addBooks, this));
  $("button.add-forms").on("click", $.proxy(this._addForm, this));
};

library.prototype._showBooks = function(){
	$("#library").empty();
	this.myBookArray.forEach(function(book){
	$("#library").append("<li class='display'><strong>" + book.title + "</strong>: " +  "<em>" + book.author + "</em>" + ", " + book.numberOfPages + ", " + "&copy;" + book.publishDates.getFullYear() + "</li>");
	});
};

library.prototype._addBook = function (books) {
    if (books.length >= 4){
        var book = new newBook(books[0], books[1], books[2], books[3]);
        for(var i = 0; i < this.myBookArray.length; i++){
            if(this.myBookArray[i].title == book.title) {
                    $("#results").replaceWith("<li id='results'>This books is already in the library!</li>");
    				        return false;
                }
            }
            this.myBookArray.push(book);
            return this._showBooks();
        }
};



library.prototype._addBooks = function(){
    var inputs=[], books = [], len;
    $.each($(".aBooks input"),function(Index, val){
        var vInput = $(this).val();
		    inputs.push(vInput);
  });
    len = (inputs.length/4)-1;

    for(var i = 0; i <= len; i++){
        books.push(inputs.splice(0,4));
    }
    for(var j=0; j < books.length; j++){
		    this._addBook(books[j]);
	     }
};


library.prototype._addForm = function(){
  $("div.forms").append(this._formHTML);
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


library.prototype._removeBookByTitle = function() {
  var title = $(".rtitle").val();

    for (var i = this.myBookArray.length-1; i >=0; i--) {
        if (title == this.myBookArray[i].title) {
            //remove 1 book starting at index i
            this.myBookArray.splice([i],1);
            $("#results").replaceWith("<li id='results'> Removed" + title + " from the library. </li>");
            return this._showBooks();
        }
    }   //complete the loop before returning false
        $("#results").replaceWith("Sorry, that book is not in the library!");
};

library.prototype._removeBookByAuthor = function() {
  var author = $(".rauthor").val();

    for (var i = this.myBookArray.length-1; i >=0; i--) {
        if (author == this.myBookArray[i].author) {
            //remove 1 book starting at index i
            this.myBookArray.splice([i],1);
            $("#results").replaceWith("<li id='results' class='display'> Removed " + author + " from the library. </li>");

        }
    }   return this._showBooks();


};


library.prototype._getRandomBook = function () {

    if (this.myBookArray.length) {
        var randomBook = this.myBookArray[Math.floor(Math.random() * (this.myBookArray.length))];
        $("#results").replaceWith("<li id='results'><strong>" + randomBook.title + "</strong>: " +  "<em>" + randomBook.author + "</em>" + ", " + randomBook.numberOfPages + ", " + "&copy;" + randomBook.publishDates.getFullYear() + "</li>");
        return;
    }
     $("#results").replaceWith("Sorry, no books in the library!");
};

library.prototype._getRandomAuthor = function () {

    if (this.myBookArray.length) {
        var randomNumber = Math.floor(Math.random() * (this.myBookArray.length));
        $("#results").replaceWith("<li id='results'>" + this.myBookArray[randomNumber].author + "</li>");
        return;
    } $("#results").replaceWith("Sorry, no books in the library!");
};




var gnewLibrary = new library();

var gbook1 = ["1987","George Orwell", 3, "1944/03/25"];
var gbook2 = ["Duck Farm","George Orwell", 3, "1902/01/20"];
var gbook3 = ["The Crucible","Arthur Miller", 3, "1852/04/20"];
var gbook4 = ["Bling Money","George Orwell", 3, "1999/04/01"];
var gbook5 = ["Zen and the Art of Motorcycle Maintenance","Robert M. Persig", 3, "1986/11/15"];
var gbook6 = ["The Crucified Church","Joel L. Rissinger", 500, "2011/02/01"];
var gbook7 = ["The Social Meaning of Money: Pin Money, Paychecks, Poor Relief, and Other Currencies", "Viviana A. Zelizer", 420,"1997/08/30"];


library.prototype.addBooksOnPageLoad = function(){
    this._addBook(gbook1);
    this._addBook(gbook2);
    this._addBook(gbook3);
    this._addBook(gbook4);
    this._addBook(gbook6);
    this._addBook(gbook7);
};

$(function(){
  gnewLibrary.init();
});
