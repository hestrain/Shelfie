
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
      console.log(books);
      
      fetch("/api/search/searchResults", {
        method: "POST",
        body: JSON.stringify(books),
        headers: {"Content-Type": "application/json"}
      })
    })
};

//auto calls our getBooks function (for now)
// function bookSearch() {
//   let searchedBook =`slow horses`; //this is a placeholder search for testing and will become from user input

//   getBooks(searchedBook);
// }

const searchHandler = async (event) => {
  // event.preventDefault();
  //insert document query for the search button in here
  // const searchedBook = document.querySelector('#search-query').value.trim();
  const searchedBook = "lord of the rings";
  const searchResults = await getBooks(searchedBook);

  console.log(searchResults);
  
}

searchHandler();

// //we dont have these on the page yet
// document
//   .querySelector('.search-btn')
//   .addEventListener('submit', searchHandler);



//everything below this is a placeholder so i can chat with amanda about what the search page will look like
// document
//   .querySelector('.book-info') //so when you click the book from the search that you want it'll add that book to your collection
//   .addEventListener('add', bookAddHandler);

const bookAddHandler = async (event) => {
  // event.preventDefault();

  // const element = event.target;
  // console.log(element);

    // const clickedId = element.getAttribute("id");
    const clickedId = 1;
    console.log(clickedId);

    //get the search result array to search through it
    console.log(bookResults);

    //look through search result array to find marching id/imdb id
    const result = bookResults.find(({ tempId }) => tempId == clickedId);
    console.log(`___________THESE RESULTS________________`);
    
    console.log(result); //log to check

  const bookToAdd = {
    title: result.title,
    authors: result.authors,
    thumbnail: result.thumbnail,
    publishedDate: result.publishedDate, 
    description: result.description,
    pageCount: result.pageCount,
  }

  console.log(bookToAdd);
  
    const response = await fetch(`/api/search/addBook`, {
      method: 'POST',
      body: JSON.stringify(bookToAdd),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      // document.location.replace('/profile'); //lol where do we want this to go
      console.log(response);
      
    } else {
      alert('Failed to add the book');
    }
  }

  // window.onload = bookSearch();