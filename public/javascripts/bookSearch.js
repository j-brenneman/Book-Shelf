var search = document.getElementById('bookSearch');
search.addEventListener('click', function (evt) {
  var title = document.getElementsByName('title')[0];
  var author = document.getElementsByName('author')[0];
  console.log(title.value, author.value);
  $.get( "https://www.googleapis.com/books/v1/volumes?q="+ title.value +"+inauthor:"+ author.value +"&key=AIzaSyAjLpNzXnxHMCvUmMgxv3eZGt3Lyj8pibM",
  function(data) {
    var bookId = data.items[0].id;
    console.log(bookId);
    $.get("https://www.googleapis.com/books/v1/volumes/" + bookId,
    function (book) {
      console.log(book);
      displayBook(book, evt);

    })
  });
});

function displayBook(book, evt) {
  evt.preventDefault();
  var picture = document.createElement('img');
  var att = document.createAttribute('src');
  att.value = book.volumeInfo.imageLinks.thumbnail;
  picture.setAttributeNode(att);
  document.body.appendChild(picture);
}
