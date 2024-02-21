import express from 'express'
import { Request, Response } from 'express'
import multer from 'multer'
import cloudinary from 'cloudinary'
import Hotel, { HotelType } from '../models/hotel'
import verifyToken from '../middleware/auth'
import { body } from 'express-validator'

const storage = multer.memoryStorage()
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
})
const router = express.Router()

router.post(
  '/',
  verifyToken,
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('city').notEmpty().withMessage('City is required'),
    body('country').notEmpty().withMessage('Country is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('type').notEmpty().withMessage('Hotel type is required'),
    body('pricePerNight')
      .notEmpty()
      .isNumeric()
      .withMessage('Price is required and must be a number'),
    body('facilities')
      .notEmpty()
      .isArray()
      .withMessage('Faciliies are required')
  ],
  upload.array('imageFiles', 6),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[]
      const newHotel: HotelType = req.body
      // Upload images to cloudinary
      const uploadPromises = imageFiles.map(async (Image) => {
        const b64 = Buffer.from(Image.buffer).toString('base64')
        let dataURI = 'data:' + Image.mimetype + ';base64,' + b64
        const res = await cloudinary.v2.uploader.upload(dataURI)
        return res.url
      })
      const imageURLs = await Promise.all(uploadPromises)
      newHotel.imageUrls = imageURLs
      newHotel.lastUpdated = new Date()
      newHotel.userId = req.userId

      const hotel = new Hotel(newHotel)
      await hotel.save()

      res.status(201).send(hotel)
    } catch (error) {
      console.log('Error creating hotel', error)
      res.status(500).json({ message: 'something went wrong' })
    }
  }
)

export default router