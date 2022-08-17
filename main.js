let myLibrary = [];

/* const button = document.body.querySelector("button")
button.addEventListener('click', (e) => {

}) */

function Book(title, author, pages, haveRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead;
  this.info = function () {
    if (haveRead === true) {
      return `${title} by ${author}, ${pages} pages, book read`;
    } else {
      return `${title} by ${author}, ${pages} pages, not read yet`;
    }
  };
}

// Adding books to library function

function addBookToLibrary(title, author, pages, haveRead) {
  // do stuff here
  let book = new Book(title, author, pages, haveRead);
  return myLibrary.push(book);
}

// Displaying each book in the myLibrary array
function displayBooks() {
  myLibrary.forEach((element) => {
    console.log(element.info());
  });
}

// initial functionality

var buttonShow = document.body.querySelector("#addBookBtn");

var formVisibility = document.body.querySelector("form");
const bookList = document.querySelector(".booklist");

var visibleForm = false;

buttonShow.addEventListener("click", (e) => {
  if (visibleForm === false) {
    formVisibility.style.visibility = "visible";
    visibleForm = true;
    bookList.style.opacity = 0.5;
  } else {
    formVisibility.style.visibility = "hidden";
    visibleForm = false;
    bookList.style.opacity = 1;
  }
});

// Submission form selectors
const bookTitle = document.body.querySelector("#title");
const bookAuthor = document.body.querySelector("#author");
const bookPages = document.body.querySelector("#pages");
const bookHaveRead = document.body.querySelector("#haveRead");
const newSubmission = document.body.querySelector("#submitbutton");

// Submit button functionality
const addNewBook = () => {
  console.log("addNewBook function initiated");
  if ((bookTitle.value && bookAuthor.value && bookPages.value !== "") || null) {
    return addBookToLibrary(
      bookTitle.value,
      bookAuthor.value,
      bookPages.value,
      bookHaveRead.checked
    );
  } else {
    console.log(`Nothing has been added to the array myLibrary`);
  }
};

// Event listener for all input fields form
const allInputField = document.body.querySelectorAll("input");

// Erase button for input fields after new submission
const eraseAllInput = () => {
  console.log("eraseAllInput function initiated");
  allInputField.forEach((input) => (input.value = null));
  newSubmission.value = "Submit";
  console.log(`All input has been erased.`);
};

const showInputValues = () => {
  console.log("showInputValues function initiated");
  allInputField.forEach((input) =>
    console.log(`${input.id} has value: ${input.value}`)
  );
};

// Event listener for Submission execution
newSubmission.addEventListener("click", () => {
  console.log("Submission button clicked!");
  addNewBook();
  myLibrary.forEach((book, index) => {
    if (index === 0){
      createNewBookCard(book, index)
    } else if (index > 0) {
      createNewBookCard(book, index+1)
    }
  })
  eraseAllInput();
  // showInputValues()
  // displayBooks();
  formVisibility.style.visibility = "hidden";
  visibleForm = false;
  bookList.style.opacity = 1;
});

// creating the Cards for each book containing the info of the book.
const createNewBookCard = (book, index) => {
  // console.log(book.title, book.author, book.pages, book.haveRead)
  const newCard = document.createElement(`div`);
  newCard.setAttribute("class", "bookcard");
  newCard.setAttribute("data-index", index)
  const bookDetails = document.createElement("p");
  bookDetails.innerHTML = `Title: ${book.title}<br>
    Author: ${book.author}<br>
    Pages: ${book.pages}<br>
    Read: ${book.haveRead}<br>        
    `;
  bookDetails.setAttribute("class", "bookDetails");
  var deleteButton = document.createElement("input");
  deleteButton.setAttribute("class", "deleteButton");
  deleteButton.type = "button";
  deleteButton.value = "Delete";
  var changeReadStatus = document.createElement("input");
  changeReadStatus.setAttribute("class", "updateReadingStatus");
  changeReadStatus.type = "button";
  changeReadStatus.value = "Change Read Status";
  changeReadStatus.addEventListener('click', () => {
    console.log("Button has benen clicked")
    console.log(`Title: ${i.title}<br>
    Author: ${i.title}<br>
    Pages: ${i.pages}<br>`)
    console.log(book.haveRead)
    book.haveRead === true ? book.haveRead = false : book.haveRead = true;
    bookDetails.innerHTML = `Title: ${book.title}<br>
    Author: ${book.author}<br>
    Pages: ${book.pages}<br>
    Read: ${book.haveRead}<br>        
    `;
  })

  deleteButton.addEventListener('click', () => {
    console.log("Delete button has benen clicked")
    bookList.removeChild(newCard)
    myLibrary.splice(index, 1)
  })

  newCard.appendChild(bookDetails);
  newCard.appendChild(deleteButton);
  newCard.appendChild(changeReadStatus);
  bookList.appendChild(newCard);
};