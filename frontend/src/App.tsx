import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Header from './components/Header'
import FooTer from './components/Footer'
import AddHotel from './pages/AddHotel'
import { useAppContext } from './contexts/AppContext'
import MyHotels from './pages/MyHotels'
import EditHotel from './pages/EditHotel'
import SearchBar from './components/SearchBar'
import Search from './pages/Search'
import Details from './pages/Details'
import Booking from './pages/Booking'

function App() {
  const {isLoggedIn} = useAppContext()
  return (
    <BrowserRouter>
      <Header />
      <SearchBar />
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/about" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/detail/:hotelId" element={<Details />} />
        {isLoggedIn && (
          <>
            <Route path="/hotel/:hotelId/booking" element={<Booking/>} />
          </>
        )}
        {isLoggedIn && (
          <>
            <Route path="/add-hotel" element={<AddHotel />} />
          </>
        )}
        {isLoggedIn && (
          <>
            <Route path="/my-hotels" element={<MyHotels />} />
          </>
        )}
        {isLoggedIn && (
          <>
            <Route path="/edit-hotel/:hotelId" element={<EditHotel />} />
          </>
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <FooTer />
    </BrowserRouter>
  )
}

export default App