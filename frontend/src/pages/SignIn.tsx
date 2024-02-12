import { Link, useNavigate } from 'react-router-dom'
import { FloatingLabel, Button } from 'flowbite-react'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import * as apiClient from '../api-client'
import { useAppContext } from '../contexts/AppContext'

export type LoginForm = {
  email: string
  password: string
}

const SignIn = () => {
  const navigate = useNavigate()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginForm>()
  const { showToast } = useAppContext()
  const queryClient = useQueryClient()

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      showToast({ message: 'Sign in successful', type: 'SUCCESS' })
      await queryClient.invalidateQueries('validateToken')
      navigate('/')
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: 'ERROR' })
    },
  })

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data)
  })
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center">
        <div className="flex-1">
          <Link to="/" className="sm:text-xl font-bold dark:text-white">
            <span className="px-4 py-1 rounded bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-500 text-bold text-4xl text-white">
              Tonzai
            </span>
            Bookings
          </Link>
          <p className="mt-5 text-sm">Experience Flawless bookings with us</p>
        </div>
        <div className="md:mx-5 flex-1">
          <form onSubmit={onSubmit}>
            <h2 className="mt-5 text-3xl text-bold ">Login</h2>
            <div className="mt-5">
              <FloatingLabel
                type="email"
                label="Email"
                variant="outlined"
                {...register('email', { required: 'This field is required' })}
              />
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
            </div>
            <div className="mt-5">
              <FloatingLabel
                type="password"
                label="Password"
                variant="outlined"
                {...register('password', {
                  required: 'This field is required',
                })}
              />
              {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
              )}
            </div>
            <Button
              type="submit"
              outline
              gradientDuoTone="pinkToOrange"
              className="whitespace-nowrap text-bold text-xl mx-auto w-full mt-4"
            >
              Login
            </Button>
            <p className="tex-xl mt-3">
              New here?{' '}
              <Link to="/sign-up" className="text-blue-500">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignIn
