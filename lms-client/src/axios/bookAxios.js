import axios from "axios";
import { getAuthHeader } from "./axiosHelper";

const BOOK_API_URL = "http://localhost:8000/api/book";

// public route
export const getBooks = () => {
  const response = axios
    .get(BOOK_API_URL)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });

  return response;
};

export const getBook = (_id) => {
  const response = axios
    .get(`${BOOK_API_URL}/${_id}`)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });

  return response;
};

// private route
export const createBook = (bookObj) => {
  const response = axios
    .post(BOOK_API_URL, bookObj, getAuthHeader())
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });

  return response;
};

export const updateBook = (bookObj) => {
  const response = axios
    .patch(BOOK_API_URL, bookObj, getAuthHeader())
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });

  return response;
};

export const deleteBook = (bookObj) => {
  const response = axios
    .delete(BOOK_API_URL, bookObj, getAuthHeader())
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
  return response;
};
