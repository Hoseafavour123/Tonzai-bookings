import { useMutation } from "react-query"
import ManageHotelForms from "../forms/ManageHotelForms/ManageHotelForms"
import { useAppContext } from "../contexts/AppContext"
import * as apiClient from '../api-client'
import { useNavigate } from "react-router-dom"

const AddHotel = () => {
  const { showToast } = useAppContext()
  const navigate = useNavigate()

  const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
    onSuccess: () => {
      showToast({ message: 'Hotel saved!', type:'SUCCESS'})
      navigate('/my-hotels')
    },
    onError: () => {
      showToast({ message: 'Error Occured', type:'ERROR'})
    }
  })
  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData)
  }
  return (
    <div className="min-h-screen mt-5">
      <ManageHotelForms onSave={handleSave} isLoading={isLoading} />
    </div>
  )
}

export default AddHotel
