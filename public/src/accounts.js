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
  books.forEach(book => {
    let matches = book.borrows.filter(checkout => checkout.id === account.id && checkout.returned === false);
    if (matches.length) possessedBooks.push(matches);
  });
  possessedBooks.forEach(book => {
    console.log("here");
    let author = getAuthorOfBook(book, authors);
    console.log(author);
  })
  // console.log(possessedBooks);
  // let bookAuthors = [];
  // authors.forEach(author => {

  // });
  return possessedBooks;
}

function getAuthorOfBook(book, authors) {
  return authors.filter(author => author.id === book.authorId);
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  numberOfBorrows,
  getBooksPossessedByAccount,
};
