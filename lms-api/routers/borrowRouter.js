import express from "express"
import { userAuth } from "../authMiddleware/authMiddleware.js"
import { newBorrowValidation } from "../validationMiddleaware/borrowValidation.js";
import { createBorrow, getManyBorrows, updateBorrow } from "../model/borrowModel.js";
import { buildErrorResponse, buildSuccessResponse } from "../utility/responseHelper.js";
import { updateBookById } from "../model/bookModel.js";

const borrowRouter = express.Router();

// GET all borrows
borrowRouter.get("/", userAuth, async(req, res) => {
  try {
    const { role, _id } = req.userInfo

    const borrows = role === "admin" 
                      ? await getManyBorrows({})
                      : await getManyBorrows({ user_id: _id })

    borrows?.length
      ? buildSuccessResponse(res, borrows, "Burrows")
      : buildErrorResponse(res, "No borrows available")
  } catch (error) {
    buildErrorResponse(res, error.message )
  }
})

// Create Borrow
borrowRouter.post("/", userAuth, newBorrowValidation, async(req, res) => {
  try {
    const borrow = await createBorrow(req.body)

    // if the book is borrowed, we update the book's availabilty
    if(borrow?._id){
      await updateBookById({
              id: borrow.book_id,
              status: "unavailable",
              due_date: borrow.due_date,
            })
    }

    borrow?._id
      ? buildSuccessResponse(res, borrow, "You have successfully borrowed this book, you can check your burrow history to find this information")
      : buildErrorResponse(res, "Unable to burrow the book , please contact adminstration.")
  } catch (error) {
    buildErrorResponse(res, "Unable to burrow the book , please contact adminstration.")
  }
})

// Update Borrow
borrowRouter.patch("/", userAuth, async(req, res) => {
  try {
    const { borrowId } = req.body

    const updatedBorrow = {
      id: borrowId,
      is_returned: true,
      return_date: Date(),
    }
    const borrow = await updateBorrow(updatedBorrow)

    // if the book is returned, we update the book's availabilty
    if(borrow?._id){
      await updateBookById({
              id: borrow.book_id,
              status: "available",
              due_date: null,
            })
    }

    borrow?._id
    ? buildSuccessResponse(res, borrow, "You have successfully returned the book")
    : buildErrorResponse(res, "Unable to return the borrowed book")
  } catch (error) {
    buildErrorResponse(res, "Unable to return the borrowed book")
  }
})

export default borrowRouter