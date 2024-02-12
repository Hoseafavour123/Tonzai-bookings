import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Header from './components/Header'
import FooTer from './components/Footer'

function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/sign-up' element={<SignUp/>} />
        <Route path='/sign-in' element={<SignIn/>} />
        <Route path='/about' element={<Home/>} />
      </Routes>
      <FooTer/>
    </BrowserRouter>
  )
}

export default App
