const bookKey = 'AIzaSyDHEnaX2QUg8xYq_F9TdxEXKe_UElIeU9A';
let searchedBook =`gideon+the+ninth`;
const maxResults = 6;

let bookResults = [];

function getBooks() {
    //url for OTT API
    const booksURL = `https://www.googleapis.com/books/v1/volumes?q=${searchedBook}&maxResults=${maxResults}`;
    const apiOptions = {
      method: "GET",
      headers: {
        "x-rapidapi-key": bookKey,
        "x-rapidapi-host": "streaming-availability.p.rapidapi.com",
      },
    };

    fetch(booksURL, apiOptions)
    .then(function (response) {
      //return data as json
      return response.json();
    })
    .then(function (books) {
      console.log(" BOOK INFO \n----------");
      //log the whole thing so i can figure out what data we need
      console.log(books);


      for (let i = 0; i < books.items.length; i++) {
        const book = books.items[i];
        const title = book.volumeInfo.title;
        const authors = book.volumeInfo.authors;
        const thumbnail = book.imageLinks.thumbnail;
        const publishedDate = book.volumeInfo.publishedDate;
        const description = book.volumeInfo.description;
        const pageCount = book.volumeInfo.pageCount;
      }
    }
)};
