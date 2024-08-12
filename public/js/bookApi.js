
// import any models you plan to use for this page's routes here
const { Book } = require("../../models");

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
          tempId: i,
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

      //then i want it to take us to the search results page and render these (becuase you can search on any page)
      //then i need to get the information to talk ot the routes page for posting purposes....

      return bookResults;
    }
)};

//auto calls our getBooks function (for now)
// function bookSearch() {
//   let searchedBook =`slow horses`; //this is a placeholder search for testing and will become from user input

//   getBooks(searchedBook);
// }

const searchHandler = async (event) => {
  event.preventDefault();
  //insert document query for the search button in here
  const searchedBook = document.querySelector('#search-query').value.trim();

  getBooks(searchedBook);

  const response = await fetch (`/api/searchRoutes`, {
    method: 'POST',
    body: JSPM.stringify(searchResults),
    headers: {
      'Content-Type': 'application/json',
    },
  })



}

//we dont have these on the page yet
document
  .querySelector('.search-btn')
  .addEventListener('submit', searchHandler);



//everything below this is a placeholder so i can chat with amanda about what the search page will look like
document
  .querySelector('.book-info') //so when you click the book from the search that you want it'll add that book to your collection
  .addEventListener('add', bookAddHandler);

const bookAddHandler = async (event) => {
  event.preventDefault();

  const element = event.target;
  console.log(element);

    const clickedId = element.getAttribute("id");
    console.log(clickedId);

    //get the search result array to search through it
    searchResults = JSON.parse(localStorage.getItem("searchResults"));
    console.log(searchResults);

    //look through search result array to find marching id/imdb id
    const result = searchResults.find(({ tempId }) => tempId == clickedId);
    console.log(result); //log to check

  const bookToAdd = {
    title: result.title,
    authors: result.authors,
    thumbnail: result.thumbnail,
    publishedDate: result.publishedDate, 
    description: result.description,
    pageCount: result.pageCount,
  }

    const response = await fetch(`/`, {
      method: 'POST',
      body: JSON.stringify({bookToAdd}),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile'); //lol where do we want this to go
    } else {
      alert('Failed to add the book');
    }
  }

  // window.onload = bookSearch();