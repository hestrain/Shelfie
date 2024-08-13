//-------------- OK BELOW THIS IS search.js CONTENT FOR THE /SEARCH PAGE------------------------------------------------

//this is the call to the google books API
const bookKey = "AIzaSyDHEnaX2QUg8xYq_F9TdxEXKe_UElIeU9A"; //we probably want a way to encode this?
// let searchedBook =`lord of the rings`; //this is a placeholder search for testing and will become from user input
const maxResults = 6; //limits results to 6

//this will hold the array of up to 6 search results
let bookResults = [];
let searchResults = [];
// let searchResults = [];

//function to search for a query and return an array of 6 book objects from the results
function getBooks(searchedBook) {
  //url for google books API
  const booksURL = `https://www.googleapis.com/books/v1/volumes?q=${searchedBook}&maxResults=${maxResults}&key=${bookKey}`;
  const apiOptions = {
    method: "GET",
  };

  fetch(booksURL, apiOptions)
    .then(function (response) {
      //return data as json
      return response.json();
    })
    //this is where we create the books from the results
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
          thumbnail: book.volumeInfo.imageLinks
            ? book.volumeInfo.imageLinks.thumbnail
            : null, //replace the null w/placeholder image ink
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
      console.log(
        "about to do the POST to /api/search/searchResults for the below books"
      );

      console.log(books);

      fetch("/api/search/searchResults", {
        method: "POST",
        body: JSON.stringify(books),
        headers: { "Content-Type": "application/json" },
      });
    })
  //this placement was not working :( the books have not renderwd yet 
  // .then(function (response){
  // document.location.replace("/search-results")});
}


//function that handles the search query from the /search page. takes user input and feeds it to the above API
const searchHandler = async function (event) {
  event.preventDefault();
  //document query for search bar
  const searchedBook = document.querySelector("#titlesearch").value.trim();
  //log to check what we're searching for
  console.log(`SEARCHING FOR: ${searchedBook}`);

  //here are the search results
  searchResults = await getBooks(searchedBook);
};
//-------------- ABOVE THIS IS ORIGINAL search.js CONTENT------------------------------------------------

//-------------- OK BELOW THIS IS ORIGINAL bookApi CONTENT------------------------------------------------
const bookAddHandler = async (event) => {
  event.preventDefault();

  const element = event.target;
  console.log(element.parentElement.parentElement);

  let clickedId = element.parentElement.parentElement.getAttribute("id");
  // const clickedId = 1;
  console.log(`THE ID OF THE CLICKED BOOK IS ${clickedId}`);
  console.log(
    `IT SHOULD MATCH THE ID OF ONE OF THESE BOOKS: ---------------------`
  );
  clickedId++;
  const result = await fetch(`/api/search/searchResults/${clickedId}`, {
    method: "GET",
  header: {"Content-Type": "application/json"}});

  console.log(result.data);

  //look through search result array to find marching id
  // const result = searchResults.find(({ id }) => id == clickedId);

  console.log(
    `___________THIS SHOULD BE THE BOOK THAT MATCHED THE CLICKED ID________________`
  );

  // console.log(result); //log to check

  const bookToAdd = {
    title: result.title,
    authors: result.authors,
    thumbnail: result.thumbnail,
    publishedDate: result.publishedDate,
    description: result.description,
    pageCount: result.pageCount,
  };

  console.log(bookToAdd);

  const response = await fetch(`/api/search/addBook`, {
    method: "POST",
    body: JSON.stringify(bookToAdd),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    // document.location.replace('/profile'); //lol where do we want this to go
    console.log(response);
  } else {
    alert("Failed to add the book");
  }
};

//this checks which page we're on so i dont get errors about not being able to access the addeventlisteners
const pageChecker = function () {
  console.log("checking which page we're on");
  console.log(window.location.pathname);

  if (window.location.pathname === "/search") {
    //event listener for the search btn
    document
      .querySelector("#search-btn")
      .addEventListener("click", searchHandler);
  } else if (window.location.pathname === "/search-results"){
    //event listener for the add book button
    const addBook = document.querySelector(".add-book"); //so when you click the book from the search that you want it'll add that book to your collection
    
    addBook.addEventListener("click", bookAddHandler);

  }
};
//calls the function that checks the page
pageChecker();
