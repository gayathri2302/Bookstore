import React, { useState, useMemo } from 'react';
import './Book.css';

function Book() {
  const [expandedBook, setExpandedBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('title');
  const [filterCategory, setFilterCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 4;

  const books = [
    { category: "Fiction", title: "YELLOWFACE", author: "R. F. KUANG", image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1604341442l/61980138._SY475_.jpg", rating: "★★★★★", description: "A thrilling exploration of identity and privilege in the world of publishing." },
    { category: "Historical Fiction", title: "WEYWARD", author: "EMILIA HART", image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1608954477l/60885672._SX318_.jpg", rating: "★★★★★", description: "A gripping tale of three generations of women who stand against the tide of history." },
    { category: "Mystery & Thriller", title: "THE HOUSEMAID'S SECRET", author: "FREIDA MCFADDEN", image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1601086596l/59416503._SX318_.jpg", rating: "★★★★★", description: "A pulse-pounding thriller that keeps you guessing until the very end." },
    { category: "Romance", title: "HAPPY PLACE", author: "EMILY HENRY", image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1608850567l/60646551._SY475_.jpg", rating: "★★★★★", description: "A heartwarming romance about second chances and the power of true love." },
    { category: "Romantasy", title: "FOURTH WING", author: "REBECCA YARROS", image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1605365462l/61445513._SX318_.jpg", rating: "★★★★★", description: "A captivating blend of romance and fantasy in a richly imagined world." },
    { category: "Fantasy", title: "HELL BENT", author: "LEIGH BARDUGO", image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1612748751l/62726346._SX318_.jpg", rating: "★★★★★", description: "An epic fantasy adventure filled with magic, danger, and unforgettable characters." },
    { category: "Science Fiction", title: "IN THE LIVES OF PUPPETS", author: "T.J. KLUNE", image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1604635254l/61817534._SX318_.jpg", rating: "★★★★★", description: "A thought-provoking sci-fi novel exploring humanity and artificial intelligence." },
    { category: "Horror", title: "HOLLY", author: "STEPHEN KING", image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1607874093l/62143495._SY475_.jpg", rating: "★★★★★", description: "A chilling horror story that delves into the darkest corners of the human psyche." }
  ];

  const categories = ['All', ...new Set(books.map(book => book.category))];

  // Filter books
  const filteredBooks = useMemo(() => {
    return books.filter(book => 
      (filterCategory === 'All' || book.category === filterCategory) &&
      (book.title.toLowerCase().includes(searchQuery.toLowerCase()) || book.author.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery, filterCategory]);

  // Sort books
  const sortedBooks = useMemo(() => {
    return [...filteredBooks].sort((a, b) => {
      if (sortOption === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sortOption === 'author') {
        return a.author.localeCompare(b.author);
      }
      return 0;
    });
  }, [filteredBooks, sortOption]);

  // Pagination
  const totalPages = Math.ceil(sortedBooks.length / booksPerPage);
  const paginatedBooks = useMemo(() => {
    const startIndex = (currentPage - 1) * booksPerPage;
    return sortedBooks.slice(startIndex, startIndex + booksPerPage);
  }, [sortedBooks, currentPage]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setCurrentPage(1); // Reset to first page on sort
  };

  const handleFilterChange = (e) => {
    setFilterCategory(e.target.value);
    setCurrentPage(1); // Reset to first page on filter
  };

  const handlePageChange = (direction) => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const toggleDescription = (index) => {
    setExpandedBook(expandedBook === index ? null : index);
  };

  return (
    <div className="App">
      <header>
        <div className="container">
          <div className="header-left">
            <h1>Free<b><i>Books</i></b></h1>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">My Books</a></li>
              <li><a href="#">Browse</a></li>
              <li><a href="#">Community</a></li>
            </ul>
          </div>
          <div className="header-right">
            <div className="search-bar">
              <input type="text" placeholder="Search books" value={searchQuery} onChange={handleSearchChange} />
              <button type="submit">Search</button>
            </div>
            <div className="filters">
              <select value={sortOption} onChange={handleSortChange}>
                <option value="title">Sort by Title</option>
                <option value="author">Sort by Author</option>
              </select>
              <select value={filterCategory} onChange={handleFilterChange}>
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <ul>
              <li><a href="#">Sign In</a></li>
              <li><a href="#">Join</a></li>
            </ul>
          </div>
        </div>
      </header>
      <main>
        <div className="container">
          <h2>The Big Books of Fall</h2>
          <h3>Discover readers' most anticipated new releases!</h3>
          <section className="categories">
            <h3>BOOKS</h3>
            <div className="grid">
              {paginatedBooks.map((book, index) => (
                <div className="book-card" key={index} onClick={() => toggleDescription(index)}>
                  {expandedBook === index ? (
                    <div className="description">
                      <p>{book.description}</p>
                    </div>
                  ) : (
                    <div className="book-details">
                      <h4>{book.category}</h4>
                      <img src={book.image} alt={book.title} />
                      <p>{book.title}</p>
                      <p>{book.author}</p>
                      <div className="rating">
                        {book.rating}
                      </div>
                      <button>Want to Read</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
          <section className="pagination">
            <span 
              className={`pagination-arrow ${currentPage === 1 ? 'disabled' : ''}`} 
              onClick={() => handlePageChange('prev')}
              dangerouslySetInnerHTML={{ __html: `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              `}} // Left arrow
            />
            <span>Page {currentPage} of {totalPages}</span>
            <span 
              className={`pagination-arrow ${currentPage === totalPages ? 'disabled' : ''}`} 
              onClick={() => handlePageChange('next')}
              dangerouslySetInnerHTML={{ __html: `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              `}} // Right arrow
            />
          </section>
          <section className="previous-years">
            <h3>PREVIOUS YEARS</h3>
            <ul>
              <li><a href="#">2022 AWARDS</a></li>
              <li><a href="#">2021 AWARDS</a></li>
              <li><a href="#">2020 AWARDS</a></li>
              <li><a href="#">2019 AWARDS</a></li>
              <li><a href="#">2018 AWARDS</a></li>
              <li><a href="#">2017 AWARDS</a></li>
              <li><a href="#">2016 AWARDS</a></li>
              <li><a href="#">2015 AWARDS</a></li>
              <li><a href="#">2014 AWARDS</a></li>
              <li><a href="#">2013 AWARDS</a></li>
              <li><a href="#">2012 AWARDS</a></li>
              <li><a href="#">2011 AWARDS</a></li>
            </ul>
          </section>
        </div>
      </main>
      <footer>
        <div className="container">
          <p>&copy; 2024 Free<i>Books</i></p>
        </div>
      </footer>
    </div>
  );
}

export default Book;
