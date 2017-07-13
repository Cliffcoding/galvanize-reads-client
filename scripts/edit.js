$(appReady)
let BASE_URL = (window.location.host == "127.0.0.1:8080") ? `http://localhost:3000/api/v1`: `https://jason-g-reads-db.herokuapp.com/api/v1`;

function appReady() {
  editPage();
  getEditValues();
}

function editPage() {
  let url = window.location.href;
  let splitURL = url.split('=');
  let id = splitURL[splitURL.length - 1];
  $.get(`${BASE_URL}/books/${id}`)
    .then(book => {
      editBook(book);
    })
}

function editBook(book) {
  const source = $('#edit-book-template').html();
  const template = Handlebars.compile(source);
  const html = template({
    book
  });
  $('.edit-display').append(html);
}

function getEditValues() {
  $('body').on('submit', '.edit-form', function (event) {
    event.preventDefault();
    let id = $(this).attr('data-id')
    let finalEdit = editValues();
    return $.ajax({
      url: `${BASE_URL}/books/${id}/edit`,
      type: 'PUT',
      data: finalEdit,
      success: (data) => {
        window.location = 'books.html'
      }
    })
  });
}

function editValues() {
  let bookTitle = $('.book-title').val();
  let imageURL = $('.book-image').val();
  let bookGenre = $('.book-genre').val();
  let bookDescription = $('.book-description').val();
  return {
    title: bookTitle,
    genre: bookGenre,
    description: bookDescription,
    cover_url: imageURL
  }
}
