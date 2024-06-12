import express, { Request, Response } from 'express'
import 'dotenv/config'
import mongoose from 'mongoose'
const cors = require('cors')
import userRoutes from './routes/users'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth'
import myHotelRoutes from './routes/my-hotels'
import hotelRoutes from './routes/hotels'
import bookingRoutes from './routes/my-bookings'

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
    origin: [process.env.FRONTEND_URL, 'https://tonzai-bookings.onrender.com'],
    credentials: true,
  })
)

app.use(express.static(path.join(__dirname, '../../frontend/dist')))

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/my-hotels', myHotelRoutes)
app.use('/api/hotels', hotelRoutes)
app.use('/api/my-bookings', bookingRoutes)

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/../../frontend/dist/index.html'))
})

app.listen(5000, () => {
  console.log('App listening on port 5000')
})
