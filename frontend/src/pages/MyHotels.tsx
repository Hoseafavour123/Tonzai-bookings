import { useQuery } from 'react-query'
import * as apiClient from '../api-client'
import { useState } from 'react'
import Pagination from '../components/Pagination'
import { Link } from 'react-router-dom'
import { Button } from 'flowbite-react'

const MyHotels = () => {
  const { data } = useQuery('fetchMyHotels', apiClient.fetchMyHotels, {
    onError: () => {},
  })

  
  const [hotelData, setHotelData] = useState(data)
  const [currentPage, setCurrentPage] = useState(1)
  const [hotelPerPage, setPostPerPage] = useState(6)

  const lastHotelIndex = currentPage * hotelPerPage
  const firstHotelIndex = lastHotelIndex - hotelPerPage

  const currentHotels = hotelData?.slice(firstHotelIndex, lastHotelIndex)

  if (!hotelData) {
    return (
      <div className="min-h-screen">
        <h1>No available hotels</h1>
        <div>
          <button onClick={() => setCurrentPage(0)}>page num</button>
          <button onClick={() => setHotelData([])}>data</button>
          <button onClick={() => setPostPerPage(0)}></button>
        </div>
      </div>
    )
  }
  return (
    <div className="min-h-screen">
      <div className="flex mx-auto">
        <h1 className="font-2xl font-bold">My Hotels</h1>
        <Button>
          <Link to="/add-hotel">Add Hotel</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-3">
        {currentHotels?.map((hotel) => (
          <div className="flex">
            <img
              src={hotel?.imageUrls[0]}
              width={100}
              height={100}
              alt=""
              className="flex-1"
            />
            <div className="flex-1">
              <h1>{hotel?.name}</h1>
              <p>{hotel?.description}</p>
              <span>{hotel.facilities}</span>
            </div>
          </div>
        ))}
      </div>
      <div>
        <Pagination
          totalPosts={hotelData.length}
          postsPerPage={hotelPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  )
}

export default MyHotels
