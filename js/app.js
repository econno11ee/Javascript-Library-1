



function newBook(title, author, numberOfPages,publishDate){
    this.title=title;
    this.author=author;
    this.numberOfPages= numberOfPages;
    this.publishDates= new Date(publishDate);
}

var library = function() {
}


library.prototype.myBookArray = new Array();








library.prototype.init = function(){
  this._bindEvents();
  this.addBooksOnPageLoad();
  this._showBooks();
  $(".stuff-to-search").hide();
  $(".show-search").on('click', function() {
  $(".stuff-to-search").slideToggle(400);
  $(this).toggleClass("active");
});
};

library.prototype._bindEvents = function(){
  $("button.show-authors").on("click", $.proxy(this._getAuthors, this));
  $("button.search-title").on("click", $.proxy(this._getBookByTitle, this));
  $(".search-author").on("click", $.proxy(this._getBooksByAuthor, this));
  $(".remove-author").on("click", $.proxy(this._removeBookByAuthor, this));
  $(".remove-title").on("click", $.proxy(this._removeBookByTitle, this));
  $("button.randomA").on("click", $.proxy(this._getRandomAuthor, this));
  $("button.randomB").on("click", $.proxy(this._getRandomBook, this));
  $("button.submit").on("click", $.proxy(this._addBooks, this));
  $("button.add-forms").on("click", $.proxy(this._addForm, this));
  // $("#results").slideDown();

};



library.prototype._showBooks = function(){
	$("#library").empty();
	this.myBookArray.forEach(function(book){
	$("#library").append("<li class='display'><span class='title'>" + book.title + "</span>: " +  "<em>" + book.author + "</em>" + ", " + book.numberOfPages + ", " + "&copy;" + book.publishDates.getFullYear() + "</li>");
	});
};

library.prototype._addBook = function (book) {
    if (this.myBookArray.length){
        for(var i = 0; i < this.myBookArray.length; i++){
            if(this.myBookArray[i].title == book.title) {
    				    return false;

                }
            }
            this.myBookArray.push(book);
            return true;
        } else {this.myBookArray.push(book);                  //if library is empty add the book
            return true;
          }
};


library.prototype._addBooks = function(){
    var books = [];
    var booksAdded = [];
    var notAdded = [];
    $.each($(".forms form"),function(Index, val){
        var $form = $(this);
        var title = $form.find(".title").val();
        var author = $form.find(".author").val();
        var pages = $form.find(".pages").val();
        var date = $form.find(".date").val();

        books.push(new newBook(title, author, pages, date));
  });
    for(var j=0; j < books.length; j++){
        var bookTitle = books[j].title;
        if(this._addBook(books[j])){
          booksAdded.push(bookTitle);
        } else {
          notAdded.push(bookTitle);
        }
	}
    this._showResults1(notAdded);
    this._showResults2(booksAdded);
    return this._showBooks();
};

library.prototype._showResults1 = function(titles) {
  if (titles.length == 1) {
      $("#results").append("<li id='results'> span class='title'>" + titles[0] + "</span> is already in the library.</li>");
  } else if (titles.length == 2){
      $("#results").append("<li id='results'> <span class='title'>" + titles[0] + "</span> and <span class='title'>" + titles[1] + "</span> are already in the library.</li>");
  } else if (titles.length > 2){
      var stringTitle = [];
      var titles1 = titles.slice(0,-1);
      for(var p = 0; p < titles1.length; p++){
          stringTitle.push(titles1[p]);
    }
    $("#results").append("<li id='results'> <span class='title'>" + stringTitle.join("</span> ,  <span class='title'>") + "</span>, and " + "<span class='title'>" + titles[titles.length-1] + "</span> are already in the library.</li>");
  }
};

library.prototype._showResults2 = function(titles) {
  if (titles.length == 1) {
      $("#results").append("<li id='results'><span class='title'>" + titles[0] + "</span> was added to the library.</li>");
  } else if (titles.length == 2){
      $("#results").append("<li id='results'> <span class='title'>" + titles[0] + "</span> and <span class='title'>" + titles[1] + "</span> were added to the library.</li>");
  } else if (titles.length > 2){
      var stringTitle = [];
      var titles1 = titles.slice(0,-1);
      for(var p = 0; p < titles1.length; p++){
          stringTitle.push(titles1[p]);
    }
    $("#results").append("<li id='results'> <span class='title'>" + stringTitle.join("</span> ,  <span class='title'>") + "</span>, and " + "<span class='title'>" + titles[titles.length-1] + "</span> were added to the library.</li>");
  }
};

