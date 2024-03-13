import { Navbar, Button } from 'flowbite-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppContext } from '../contexts/AppContext'
import * as apiClient from '../api-client'
import { useMutation, useQueryClient } from 'react-query'


const Header = () => {
  const path = useLocation().pathname
  const { isLoggedIn, showToast } = useAppContext()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('validateToken')
      showToast({message: "Logged Out", type: 'SUCCESS'})
      navigate('/sign-in')
    },
    onError: (error: Error) => {
      showToast({message: error.message, type:'ERROR'})
    }
  })

  const handleClick = () => {
    mutation.mutate()
  }

  return (
    <Navbar className="border-b-2 mx-auto flex flex-shrink-0">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-4 py-1 rounded bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-500 text-bold text-2xl text-white">
          Tonzai
        </span>
        Bookings
      </Link>
      <div className="flex gap-5 text-center align-middle md:order-2">
      </div>
      <Navbar.Toggle />
      <Navbar.Collapse>
        {isLoggedIn ? (
          <>
            <Navbar.Link active={path === '/'} as={'div'}>
              <Link to="/my-hotels" className="text-xl">
                My Hotels
              </Link>
            </Navbar.Link>
            <Navbar.Link active={path === '/'} as={'div'}>
              <Link to="/my-bookings" className="text-xl">
                My Bookings
              </Link>
               <Link to="/sign-in" className="">
            <Button
              outline
              className="whitespace-nowrap text-bold text-xl max-lg:mt-2"
              onClick={handleClick}
            >
              Log out
            </Button>
          </Link>
            </Navbar.Link>
          </>
        ) : (
          <>
            {' '}
            <Navbar.Link active={path === '/'} as={'div'}>
              <Link to="/" className="text-xl">
                Contact
              </Link>
            </Navbar.Link>
            <Navbar.Link active={path === '/about'} as={'div'}>
              <Link to="/about" className="text-xl">
                About
              </Link>

            </Navbar.Link>
            <Link to="/sign-up" className="">
            <Button
              outline
              gradientDuoTone="pinkToOrange"
              className="whitespace-nowrap text-bold text-xl "
            >
              Sign Up / Login
            </Button>
          </Link>
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header
