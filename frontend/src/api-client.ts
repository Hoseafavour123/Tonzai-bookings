import { RegisterFormData } from "./pages/SignUp";
import { LoginForm } from "./pages/SignIn";
import { BookingFormData } from "./forms/BookingForm/BookingForm";
import { BookingType } from "./pages/MyBookings";


export type UserType = {
  _id: string
  email: string
  password: string
  firstName: string
  lastName: string
}

export type HotelType = {
  _id: string
  userId: string
  name: string
  city: string
  country: string
  description: string
  type: string
  adultCount: number
  childCount: number
  facilities: string[]
  pricePerNight: number
  starRating: number
  imageUrls: string[]
  lastUpdated: Date
  bookings: BookingType[]
}


export type SearchParams = {
  destination?: string
  checkIn?: string
  checkOut?: string
  adultCount?: string
  childCount?: string
  page?: string
  facilities?: string[]
  types?: string[]
  stars?: string[]
  maxPrice?: string
  sortOption?: string
}

export type HotelSearchResponse = {
  data: HotelType[]
  pagination: {
    total: number
    page: number
    pages: number
  }
}

export type PaymentIntentResponse = {
  paymentIntentId: string
  clientSecret: string
  totalCost: number
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
//const API_BASE_URL = 'https://tonzai-bookings.onrender.com'

export const fetchCurrentUser = async (): Promise<UserType> => {
    const response = await fetch(`${API_BASE_URL}/api/users/me`, {
        credentials: 'include'
    })

    if (!response.ok) {
        throw new Error('Error fetching user')
    }
    return response.json()
}

export const register = async (formData: RegisterFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    const responseBody = await response.json()
    if (!response.ok) {
        throw new Error(responseBody.message)
    }
}

export const signIn = async (formData: LoginForm) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })

    const body = await response.json()
    if (!response.ok) {
        throw new Error(body.message)
    }
    return body
}

export const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
        credentials: 'include'
    })
    if (!response.ok) {
        throw new Error('Token Invalid')
    }
    return response.json()
}

export const signOut = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        credentials: 'include',
        method: 'POST'
    });
    if (!response.ok) {
        throw new Error('Error during sign out')
    }

}

export const addMyHotel = async (hotelFormData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        method: 'POST',
        credentials: 'include',
        body: hotelFormData,
    })

    if (!response.ok) {
        throw new Error('Failed to add hotel')
    }

    return response.json()
}

export const fetchMyHotels = async ():Promise<HotelType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        credentials: 'include'
    })
    
    if (!response.ok) {
        throw new Error('Error fetching hotels')
    }

    return response.json()
}

export const fetchMyHotelById = async (hotelId: string):Promise<HotelType> => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
        credentials: 'include'
    })
    if (!response.ok) {
        throw new Error('Error fetching hotel')
    }

    return response.json()
}

export const updateMyHotelById = async (hotelFormData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelFormData.get('hotelId')}`, {
        method: 'PUT',
        body: hotelFormData,
        credentials: 'include'
    })

    if (!response.ok) {
        throw new Error('Failed to update hotel')
    }
    return response.json()
}


export const searchHotels = async (searchParams: SearchParams): Promise<HotelSearchResponse> => {
    const queryParams = new URLSearchParams()
    queryParams.append('destination', searchParams.destination || '')
    queryParams.append('checkIn', searchParams.checkIn || '')
    queryParams.append('checkOut', searchParams.checkOut || '')
    queryParams.append('adultCount', searchParams.adultCount || '')
    queryParams.append('childCount', searchParams.childCount || '')
    queryParams.append('page', searchParams.page || '')

    queryParams.append('maxPrice', searchParams.maxPrice || '')
    queryParams.append('sortOption', searchParams.sortOption || '')

    searchParams.facilities?.forEach((facility) => queryParams.append("facilities", facility))
    searchParams.types?.forEach((type) => queryParams.append("types", type))
    searchParams.stars?.forEach((star) => queryParams.append('stars', star))

    const response = await fetch(`${API_BASE_URL}/api/hotels/search?${queryParams}`)

    if (!response.ok) {
        throw new Error('Error fetching hotels')
    }

    return response.json()
}

export const fetchHotelById = async (hotelId: string): Promise<HotelType> => {
    const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`)
    if (!response.ok) {
        throw new Error('Error fetching hotel');
    }
    return response.json();
}

export const createPaymentIntent = async (hotelId: string, numberOfNights: string): Promise<PaymentIntentResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}/bookings/payment-intent`, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({numberOfNights}),
        headers: {
            "Content-Type": "application/json"
        }

    })

    console.log(response)

    if (!response.ok) {
        throw new Error('Error fetching payment intent')
    }

    return response.json()
}

export const createBooking = async (formData: BookingFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/hotels/${formData.hotelId}/bookings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(formData)
    })

    if (!response.ok) {
        throw new Error('Error booking room')
    }
}


export const fetchMyBookings = async (): Promise<HotelType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/my-bookings`, {
        credentials: 'include'
    });
    if (!response.ok) {
        throw new Error('Unable to fetch bookings')
    }
    return response.json()
}