   let bookResults = [];

   //get the search result array to search through it
const loadBookArray = async function() {
   bookResults = await fetch(`/api/search/searchResults`, {
    method: "GET"
  })
  console.log((bookResults));
}

loadBookArray();

const bookAddHandler = async (event) => {
  event.preventDefault();
  
  const element = event.target;
  console.log(element.parentElement.parentElement);
  
    const clickedId = element.parentElement.parentElement.getAttribute("id");
    // const clickedId = 1;
    console.log(clickedId);
    
    //look through search result array to find marching id
    const result = bookResults.find(({ id }) => id == clickedId);

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
  const addBook = document
    .querySelector('.add-book'); //so when you click the book from the search that you want it'll add that book to your collection
  
    addBook.addEventListener('click', bookAddHandler);