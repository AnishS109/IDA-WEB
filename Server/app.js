import express from "express";
import cors from "cors"
import dotenv from 'dotenv'

import ConnectionDB from "./database/database.js"

import router from "./routes/router.js";

const app = express()

dotenv.config()

app.use(cors())

app.use("/",router)

const PORT = process.env.BACKEND_PORT
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})

ConnectionDB()