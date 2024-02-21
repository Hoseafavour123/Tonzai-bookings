import { useFormContext } from 'react-hook-form'
import { FloatingLabel, Textarea, Select, Label } from 'flowbite-react'
import { HotelFormData } from './ManageHotelForms'

const HotelDetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>()
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-2">Add Hotel</h1>
      <div className="mt-5">
        <FloatingLabel
          type="text"
          label="Name"
          variant="outlined"
          {...register('name', {
            required: 'This field is required',
          })}
        />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <FloatingLabel
            type="text"
            label="City"
            variant="outlined"
            {...register('city', {
              required: 'This field is required',
            })}
          />
          {errors.city && (
            <span className="text-red-500">{errors.city.message}</span>
          )}
        </div>
        <div className="flex-1">
          <FloatingLabel
            type="text"
            label="Country"
            variant="outlined"
            {...register('country', {
              required: 'This field is required',
            })}
          />
          {errors.country && (
            <span className="text-red-500">{errors.country.message}</span>
          )}
        </div>
      </div>
      <div className="">
        <Label htmlFor="description" value="Description" />
        <Textarea
          id="description"
          style={{ resize: 'none' }}
          rows={10}
          placeholder="Let's know about your hotel..."
          className="bg-white"
          {...register('description', {
            required: 'This field is required',
          })}
        />
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </div>

      <div className="max-w-[50%] mt-4">
        <FloatingLabel
          type="number"
          label="Price per night"
          min={1}
          variant="outlined"
          {...register('pricePerNight', {
            required: 'This field is required',
          })}
        />
        {errors.pricePerNight && (
          <span className="text-red-500">{errors.pricePerNight.message}</span>
        )}
      </div>

      <div className="max-w-[50%]">
        <label htmlFor="starRating">
          <span className='text-sm text-gray-400'>Star rating</span>
          <select
            id="starRating"
            {...register('starRating', {
              required: 'This field is required',
            })}
            className="border rounded w-full"
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
          {errors.starRating && (
            <span className="text-red-500">{errors.starRating.message}</span>
          )}
        </label>
      </div>
    </div>
  )
}

export default HotelDetailsSection
