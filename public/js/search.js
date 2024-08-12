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
      for (let i = 0; i < books.items.length; i++) {
        //this makes it easier to parse through the data
        const book = books.items[i];

        //makes each book object
        const newBook = {
          tempId: i,
          title: book.volumeInfo.title,
          authors: book.volumeInfo.authors,
          publishedDate: book.volumeInfo.publishedDate,
          //fill with placeholder link DO THIS
          thumbnail: (book.volumeInfo.imageLinks) ? book.volumeInfo.imageLinks.thumbnail : null , //replace the null w/placeholder image ink
          description: book.volumeInfo.description,
          pageCount: book.volumeInfo.pageCount,
        };

        //adds the books to the array of searched books
        bookResults.push(newBook);
      }
      //then i want it to take us to the search results page and render these (becuase you can search on any page)
      //then i need to get the information to talk ot the routes page for posting purposes....
      console.log(bookResults);
      // bookAddHandler();
      return bookResults;
    })
    .then(function (books) {
        console.log('about to fetch post-------');
        
      console.log(books);
      
      fetch("/api/search/searchResults", {
        method: "POST",
        body: JSON.stringify(books),
        headers: {"Content-Type": "application/json"}
      })
      
    })
    // .then(function (response){
    // document.location.replace("/search-results")});
};

const searchHandler = async function (event) {
  event.preventDefault();
  //insert document query for the search button in here
  const searchedBook = document.querySelector('#titlesearch').value.trim();
  console.log(searchedBook);
  
//   const searchedBook = "lord of the rings";
  const searchResults = await getBooks(searchedBook);
}

//event listener for the search btn
document
  .querySelector('#search-btn')
  .addEventListener('click', searchHandler);