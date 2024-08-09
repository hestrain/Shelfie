const bookKey = 'AIzaSyDHEnaX2QUg8xYq_F9TdxEXKe_UElIeU9A'; //we probably want a way to encode this?
// let searchedBook =`infinite jest`; //this is a placeholder search for testing and will become from user input
const maxResults = 6; //limits results to 6

//this will hold the array of up to 6 search results
let bookResults = [];

//function to search for a query adn return an array of bok objects
function getBooks(searchedBook) {
    //url for OTT API
    const booksURL = `https://www.googleapis.com/books/v1/volumes?q=${searchedBook}&maxResults=${maxResults}&key=${bookKey}`;
    const apiOptions = {
      method: "GET",
    };

    fetch(booksURL, apiOptions)
    .then(function (response) {
      //return data as json
      return response.json();
    })
    .then(function (books) {
      console.log("BOOK INFO \n----------");

      for (let i = 0; i < books.items.length; i++) {
        //this makes it easier to parse through the data
        const book = books.items[i];

        //makes each book object
        const newBook = {
          title: book.volumeInfo.title,
          authors: book.volumeInfo.authors,
          thumbnail: book.volumeInfo.imageLinks.thumbnail,
          publishedDate: book.volumeInfo.publishedDate,
          description: book.volumeInfo.description,
          pageCount: book.volumeInfo.pageCount,
        };

        //adds the books to the array of searched books
        bookResults.push(newBook);
      }
      //log em to check the results for now
      console.log(bookResults);
      
    }
)};

//auto calls our getBooks function (for now)
function bookSearch() {
  let searchedBook =`infinite jest`; //this is a placeholder search for testing and will become from user input

  getBooks(searchedBook);
}

bookSearch();