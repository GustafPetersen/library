let myLibrary = [];

class BookClass {
  constructor(title, author, pages, haveRead) {
    this.id = Math.random().toString(36).slice(2);
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
  }
  get info() {
    if (haveRead) {
      return `${title} by ${author}, ${pages} pages, book read`;
    } else {
      return `${title} by ${author}, ${pages} pages, not read yet`;
    }
  }
  set updateReadState(readState) {
    return readState === true
      ? book.haveRead === false
      : book.haveRead === true;
  }
}

// Adding books to library function

function addBookToLibrary(title, author, pages, haveRead) {
  // do stuff here
  const book = new BookClass(title, author, pages, haveRead);
  myLibrary.push(book);
  console.log(book)
  return book;
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
  allInputField.forEach((input) => (input.value = null));
  newSubmission.value = "Submit";
};

// Event listener for Submission execution
newSubmission.addEventListener("click", () => {
  const book = addNewBook();
  const newCard = createNewBookCard(book);
  bookList.appendChild(newCard);
  eraseAllInput();
  formVisibility.style.visibility = "hidden";
  visibleForm = false;
  bookList.style.opacity = 1;
});

// creating the Cards for each book containing the info of the book.
const createNewBookCard = (book) => {
  const newCard = document.createElement(`div`);
  newCard.setAttribute("class", "bookcard");
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

  changeReadStatus.addEventListener("click", () => {
    book.haveRead === true ? (book.haveRead = false) : (book.haveRead = true);
    bookDetails.innerHTML = `Title: ${book.title}<br>
    Author: ${book.author}<br>
    Pages: ${book.pages}<br>
    Read: ${book.haveRead}<br>        
    `;
  });

  deleteButton.addEventListener("click", () => {
    bookList.removeChild(newCard);
    myLibrary = myLibrary.filter((b) => b.id !== book.id);
  });

  newCard.appendChild(bookDetails);
  newCard.appendChild(deleteButton);
  newCard.appendChild(changeReadStatus);
  return newCard;
};
