import { Button, FloatingLabel } from 'flowbite-react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import * as apiClient from '../api-client'
import { useAppContext } from '../contexts/AppContext'

export type RegisterFormData = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

const SignUp = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const {showToast} = useAppContext()

  const { register, watch, handleSubmit, formState: { errors } } = useForm<RegisterFormData>()

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      showToast({message: 'Registration successfull', type: 'SUCCESS'})
      await queryClient.invalidateQueries('validateToken')
      navigate('/')
      
    },
    onError: (error: Error) => {
      showToast({message: error.message, type: 'ERROR'})
      
    }
  })

  const onSubmit = handleSubmit((data) => {
    console.log(data);
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
            <h2 className="mt-5 text-3xl text-bold ">Sign Up</h2>
            <div className="mt-5">
              <FloatingLabel
                type="text"
                label="First name"
                variant="outlined"
                {...register('firstName', {
                  required: 'This field is required',
                })}
              />
              {errors.firstName && (
                <span className="text-red-500">{errors.firstName.message}</span>
              )}
            </div>
            <div className="mt-5">
              <FloatingLabel
                type="text"
                label="Last name"
                variant="outlined"
                {...register('lastName', {
                  required: 'This field is required',
                })}
              />
              {errors.lastName && (
                <span className="text-red-500">{errors.lastName.message}</span>
              )}
            </div>
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
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
              />
              {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
              )}
            </div>
            <div className="mt-5">
              <FloatingLabel
                type="password"
                label="Confirm Password"
                variant="outlined"
                {...register('confirmPassword', {
                  validate: (val) => {
                    if (!val) {
                      return 'This field is required'
                    } else if (watch('password') !== val) {
                      return 'Your passwords do not match'
                    }
                  },
                })}
              />
              {errors.confirmPassword && (
                <span className="text-red-500">{errors.confirmPassword.message}</span>
              )}
            </div>
            <Button
              type="submit"
              outline
              gradientDuoTone="pinkToOrange"
              className="whitespace-nowrap text-bold text-xl mx-auto w-full mt-4"
            >
              Sign Up
            </Button>
            <p className="tex-xl mt-3">
              Already in?{' '}
              <Link to="/sign-in" className="text-blue-500">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp
