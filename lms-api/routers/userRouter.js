import express from "express"
import { newUSerValidation } from "../validationMiddleaware/userValidation.js"
import { comparePassword, hashPassword } from "../utility/bcryptHelper.js"
import { createUser, findUserByEmail } from "../model/userModel.js"
import { buildErrorResponse, buildSuccessResponse } from "../utility/responseHelper.js"
import { generateJWTs } from "../utility/jwtHelper.js"
import { refreshAuth, userAuth } from "../authMiddleware/authMiddleware.js"
import { deleteSession } from "../model/sessionModel.js"

const userRouter = express.Router()

// Create User | Signup Endpoint
userRouter.post("/", newUSerValidation, async(req, res) => {
  try {
    // Hash password before saving
    const { password } = req.body

    const hashedPassword = hashPassword(password)

    //Query the Db
    const result = await createUser({ ...req.body, password: hashedPassword })

    result?._id
      ? buildSuccessResponse(res, result, "User created Successfully!!")
      : buildErrorResponse(res, "Could not create user!!")
  } catch (error) {
    if(error.code === 11000){
      error.message = "User with this email already exists!!"
    }

    buildErrorResponse(res, error.message)
  }
})

// Login the user
userRouter.post("/login", async(req, res) => {
  try {
    const { email, password } = req.body

    // find user with email
    const user = await findUserByEmail(email)

    if(user?._id){
      // compare the password
      const isPasswordMatched = comparePassword(password, user.password)
      const jwt = generateJWTs(email)

      isPasswordMatched
        ? buildSuccessResponse(res, jwt, "Logged in successfully")
        : buildErrorResponse(res, "Invalid Credentials!")

      return
    }

    buildErrorResponse(res, "Invalid Credentials!")
  } catch (error) {
    buildErrorResponse(res, "Invalid Credentials!")
  }
})

// Private Routes
// Get a User
userRouter.get("/", userAuth, async(req, res) => {
  try {
    buildSuccessResponse(res, req.userInfo, "User Info")
  } catch (error) {
    buildErrorResponse(res, "Invalid access token")
  }
})

// Get new access token
userRouter.get("/accessjwt", refreshAuth)

// logout 
userRouter.post("/logout", userAuth, async(req, res) => {
  try {
    const { authorization } = req.headers

    // remove session from session table
    const deletedSession = await deleteSession(authorization)

    deletedSession?._id
      ? buildSuccessResponse(res, {}, "Bye, See you again!!")
      : buildErrorResponse(res, "Could not logout")
  } catch (error) {
    buildErrorResponse(res, "Could not logout")
  }
})

export default userRouter