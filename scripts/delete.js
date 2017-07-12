$(appReady)
let BASE_URL = (window.location.hostname == "localhost") ? `http://localhost:3000/api/v1`: `https://jason-g-reads-db.herokuapp.com/api/v1`;
function appReady() {
  removePage();
  deleteBook();
}

function removePage() {
  let url = window.location.href
  let splitURL = url.split('=');
  let id = splitURL[splitURL.length - 1];
  $.get(`${API_URL}/books/${id}`)
    .then(book => {
      removeBook(book);
    })
}

function deleteBook() {
  $('main').on('click', '.delete-button', function(event) {
    let id = $(this).attr('data-id')
    event.preventDefault();
    $.ajax({
      url: `${API_URL}/books/${id}/delete`,
      type: 'DELETE',
      success: function(result) {
        window.location = 'books.html'
      }
    })
  })
}

function removeBook(book) {
  const source = $('#remove-book-template').html();
  const template = Handlebars.compile(source);
  const html = template(book);
  $('.book-display').append(html);
}
