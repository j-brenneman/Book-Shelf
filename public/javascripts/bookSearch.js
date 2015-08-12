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
        var picture = document.createElement('img');
        var att = document.createAttribute('src');
        att.value = ui.item.image;
        picture.setAttributeNode(att);
        document.body.appendChild(picture);
      },
      minLength: 2 // set minimum length of text the user must enter
  });
});
