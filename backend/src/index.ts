import express, { Request, Response } from 'express'
import 'dotenv/config'
import mongoose from 'mongoose'
const cors = require('cors')
import userRoutes from './routes/users'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth'
import myHotelRoutes from './routes/my-hotels'

import path = require('path')
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})
mongoose.connect(process.env.MONGO_URI as string)

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.BACKEND_URL],
    credentials: true,
  })
)

app.use(express.static(path.join(__dirname, '../../frontend/dist')))

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/my-hotels', myHotelRoutes)
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'WEll done' })
})

app.listen(7000, () => {
  console.log('App listening on port 7000')
})
