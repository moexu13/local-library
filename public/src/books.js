const { findAccountById } = require("./accounts");

function findAuthorById(authors, id) {
  return authors.find(author => author.id === id);
}

function buildAuthorName(authors, authorId) {
  let author = findAuthorById(authors, authorId);
  return `${author.name.first} ${author.name.last}`;
}

function findBookById(books, id) {
  return books.find(book => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  let borrowed = [];
  let inStock = [];
  books.forEach(book => {
    // the first borrow record contains the current status
    if (book.borrows[0].returned) {
      inStock.push(book);
    } else {
      borrowed.push(book);
    }
  });
  return [borrowed, inStock];
}

function getBorrowersForBook(book, accounts) {
  let borrowers = [];
  // limit to top 10 borrowers
  book.borrows.slice(0, 10).forEach(borrow => {
    let account = findAccountById(accounts, borrow.id);
    account.returned = borrow.returned;
    borrowers.push(account);
  });
  return borrowers;
}


module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
  buildAuthorName,
};
