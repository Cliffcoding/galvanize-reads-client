$(appready)
const API_URL = 'http://localhost:3000/api/v1'

function appready() {
  $('.modal').modal();
  addBooks();
  removeClick()
  deleteBook()
  if ($('body').hasClass('books-list')) {
    getBooks();
  } else if ($('body').hasClass('remove-book')) {
    removePage();
  }
}

function removeClick() {
  $('main').on('click', '.remove-button', function(event) {
    let id = $(this).attr('data-id')
    console.log(id);
    event.preventDefault();
    console.log("clicked!");
    window.location = `/delete.html?id=${id}`
  })
}

function deleteBook() {
  $('main').on('click', '.delete-button', function(event) {
    console.log('clicked');
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

function removePage() {
  let url = window.location.href
  let splitURL = url.split('=');
  let id = splitURL[splitURL.length - 1];
  $.get(`${API_URL}/books/${id}`)
    .then(book => {
      console.log(book);
      removeBook(book);
    })
}

function getBooks() {
  $.get(`${API_URL}/books`)
    .then(books => {
      displayBooks(books);
      console.log(books);
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

function removeBook(book) {
  const source = $('#remove-book-template').html();
  console.log(source);
  const template = Handlebars.compile(source);
  const html = template(book);
  $('.book-display').append(html);
}

function addBooks() {
  $('.book-submit').on('submit', (event) => {
    event.preventDefault();
    const newBookInfo = getAddedBookInfo();
    $.post(`${API_URL}/books/new`, newBookInfo).then(results => {
      window.location = books.html;
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
