import axios from "axios";
import { getAuthHeader } from "./axiosHelper";

const REVIEW_API_URL = "http://localhost:8000/api/review"

// PRIVATE ROUTES
export const getReviews = () => {
  const response = axios.get(REVIEW_API_URL, getAuthHeader())
                      .then(res => res.data)
                      .catch(error => { throw error})

  return response
}

// CREATE Review
export const createReview = (reviewObj) => {
  const response = axios.post(REVIEW_API_URL, reviewObj, getAuthHeader())
                      .then(res => res.data)
                      .catch(error => { throw error})

  return response
}


// Update
export const updateReview = (reviewObj) => {
  const response = axios.patch(`${REVIEW_API_URL}/${reviewObj._id}`, reviewObj, getAuthHeader())
                      .then(res => res.data)
                      .catch(error => { throw error})

  return response
}