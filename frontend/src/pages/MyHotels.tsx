import { useQuery } from 'react-query'
import * as apiClient from '../api-client'
import { Link } from 'react-router-dom'
import { Button } from 'flowbite-react'
import { facilitiesIcon, star} from '../assets/icons/'

const MyHotels = () => {
  const { data: hotelData } = useQuery(
    'fetchMyHotels',
    apiClient.fetchMyHotels,
    {
      onError: () => {},
    }
  )

  if (!hotelData) {
    return (
      <div className='min-h-screen flex mx-auto'>
        <h1 className='text-2xl font-bold'>No available hotels</h1>
      </div>
    )
  }
  return (
    <div className="min-h-screen">
      <div className="flex flex-shrink-0 justify-between mt-10 mb-10">
        <h1 className="mx-auto font-bold text-3xl">My Hotels</h1>
        <Link to="/add-hotel" className="mx-auto">
          <Button>Add Hotel</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5 mt-5 max-w-7xl mx-auto">
        {hotelData.map((hotel) => (
          <div className="relative flex align-top gap-2 mb-10 mx-5">
            <img src={hotel.imageUrls[0]} width={300} height={200} />
            <div className="flex flex-col flex-1">
              <h1 className="text-2xl font-bold">{hotel.name}</h1>
              <span>
                {hotel.city} - {hotel.country}
              </span>
              <small className="mt-5">{hotel.type}</small>
              <p className="text-xl">{hotel.description}</p>
              <span className="text-sm font-thin mt-5">
                <img
                  src={facilitiesIcon}
                  height={30}
                  width={30}
                  className="inline"
                />
                <div className="inline text-sm">
                  {hotel.facilities.map((fac) => {
                    return <span>{fac} </span>
                  })}
                </div>
              </span>
              <span className="text-sm">
                <p>Adult: {hotel.adultCount}</p>
                <p>Children: {hotel.childCount}</p>
              </span>
            </div>
            <span className='absolute left-5 top-0 text-black-600 bg-white px-2'>
              <img src={star} width={30} height={30} className="inline" />{' '}
              {hotel.starRating}
            </span>
            <span className="absolute bottom-0 right-0 max-lg:unset border-red-500 text-white bg-red-500 px-3 rounded-full">
              ${hotel.pricePerNight}
            </span>

            <div className="absolute bottom-0 flex gap-2">
              <Button className="bg-blue-500 h-6">
                <Link to={`/edit-hotel/${hotel._id}`}>Edit</Link>
              </Button>
              <Button className="bg-red-500  h-6">Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyHotels
