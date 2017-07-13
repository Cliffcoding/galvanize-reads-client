$(appReady);

let API_URL = 'https://jello-api.herokuapp.com/api/v1/'

function getUrl() {
	API_URL = 'https://jello-api.herokuapp.com/api/v1/';
		console.log(window.location.href);
	if(window.location.href == 'http://127.0.0.1:8080/' || window.location.href == 'http://127.0.0.1:8080/index.html') {
		API_URL = 'http://localhost:3000/api/v1/';
	}
}
function appReady() {
	getUrl();
}
