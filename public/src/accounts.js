function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((acc1, acc2) => acc1.name.last.toLowerCase > acc2.name.last.toLowerCase() ? 1 : -1);
}

function numberOfBorrows(account, books) {
  let borrows = 0;
  books.forEach(book => {
    let matches = book.borrows.filter(checkout => checkout.id === account.id);
    borrows += matches.length;
  });
  return borrows;
}

function getBooksPossessedByAccount(account, books, authors) {
  let possessedBooks = [];
  const possessedBooksIds = getIdsForPossessedBooks(books, account.id);
  possessedBooksIds.forEach(ids => {
    let book = getBookById(books, ids.bookId);
    book.author = getAuthorById(authors, ids.authorId);;
    possessedBooks.push(book);
  });
  return possessedBooks;
}

// get the book id and author id to make lookup easier
function getIdsForPossessedBooks(books, accountId) {
  let possessedBooksIds = [];
  let bookAndAuthorIds = {};
  books.forEach(book => {
    let matches = book.borrows.filter(borrowed => borrowed.id === accountId && borrowed.returned === false);
    if (matches.length) {
      bookAndAuthorIds.bookId = book.id;
      bookAndAuthorIds.authorId = book.authorId;
      possessedBooksIds.push(bookAndAuthorIds);
    }
  });
  return possessedBooksIds;
}

function getBookById(books, bookId) {
  return books.find(book => book.id === bookId);
}

function getAuthorById(authors, authorId) {
  return authors.find(author => author.id === authorId);
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  numberOfBorrows,
  getBooksPossessedByAccount,
};
