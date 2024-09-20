import { useMutation, useQuery } from '@apollo/client';
import { Container, Col, Form, Button, Card, Row } from 'react-bootstrap';
import { SAVE_BOOK } from '../utils/mutations';
import { GET_ME } from '../utils/queries';
import Auth from '../utils/auth';
import { searchGoogleBooks } from '../utils/API';
import { useState } from 'react';

const SearchBooks = () => {
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const [saveBook] = useMutation(SAVE_BOOK, {
    refetchQueries: [{ query: GET_ME }],
  });

  const { data } = useQuery(GET_ME);
  const userData = data?.me || {};

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchGoogleBooks(searchInput);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { items } = await response.json();

      const bookData = items.map((book) => ({
        bookId: book.id,
        authors: book.volumeInfo.authors || ['No author to display'],
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
        image: book.volumeInfo.imageLinks?.thumbnail || '',
      }));

      setSearchedBooks(bookData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveBook = async (bookId) => {
    const bookToSave = searchedBooks.find((book) => book.bookId === bookId);

    if (!Auth.loggedIn()) {
      return false;
    }

    try {
      await saveBook({
        variables: { bookData: { ...bookToSave } },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Container fluid className="text-light bg-dark p-5">
        <h1>Search for Books!</h1>
        <Form onSubmit={handleFormSubmit}>
          <Row>
            <Col xs={12} md={8}>
              <Form.Control
                name="searchInput"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                type="text"
                size="lg"
                placeholder="Search for a book"
              />
            </Col>
            <Col xs={12} md={4}>
              <Button type="submit" variant="success" size="lg">
                Submit Search
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>

      <Container>
        <h2 className="pt-5">
          {searchedBooks.length
            ? `Viewing ${searchedBooks.length} results:`
            : 'Search for a book to begin'}
        </h2>
        <Row>
          {searchedBooks.map((book) => (
            <Col md={4} key={book.bookId}>
              <Card border="dark">
                {book.image ? (
                  <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant="top" />
                ) : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className="small">Authors: {book.authors.join(', ')}</p>
                  <Card.Text>{book.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={userData.savedBooks?.some((savedBook) => savedBook.bookId === book.bookId)}
                      className="btn-block btn-info"
                      onClick={() => handleSaveBook(book.bookId)}
                    >
                      {userData.savedBooks?.some((savedBook) => savedBook.bookId === book.bookId)
                        ? 'This book has already been saved!'
                        : 'Save this Book!'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default SearchBooks;
