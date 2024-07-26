import express from "express";
import { userAuth } from "../authMiddleware/authMiddleware.js";
import { buildErrorResponse, buildSuccessResponse } from "../utility/responseHelper.js";
import { createReview, getManyReview, updateReview } from "../model/reviewModel.js";
import { createBookReviews, updateBookReviews } from "../model/bookModel.js";
import { updateBorrow } from "../model/borrowModel.js";

const reviewRouter = express.Router();

// Private Routes

// GET ALL REVIEWS
reviewRouter.get("/", userAuth, async(req, res) => {
  try {
    if(req.userInfo.role !== "admin"){
      buildErrorResponse(res, "Not authorized")
      return
    }

    const reviews = await getManyReview({})

    reviews?.length
      ? buildSuccessResponse(res, reviews, "Reviews")
      : buildErrorResponse(res, "No reviews available")
  } catch (error) {
    buildErrorResponse(res, "No reviews available")
  }
})

// CREATE a review
reviewRouter.post("/", userAuth, async(req, res) => {
  try {
    const review = await createReview(req.body)

    if(review?._id){
      // update burrow to to set has_review: true
      const updatedBurrow = {
        id: review.burrow_id,
        has_review: true,
      }

    await updateBorrow(updatedBurrow)
    await createBookReviews(review)
    }

    review?._id
      ? buildSuccessResponse(res, review, "Thank you for the review.")
      : buildErrorResponse(res, "Something went wrong.")
  } catch (error) {
    buildErrorResponse(res, error.message )
  }
})

// UPDATE a review
reviewRouter.patch("/:_id", userAuth, async(req, res) => {
  try {
    if(req.userInfo.role !== "admin"){
      buildErrorResponse(res, "Not authorized")
      return
    }

    const { _id } = req.params;
    const { status } = req.body;

    const review = await updateReview({_id}, { status })

    if(review?._id){
    // update book with review inside reviews array
    const result = await updateBookReviews(review)
    }

    review?._id
      ? buildSuccessResponse(res, review, "Review updated.")
      : buildErrorResponse(res, "Something went wrong.")
  } catch (error) {
    buildErrorResponse(res, error.message )
  }
})

export default reviewRouter