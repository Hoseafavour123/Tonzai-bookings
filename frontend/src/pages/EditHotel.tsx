import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom"
import * as apiClient from '../api-client'
import ManageHotelForms from "../forms/ManageHotelForms/ManageHotelForms";
import { useAppContext } from "../contexts/AppContext";

const EditHotel = () => {
    const { hotelId } = useParams();
    const { showToast } = useAppContext()
    const navigate = useNavigate()

    const { data: hotel } = useQuery("fetchMyHotelById", ()=> apiClient.fetchMyHotelById(hotelId || ''), {
        enabled:!!hotelId,
    })

    const {mutate, isLoading} = useMutation(apiClient.updateMyHotelById, {
        onSuccess: () => {
        showToast({message: 'Hotel updated!', type:'SUCCESS'})
        navigate('/my-hotels')
        },
        onError: () => {
            showToast({message: 'Error saving hotel', type:'ERROR'})
        }
    })

    const handleSave = (hotelFormData: FormData) => {
        mutate(hotelFormData)
    }
  return (
    <ManageHotelForms onSave={handleSave} isLoading={isLoading} hotel={hotel}/>
  )
}
export default EditHotel
