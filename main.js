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
  createNewBookCard();
  eraseAllInput();
  // showInputValues()
  displayBooks();
  formVisibility.style.visibility = "hidden";
  visibleForm = false;
  bookList.style.opacity = 1;
});

// creating the Cards for each book containing the info of the book.
const createNewBookCard = () => {
  const newCard = document.createElement(`div`);
  newCard.setAttribute("class", "bookcard");
  const bookDetails = document.createElement("p");
  bookDetails.innerHTML = `Title: ${bookTitle.value}<br>
    Author: ${bookAuthor.value}<br>
    Pages: ${bookPages.value}<br>
    Read: ${bookHaveRead.checked}<br>        
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
    console.log(`Title: ${bookTitle.value}<br>
    Author: ${bookAuthor.value}<br>
    Pages: ${bookPages.value}<br>`)
    console.log(bookHaveRead.checked)
    bookHaveRead.checked === true ? bookHaveRead.checked = false : bookHaveRead.checked = true;
    bookDetails.innerHTML = `Title: ${bookTitle.value}<br>
    Author: ${bookAuthor.value}<br>
    Pages: ${bookPages.value}<br>
    Read: ${bookHaveRead.checked}<br>        
    `;
  })

  deleteButton.addEventListener('click', () => {
    console.log("Delete button has benen clicked")
    bookList.removeChild(newCard)

  })

  newCard.appendChild(bookDetails);
  newCard.appendChild(deleteButton);
  newCard.appendChild(changeReadStatus);
  bookList.appendChild(newCard);
};
