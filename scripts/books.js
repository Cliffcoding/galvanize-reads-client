$(appready)
const API_URL = 'http://localhost:3000/api/v1'

function appready() {
  $('.modal').modal();
  getBooks();
  clickBooks();
  addBooks();
}

function getBooks() {
  $.get(`${API_URL}/books`)
    .then(books => {
      displayBooks(books);
    })
}

function displayBooks(books) {
  const source = $('#books-template').html();
  const template = Handlebars.compile(source);
  const html = template({books});
  $('.books-display').append(html);
}

function clickBooks() {
  $('.books-display').on('click', )
}
function addBooks() {
  $('.book-submit').on('submit' (event) => {
    event.preventDefault();
    const newBookInfo = getAddedBookInfo();
  })
}

function getAddedBookInfo() {
  let title = $('.add-book-title').val();
  let imageURL = $('.add-book-image-url').val();
  let genre = $('.add-book-genre').val();

  return {
    name: userName,
    email: userEmail,
    password: userPassword
  }
}
