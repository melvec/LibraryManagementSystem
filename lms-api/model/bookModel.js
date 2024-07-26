import bookSchema from "../schema/bookSchema.js";

// Get all books which are available
export const getAllBooks = () => {
  return bookSchema.find();
};

//Create
export const createBook = (bookObj) => {
  return bookSchema(bookObj).save();
};

//update book
export const updateBookById = (updatedBookObj) => {
  const { id } = updatedBookObj;
  return bookSchema.findByIdAndUpdate(id, updatedBookObj);
};

//delete book
export const deleteBookById = (deletedBookObj) => {
  const { id } = deletedBookObj;
  return bookSchema.deleteOne(id);
};

// Find book by ID
export const getBookById = (_id) => {
  return bookSchema.findById(_id);
};

// create book reviews
export const createBookReviews = (reviewObj) => {
  return bookSchema.findOneAndUpdate(
    { _id: reviewObj.book_id },
    { $push: { reviews: reviewObj } }
  );
};

// update book reviews
export const updateBookReviews = (reviewObj) => {
  return bookSchema.findOneAndUpdate(
    { _id: reviewObj.book_id, "reviews._id": reviewObj._id },
    { $set: { "reviews.$.status": reviewObj.status } },
    { new: true }
  );
};
