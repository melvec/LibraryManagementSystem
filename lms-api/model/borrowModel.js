import borrowSchema from "../schema/borrowSchema.js"

// Create
export const createBorrow = (borrowObj) => {
  return borrowSchema(borrowObj).save();
}

// return borrow based on filters | role
export const getManyBorrows = (filter) => {
  return borrowSchema.find(filter)
}

// update
export const updateBorrow = (updatedBurrow) => {
  const { id } = updatedBurrow
  return borrowSchema.findByIdAndUpdate(id, updatedBurrow);
};