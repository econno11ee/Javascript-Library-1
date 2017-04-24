function newBook(title, author, numberOfPages,publishDate){
  this.title=title;
  this.author=author;
  this.numberOfPages=numberOfPages;
  this.publishDates=publishDate;
}
  var Library = function() {

  }
  library.prototype.bookArray = new Array();
