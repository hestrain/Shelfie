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

//everything below this is a placeholder so i can chat with amanda about what the search page will look like
document
  .querySelector('add-book') //so when you click the book from the search that you want it'll add that book to your collection
  .addEventListener('add', bookAddHandler);

const bookAddHandler = async (event) => {
  event.preventDefault();

    const response = await fetch(`/api/books`, {
      method: 'POST',
      body: JSON.stringify({title, authors, thumbnail, publishedDate, description, pageCount, user_id}),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to add the book');
    }
  }