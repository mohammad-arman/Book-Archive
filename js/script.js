//empty search message variable
const emptySearch = document.getElementById('empty-search');
//fonud message variable
const foundMessage = document.getElementById('found-message');

//spineer
const spineer = property => {
    document.getElementById('spinner').style.display = property;
};

//search book data
const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    //search field empty cheak
   if(searchText === ''){
    emptySearch.innerText = 'Please write something!!';
    foundMessage.innerText = '';
    const searchBook = document.getElementById('search-book');
    searchBook.textContent = ''; 
   }
   else{ 
    spineer('block');   
    emptySearch.innerText = '';
    foundMessage.innerText = '';
    const searchBook = document.getElementById('search-book');
    searchBook.textContent = '';
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => dispalaySearchBook(data))
   }
};

//display search book details
const dispalaySearchBook = data => {
    const searchBook = document.getElementById('search-book');
    searchBook.textContent = '';
    //found message
    if(data.numFound === 0){
        foundMessage.innerText = 'Please enter the correct book name!';
    }else{
        foundMessage.innerText = `Total found: ${data.numFound}`;
    }
    spineer('none');
    //single book details
    const books = data.docs;
    books.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card h-100 border-0 shadow-lg">
                <img class="h-50" src="https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i : ''}-M.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Book Name: ${book.title ? book.title : 'N/A'}</h5>
                    <h5>Author Name: ${book.author_name? book.author_name[0]: 'N/A'}</h5>
                    <h5>Publisher: ${book.publisher ? book.publisher.slice(0,2): 'N/A'}</h5>
                    <h5>First published year: ${book.first_publish_year ? book.first_publish_year : 'N/A'}</h5>
                </div>
            </div>
        `;
        searchBook.appendChild(div);
    })
};