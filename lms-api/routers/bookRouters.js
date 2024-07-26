import express from "express";
import {
  createBook,
  deleteBookById,
  getAllBooks,
  getBookById,
  updateBookById,
} from "../model/bookModel.js";
import {
  buildErrorResponse,
  buildSuccessResponse,
} from "../utility/responseHelper.js";
import { userAuth } from "../authMiddleware/authMiddleware.js";
import {
  deleteBookValidation,
  newBookValidation,
  updateBookValidation,
} from "../validationMiddleaware/bookValidation.js";

const bookRouter = express.Router();

// Public routes
// GET all books
bookRouter.get("/", async (req, res) => {
  try {
    const books = await getAllBooks();

    books?.length
      ? buildSuccessResponse(res, books, "All Books")
      : buildErrorResponse(res, "No books available");
  } catch (error) {
    buildErrorResponse(res, "No books available");
  }
});

// GET book
bookRouter.get("/:_id", async (req, res) => {
  try {
    const book = await getBookById(req.params._id);

    book?._id
      ? buildSuccessResponse(res, book, "Book")
      : buildErrorResponse(res, "No book available");
  } catch (error) {
    buildErrorResponse(res, "No book available");
  }
});

// Private Routes
// Create a book
bookRouter.post("/", userAuth, newBookValidation, async (req, res) => {
  try {
    const user = req.userInfo; // coming from userAuth

    if (user.role !== "admin") {
      return buildErrorResponse(res, "Not Authorized to create a book");
    }

    // if the user is admin

    const book = await createBook(req.body);

    book?._id
      ? buildSuccessResponse(res, book, "Book created Successfully")
      : buildErrorResponse(res, "Unable to create a book");
  } catch (error) {
    if (error.code === 11000) {
      error.message =
        "There is another book that has similar ISBN. Plase change the isbn and try again";
    }
    buildErrorResponse(res, error.message);
  }
});

// Update book
bookRouter.patch("/", userAuth, updateBookValidation, async (req, res) => {
  try {
    const user = req.userInfo; // coming from userAuth

    if (user.role !== "admin") {
      return buildErrorResponse(res, "Not Authorized to update a book");
    }

    // update book query
    const book = await updateBookById(req.body);

    book?._id
      ? buildSuccessResponse(res, book, "Book updated Successfully")
      : buildErrorResponse(res, "Unable to update a book");
  } catch (error) {
    if (error.code === 11000) {
      error.message =
        "There is another book that has similar ISBN. Plase change the isbn and try again";
    }
    buildErrorResponse(res, error.message);
  }
});
// delete a book
bookRouter.delete("/", async (req, res) => {
  try {
    // const user = req.userInfo; // coming from userAuth

    // if (user.role !== "admin") {
    //   return buildErrorResponse(res, "Not Authorized to update a book");
    // }

    // delete book query
    const book = await deleteBookById(req.body);

    book?.acknowledged
      ? buildSuccessResponse(res, book, "Book deleted Successfully")
      : buildErrorResponse(res, "Unable to delete a book");
  } catch (error) {
    if (error.code === 11000) {
      error.message =
        "There is another book that has similar ISBN. Plase change the isbn and try again";
    }
    buildErrorResponse(res, error.message);
  }
});

export default bookRouter;
