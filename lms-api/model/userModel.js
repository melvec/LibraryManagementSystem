import userSchema from "../schema/userSchema.js";

// Create a user
export const createUser = (userObj) => {
  return userSchema(userObj).save()
}

// Find user by email
export const findUserByEmail = (email) => {
  return userSchema.findOne({ email })
}

// update users referesh token
export const updateRefreshJWT = (email, refreshJWT) => {
  return userSchema.findOneAndUpdate({ email }, { refreshJWT })
}