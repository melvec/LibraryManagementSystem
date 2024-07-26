import { useDispatch, useSelector } from "react-redux";
import LibraryCarousel from "../components/LibraryCarousel";
import { Col, Container, Row } from "react-bootstrap";
import BookCard from "../components/BookCard";
import { useEffect } from "react";
import { getBooksAction } from "../redux/bookActions";

const HomePage = () => {
  const { books } = useSelector(state => state.book)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBooksAction())
  }, [dispatch])

  return ( 
    <>
      <div className="m-2">
        <LibraryCarousel />
      </div>

      <Container>
        <Row gap={4}>
        {books.map(book => <Col key={book._id} className="my-2"><BookCard book={book} /></Col>)}
        </Row>
      </Container>
    </>
   );
}
 
export default HomePage;