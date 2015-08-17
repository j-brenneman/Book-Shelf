var books;
var picture = document.getElementsByTagName('img')[0];

$(document).ready(function () {  // only begin once page has loaded
  $("#txtBookSearch").autocomplete({ // attach auto-complete functionality to textbox
      // define source of the data
      source: function (request, response) {
        // url link to google books, including text entered by user (request.term)
        var booksUrl = "https://www.googleapis.com/books/v1/volumes?printType=books&q=" + encodeURIComponent(request.term);
        $.ajax({
            url: booksUrl,
            dataType: "jsonp",
            success: function(data) {
              response($.map(data.items, function (item) {
                  if (item.volumeInfo.authors && item.volumeInfo.title && item.volumeInfo.industryIdentifiers && item.volumeInfo.publishedDate)
                  {
                    return {
                      // label value will be shown in the suggestions
                      label: item.volumeInfo.title + ', ' + item.volumeInfo.authors[0] + ', ' + item.volumeInfo.publishedDate,
                      // value is what gets put in the textbox once an item selected
                      value: item.volumeInfo.title,
                      // other individual values to use later
                      title: item.volumeInfo.title,
                      author: item.volumeInfo.authors[0],
                      isbn: item.volumeInfo.industryIdentifiers,
                      publishedDate: item.volumeInfo.publishedDate,
                      image: (item.volumeInfo.imageLinks == null ? "" : item.volumeInfo.imageLinks.thumbnail),
                      description: item.volumeInfo.description,
                    };
                  }
              }));
            }
        });
      },
      select: function (event, ui) {
        books = ui.item;
        newBook.style.display = 'none';
        event.preventDefault();
        picture.src = ui.item.image;
        var title = document.getElementById('title');
        title.innerHTML = ui.item.title;
        var description = document.getElementById('description');
        description.innerHTML = ui.item.description;
        var bookPreview = document.getElementById('bookPreview');
        var author = document.getElementById('author');
        author.innerHTML = 'Author:' + '<br>' + ui.item.author;
        var publishedDate = document.getElementById('publishedDate');
        publishedDate.innerHTML = 'Published:' + '<br>' + ui.item.publishedDate;
        bookPreview.style.display = 'block'
        console.log(books);
      },
      minLength: 2 // set minimum length of text the user must enter
  });
});

// Populate Prefilled Form
var favorite = document.getElementById('Favorite');
var newBook = document.getElementById('newBook');
favorite.addEventListener('click', function () {
  bookPreview.style.display = 'none';
  var newTitle = document.getElementsByName('title')[0];
  newTitle.value = books.title;
  var newAuthor = document.getElementsByName('author')[0];
  newAuthor.value = books.author;
  var newDescription = document.getElementsByName('description')[0];
  newDescription.value = books.description;
  var newImage = document.getElementsByName('imageUrl')[0];
  newImage.value = books.image;
  var newPublishedDate = document.getElementsByName('published')[0];
  newPublishedDate.value = books.publishedDate;
  newBook.style.display = 'block';
})

// Add Quotes
var bookForm = document.getElementById('quotes');
var addQuote = document.getElementById('addQuote');
addQuote.addEventListener('click', function (evt) {
  evt.preventDefault();
  var newLine = document.createElement('br');
  var quote = document.createElement('textarea');
  var att = document.createAttribute('name');
  att.value='quotes'
  quote.setAttributeNode(att);
  bookForm.appendChild(newLine);
  bookForm.appendChild(quote);
});
