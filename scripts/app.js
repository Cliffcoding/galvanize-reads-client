$(appready)
function appready() {
  goToBooks();
}
function goToBooks() {
  $('#book-link').on('click', (event) => {
    event.preventDefault();
    window.location = 'books.html';
  })
}