library.prototype._addForm = function(){
  $("div.forms").append(this._formHTML);
};

library.prototype._formHTML = function(){
  return '<br /><p>Book ' + ($("form.add-books").length + 1) + '</p><form class="form-inline add-books">'
  + '<div class="form-group aBooks">' +
    '<input type="text" class="form-control input-space title" placeholder="title">' +
    '<input type="text" class="form-control input-space author" placeholder="author">' +
    '</div>' +
    '<div class="form-group aBooks">' +
    '<input type="number" class="form-control input-space pages" placeholder="# of pages">' +
    '<input type="date" class="form-control input-space date" placeholder="Publish Date">' +
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
        $("li#results").slideDown("slow");
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

library.prototype._getBookByTitle = function () {
    var title = $(".stitle").val();
    var booksThatMatch = new Array();
    for (var i = 0; i<this.myBookArray.length; i++) {
        if (this.myBookArray[i].title.toLowerCase().match(title.toLowerCase()) !== null) {
            booksThatMatch.push(this.myBookArray[i]);
        }
    }//2nd leg of if statement has to be outside of loop to get more than one match
    console.log(booksThatMatch)
    if(booksThatMatch.length){
        var stringTitle = [];
        for(var p = 0; p < booksThatMatch.length; p++){
          stringTitle.push(booksThatMatch[p].title);
        } $("#results").replaceWith("<li id='results'>" + stringTitle.join(" , ") + " are in the library.</li>");
    } else {
   $("#results").replaceWith("<li id='results'>There are no books that match that title in the library.</li>");
    }
};


library.prototype._getBooksByAuthor = function () {
    var author = $(".sauthor").val();
    var BooksWithAuthorsThatMatch = new Array();
    for (var i = 0; i<this.myBookArray.length; i++) {
        if (this.myBookArray[i].author.toLowerCase().match(author.toLowerCase()) !== null) {
            BooksWithAuthorsThatMatch.push(this.myBookArray[i]);
            var AuthorThatMatches = this.myBookArray[i].author;
        }
    }
    if(BooksWithAuthorsThatMatch.length){
        var stringTitles= [];
        for(var p = 0; p < BooksWithAuthorsThatMatch.length; p++){
          stringTitles.push(BooksWithAuthorsThatMatch[p].title);
        }
         $("#results").replaceWith("<li id='results'>" + stringTitles.join(" , ") + " by " + AuthorThatMatches + " are in the library.</li>");
    } else {
   $("#results").replaceWith("<li id='results'>There are no authors with that name in the library.</li>");
    }
};

library.prototype._getAuthors = function () {
    var filter = {}; //staging object searches for duplicates before passing authors to a new array
    var Authors=[];//new array of authors in library
	  for(var i = 0; i < this.myBookArray.length; i++) {
		    if (!filter[this.myBookArray[i].author]) {//if this does not exist
			       filter[this.myBookArray[i].author] = true; //then add key/value pair of "author xyz" = true to the n object
			       Authors.push(this.myBookArray[i].author); //and push, the author into the Authors array
		    } //do nothing
	  } console.log (Authors)
    var stringAuthors= [];
      for(var p = 0; p < Authors.length; p++){
      stringAuthors.push(Authors[p]);
    }
     $("#results").replaceWith("<li id='results'>" + stringAuthors.join(" , ") + ".</li>");
};





var gnewLibrary = new library();

var gbook1 = new newBook ("1987","George Orwell", 3, "1944/03/25");
var gbook2 = new newBook("Duck Farm","George Orwell", 3, "1902/01/20");
var gbook3 = new newBook("The Crucible","Arthur Miller", 3, "1852/04/20");
var gbook4 = new newBook("Bling Money","George Orwell", 3, "1999/04/01");
var gbook5 = new newBook("Zen and the Art of Motorcycle Maintenance","Robert M. Persig", 3, "1986/11/15");
var gbook6 = new newBook("The Crucified Church","Joel L. Rissinger", 500, "2011/02/01");
var gbook7 = new newBook("The Social Meaning of Money: Pin Money, Paychecks, Poor Relief, and Other Currencies", "Viviana A. Zelizer", 420,"1997/08/30");


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
