import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Header from './components/Header'
import FooTer from './components/Footer'
import AddHotel from './pages/AddHotel'
import { useAppContext } from './contexts/AppContext'
import MyHotels from './pages/MyHotels'

function App() {
  const {isLoggedIn} = useAppContext()
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/about" element={<Home />} />
        {isLoggedIn && (
          <>
            <Route path="/add-hotel" element={<AddHotel />} />
          </>
        )}
        {isLoggedIn && (
          <>
            <Route path="/my-hotels" element={<MyHotels/>} />
          </>
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <FooTer />
    </BrowserRouter>
  )
}

export default App