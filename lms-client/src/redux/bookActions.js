import { toast } from "react-toastify";
import { setBook, setBooks } from "./bookSlice";
import {
  createBook,
  deleteBook,
  getBook,
  getBooks,
  updateBook,
} from "../axios/bookAxios";

// get all books
export const getBooksAction = () => async (dispatch) => {
  const result = await getBooks();

  if (result?.status === "error") {
    return toast.error(result.message);
  }

  dispatch(setBooks(result.data));
};

// create a book
export const createBookAction = (bookObj) => async (dispatch) => {
  const result = await createBook(bookObj);

  if (result?.status === "error") {
    return toast.error(result.message);
  }

  toast.success(result.message);

  dispatch(getBooksAction());
};

// update a book
export const updateBookAction = (bookObj) => async (dispatch) => {
  const result = await updateBook(bookObj);

  if (result?.status === "error") {
    return toast.error(result.message);
  }

  toast.success(result.message);

  dispatch(getBooksAction());
};

// Delete a book
export const deleteBookAction = (bookObj) => async (dispatch) => {
  const result = await deleteBook(bookObj);

  if (result?.status === "error") {
    return toast.error(result.message);
  }
  toast.success(result.message);
  dispatch(getBooksAction());
};

// Get a book
// get a books
export const getBookAction = (_id) => async (dispatch) => {
  const result = await getBook(_id);

  if (result?.status === "error") {
    return toast.error(result.message);
  }

  dispatch(setBook(result.data));
};
