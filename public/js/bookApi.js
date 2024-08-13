//-------------- OK BELOW THIS IS search.js CONTENT FOR THE /SEARCH PAGE------------------------------------------------

//this is the call to the google books API
const bookKey = "AIzaSyDHEnaX2QUg8xYq_F9TdxEXKe_UElIeU9A"; //we probably want a way to encode this?
// let searchedBook =`lord of the rings`; //this is a placeholder search for testing and will become from user input
const maxResults = 6; //limits results to 6

//this will hold the array of up to 6 search results
let bookResults = [];
let search = JSON.parse(localStorage.getItem("search"));
let genre = JSON.parse(localStorage.getItem("genre"));

console.log(search);

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
      // renderBooks(bookResults);
      const bookZone = document.getElementById("book-zone")
      for (let i = 0; i < bookResults.length; i++) {
        const book = bookResults[i];
        //making a new button for the each search result object
        //button that encompasses the rest of the info
        const resultItem = document.createElement("div");
        resultItem.setAttribute("style", "width: 30%;");
        resultItem.setAttribute("class", "card book-info m-3 p-3 flex-sm-grow-1");
        resultItem.setAttribute("id", i+1);
        //counter
        const resultCounter = document.createElement("p");
        resultCounter.setAttribute("style", "font-size: x-small;")
        resultCounter.textContent = `Result ${i+1} /6`;
    
        //cover div
        const coverDiv = document.createElement("div");
        coverDiv.setAttribute("class", "text-center")
        //cover el
        const resultCover = document.createElement("img");
        const coverAlt = `Book Cover for ${book.title}`
        resultCover.setAttribute("style", "width: 130px;");
        resultCover.setAttribute("src", book.thumbnail);
        resultCover.setAttribute("alt", coverAlt)
        resultCover.setAttribute("class", "card-img-top");
        //card body div
        const bodyDiv = document.createElement("div");
        bodyDiv.setAttribute("class", "card-body")
        //title el
        const resultTitle = document.createElement("h4");
        resultTitle.textContent = book.title;
        resultTitle.setAttribute("class", "card-title text-center")
        //author(s) el
        const resultAuthor = document.createElement("h6")
        resultAuthor.textContent = "By: ";
        for (let i = 0; i < book.authors.length; i++) {
          const author = book.authors[i];
          resultAuthor.textContent += `${author}`
        if (i < (book.authors.length - 1)){
          resultAuthor.textContent += " + "
        } 
        }
        //description el
        const resultDesc = document.createElement("p");
        resultDesc.setAttribute("class", "card-text");
        resultDesc.setAttribute("style", "font-size:smaller;");
        resultDesc.textContent = book.description;
    const bookBtnId = `${i+1}`
        //add book button
        const addButton = document.createElement("button");
        addButton.setAttribute("type", "add");
        addButton.setAttribute("id", bookBtnId);
        addButton.setAttribute("class", "btn btn-light mt-3 mb-3 add-book");
        addButton.textContent = "Add Book to Collection ⊕";
    
        //more info button (this is a pipe dream)
        // const infoButton = document.createElement("button");
        // infoButton.setAttribute("type", "info");
        // infoButton.setAttribute("id", i);
        // infoButton.setAttribute("class", "btn btn-light mt-3 mb-3 more-info")
    
        //add it all together
        coverDiv.append(resultCover);
        bodyDiv.append(resultTitle, resultAuthor, resultDesc, addButton);
        resultItem.append(coverDiv, bodyDiv);
      
        //choose which row it goes on
        bookZone.append(resultItem);
        
      }
    })
    // .then(function (books) {
    //   console.log(
    //     "about to do the POST to /api/search/searchResults for the below books"
    //   );

    //   console.log(books);

    //   fetch("/api/search/searchResults", {
    //     method: "POST",
    //     body: JSON.stringify(books),
    //     headers: { "Content-Type": "application/json" },
    //   });
    // })
  // //this placement was not working :( the books have not renderwd yet 
  // .then(function (response){
  // fetch("/search-results", {
  // method: "GET",
// })
  // });
}


//function that handles the search query from the /search page. takes user input and feeds it to the above API
const searchHandler = async function (event) {
  event.preventDefault();
  //document query for search bar
  const searchedBook = document.querySelector("#titlesearch").value.trim();
  const genreSearch = document.querySelector("#genresearch").value.trim();

  if(searchedBook && genreSearch){
    console.log(`SEARCHING FOR: ${searchedBook} in ${genreSearch} genre`);
    localStorage.setItem("search", JSON.stringify(searchedBook));
    localStorage.setItem("genre", JSON.stringify(genreSearch));

    window.location.replace("/search-results");


  } else if(searchedBook && !genreSearch) {
    console.log(`SEARCHING FOR: ${searchedBook}`);
    localStorage.setItem("search", JSON.stringify(searchedBook));

    window.location.replace("/search-results");


  }else if(!searchedBook) {
    const alertLocation = document.querySelector("#search-bar");
    const alert = document.createElement("div");
    alert.setAttribute("class", "alert alert-danger");
    alert.setAttribute("role", "alert");
    alert.textContent = "Please enter a book name in the search bar";
    alertLocation.append(alert);
  }
  //log to check what we're searching for
  console.log(`SEARCHING FOR: ${searchedBook}`);

  localStorage.setItem("search", JSON.stringify(searchedBook));


  // //here are the search results
  // searchResults = await fetch(`/api/search/results/${searchedBook}`, {
  //   method: "GET"
  // })
};
//-------------- ABOVE THIS IS ORIGINAL search.js CONTENT------------------------------------------------

//-------------- OK BELOW THIS IS ORIGINAL bookApi CONTENT------------------------------------------------
const bookAddHandler = async (event) => {
  event.preventDefault();
  console.log(event.target);

  if(event.target.matches("button")){
    const clickedId = event.target.getAttribute("id");
    console.log(`THE ID OF THE CLICKED BOOK IS ${clickedId}`);
    console.log(
      `IT SHOULD MATCH THE ID OF ONE OF THESE BOOKS: ---------------------`
    );
    
    // console.log(bookResults);
  
    let result;
  for (let i = 0; i < bookResults.length; i++) {
    const book = bookResults[i];
    // console.log(book.title);
    // console.log(`clicked id: ${clickedId}, book id: ${book.tempId} `);
    
    
        if (book.tempId == clickedId) {
          result = book;
        }
  };
  

console.log(`the matching one is: ${result}`);

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
    //on page load get the search results
    getBooks(search);
    console.log(("performing the search for" + search));
    
    //event listener for the add book button
    const addBook = document.querySelector("#book-zone"); //so when you click the book from the search that you want it'll add that book to your collection
    addBook.addEventListener("click", bookAddHandler);

  }
}
//calls the function that checks the page
pageChecker();

const renderBooks = function () {

}


//-----------------------VANILLA JAVASCRIPT VERSION----------------


//type search
//then click search button
//save search query in local storage
//go to next page and get search query out of storage
//call to API to get books based on search query
//create an array of these
//render them on the page by creating elements
//these have buttons(add and view more info?)
//when the add book button is clicked
//takes info from array and sends it to database
