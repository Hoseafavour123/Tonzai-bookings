import express, { Request, Response } from 'express'
import 'dotenv/config'
import mongoose from 'mongoose'
const cors = require('cors')
import userRoutes from './routes/users'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth'

mongoose.connect(process.env.MONGO_URI as string)

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
)

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'WEll done' })
})

app.listen(7000, () => {
  console.log('App listening on port 7000')
})
