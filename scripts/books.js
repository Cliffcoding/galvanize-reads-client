$(appready)

let BASE_URL = (window.location.host == "127.0.0.1:8080") ? `http://localhost:3000/api/v1` : `https://jason-g-reads-db.herokuapp.com/api/v1`;

function appready() {
  $('select').material_select();
  $('.modal').modal();
  addBooks();
  removeButton();
  editButton()
  getBooks();

}

function removeButton() {
  $('main').on('click', '.remove-button', function(event) {
    let id = $(this).attr('data-id')
    event.preventDefault();
    window.location = `/delete.html?id=${id}`
  })
}

function editButton() {
  $('main').on('click', '.edit-button', function(event) {
    let id = $(this).attr('data-id')
    event.preventDefault();
    window.location = `/edit.html?id=${id}`
  })
}

function getBooks() {
  $.get(`${BASE_URL}/books`)
    .then(books => {
      console.log(books[0].authors);
      displayBooks(books);
    })
}

function displayBooks(books) {
  const source = $('#books-template').html();
  const template = Handlebars.compile(source);
  const html = template({
    books
  });
  $('.books-display').append(html);
}

function addBooks() {
  $('.book-submit').on('submit', (event) => {
    event.preventDefault();
    const newBookInfo = getAddedBookInfo();
    $.post(`${BASE_URL}/books/new`, newBookInfo).then(results => {
      console.log('added!');
      window.location.href = 'books.html';
    })
  })
}

function getAddedBookInfo() {
  let bookTitle = $('.add-book-title').val();
  let imageURL = $('.add-book-image-url').val();
  let bookGenre = $('.add-book-genre').val();
  let bookDescription = $('.add-book-description').val();
  return {
    title: bookTitle,
    genre: bookGenre,
    description: bookDescription,
    cover_url: imageURL
  }
}
