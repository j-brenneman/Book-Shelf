var section = document.getElementsByClassName('collection');
var show = document.getElementsByTagName('h4');

for (var i = 0; i < show.length; i++) {
  show[i].quotes = section[i].childNodes[2]
  show[i].childNodes[1].addEventListener('click', display.bind(show[i]))
}

function display () {
  $(this.quotes).toggle();
}
