import { useQuery } from 'react-query'
import * as apiClient from '../api-client'

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
      <div>
        <h1>No available hotels</h1>
      </div>
    )
  }
  return (
    <div className="min-h-screen">
      <div className='grid grid-cols-1 md:grid-cols-3 md:gap-3'>
        {hotelData.map((hotel) => (
          <div>
            <h1>{hotel.name}</h1>
            <img src={hotel.imageUrls[0]} alt="" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyHotels
