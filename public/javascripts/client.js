var bookForm = document.getElementById('quotes');
var addQuote = document.getElementById('addQuote');

addQuote.addEventListener('click', function (evt) {
  evt.preventDefault();
  var quote = document.createElement('textarea');
  var att = document.createAttribute('name');
  att.value='quotes'
  quote.setAttributeNode(att);
  bookForm.appendChild(quote);
});
