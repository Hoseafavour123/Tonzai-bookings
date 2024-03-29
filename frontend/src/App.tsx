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

function App() {
  const {isLoggedIn} = useAppContext()
  return (
    <BrowserRouter>
      <Header />
      <SearchBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/about" element={<Home />} />
        <Route path='/search' element={<Search/>}/>
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