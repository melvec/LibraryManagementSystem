import "dotenv/config";

import express from "express"
import cors from "cors"
import { connectToMongoDb } from "./config/dbConfig.js";
import userRouter from "./routers/userRouter.js";
import bookRouter from "./routers/bookRouters.js";
import borrowRouter from "./routers/borrowRouter.js";
import reviewRouter from "./routers/reviewRouter.js";


const app = express()
const PORT = process.env.PORT || 8000

// Middlewares
app.use(cors())
app.use(express.json())

// Connect to db
connectToMongoDb()

// Routers
app.use("/api/user", userRouter)
app.use("/api/book", bookRouter)
app.use("/api/borrow", borrowRouter)
app.use("/api/review", reviewRouter)
// Start Server
app.listen(PORT, (error) => {
  error ? console.log("Error", error) : console.log("Server is running")
})