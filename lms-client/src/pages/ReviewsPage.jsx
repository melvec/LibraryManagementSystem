import { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getReviewsAction, updateReviewAction } from "../redux/reviewActions";

const ReviewsPage = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getReviewsAction())
  }, [dispatch])

  const { reviews } = useSelector(state => state.review)

  const handleOnClick = (review) => {
    dispatch(updateReviewAction({
      _id: review._id,
      status: review.status === "unapproved" ? "approved" : "unapproved"
    }))
  }

  return ( 
    <Table striped bordered>
      <thead>
        <tr>
          <th className='col-1'>#</th>
          <th className='col-2 text-wrap'>Book Title</th>
          <th className='col-1'>Reviewer</th>
          <th className='col-5'>Review</th>
          <th className='col-1'>Rating</th>
          <th className='col-1'>Status</th>
          <th className='col-1 text-center'></th>
        </tr>
      </thead>

      <tbody>
        {reviews.map((review, index) => 
          <tr key={index}>
            <td>{index+1}</td>
            <td>{review.book_title}</td>
            <td>{review.user_name}</td>
            <td>{review.message}</td>
            <td>{review.rating}</td>
            <td>{review.status}</td>
            <td>
              <Button 
                variant={review.status === "unapproved" ? "outline-success" : "outline-danger"}
                onClick={() => handleOnClick(review)}
              >
                {review.status === "unapproved" ? "Approve" : "Unapprove"}
              </Button>
            </td>
          </tr>
        )}
      </tbody>
    </Table>
   );
}
 
export default ReviewsPage;