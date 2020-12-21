const { buildAuthorName } = require("./books");

function totalBooksCount(books) {
  return books.length;
}

function totalAccountsCount(accounts) {
  return accounts.length;
}

function booksBorrowedCount(books) {
  let count = 0;
  books.forEach(book => {
    // check to see if book has ever been borrowed
    if (book.borrows.length > 0) {
      // if so, the first borrow record contains the current status
      if (!book.borrows[0].returned) count++;
    } 
  });
  return count;
}

function getMostCommonGenres(books) {
  let genres = [];
  books.forEach(book => {
    // check if genre is already in array
    let match = genres.find(genre => genre.name === book.genre);
    if (match) {
      match.count++;
    } else {
      genres.push({ name: book.genre, count: 1 });
    }
  });
  genres.sort((gen1, gen2) => gen2.count - gen1.count);
  
  // only return top 5 entries
  return genres.slice(0, 5);
}

function getMostPopularBooks(books) {
  let popularBooks = [];
  books.forEach(book => {
    popularBooks.push({ name: book.title, count: book.borrows.length });
  });
  popularBooks.sort((bk1, bk2) => bk2.count - bk1.count);
  
  // only return top 5
  return popularBooks.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  let bookAuthors = [];
  books.forEach(book => {
    let match = bookAuthors.find(author => author.id === book.authorId);
    if (match) {
      match.count += book.borrows.length;
    } else {
      let name = buildAuthorName(authors, book.authorId);
      bookAuthors.push({ 
        id: book.authorId, 
        name: name,
        count: book.borrows.length }); 
    }
  });
  // sort author list by total borrows
  bookAuthors.sort((au1, au2) => au2.count - au1.count);
  // return top 5
  return bookAuthors.map(author =>  ({ name: author.name, count: author.count })).slice(0, 5);
}

module.exports = {
  totalBooksCount,
  totalAccountsCount,
  booksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
