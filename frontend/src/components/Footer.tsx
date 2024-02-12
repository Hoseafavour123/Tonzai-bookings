import { Footer } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { BsFacebook, BsInstagram, BsTwitterX, BsGithub } from 'react-icons/bs'

const FooTer = () => {
  return (
    <Footer container className="border border-t-8 border-purple-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex-col md:grid-cols-2">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
            >
              <span className="px-4 py-1 rounded bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-500 text-bold text-2xl text-white">
                Tonzai
              </span>
              Bookings
            </Link>
          </div>
          <div className="flex justify-between gap-8 mt-6 sm:flex-cols sm:gap-6">
            <div className="">
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Overview</Footer.Link>
                <Footer.Link href="#">Team</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div className="">
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">GitHub</Footer.Link>
                <Footer.Link href="#">Discord</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div className="">
              <Footer.Title title="legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy policy</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="flex flex-col">
          <Footer.Copyright
            href="#"
            by="TonzaiBookings"
            year={new Date().getFullYear()}
          />
          <div className="mx-auto flex gap-3 mt-4">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitterX} />
            <Footer.Icon href="#" icon={BsGithub} />
          </div>
        </div>
      </div>
    </Footer>
  )
}

export default FooTer
