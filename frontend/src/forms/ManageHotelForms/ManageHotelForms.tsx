import { FormProvider, useForm } from "react-hook-form";
import HotelDetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import { Button } from "flowbite-react";
import { HotelType } from "../../api-client";
import { useEffect } from "react";

export type HotelFormData = {
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    pricePerNight: number;
    starRating: number;
    facilities: string[];
    imageFiles: FileList;
    imageUrls: string[];
    adultCount: number;
    childCount: number;
}

type Props = {
  onSave: (hotelFormData: FormData) => void
  isLoading: boolean
  hotel?: HotelType
};

const ManageHotelForms = ({ onSave, isLoading, hotel }: Props) => {
    const formMethods = useForm<HotelFormData>()
    const { handleSubmit, reset } = formMethods;

    useEffect(() => {
      reset(hotel)
    }, [hotel, reset])
    const onSubmit = handleSubmit((formDataJSON: HotelFormData) => {
      const formData = new FormData()
      if (hotel) {
        formData.append('hotelId', hotel._id)
      }
      formData.append('name', formDataJSON.name)
      formData.append('city', formDataJSON.city)
      formData.append('country', formDataJSON.country)
      formData.append('description', formDataJSON.description)
      formData.append('type', formDataJSON.type)
      formData.append('pricePerNight', formDataJSON.pricePerNight.toString())
      formData.append('starRating', formDataJSON.starRating.toString())
      formData.append('adultCount', formDataJSON.adultCount.toString())
      formData.append('childCount', formDataJSON.childCount.toString())
      formDataJSON.facilities.forEach((facility, index) => {
        formData.append(`facilities[${index}]`, facility)
      })

      if (formDataJSON.imageUrls) {
        formDataJSON.imageUrls.forEach((url, idx) => {
          formData.append(`imageUrls[${idx}]`, url)
        })
      }
      Array.from(formDataJSON.imageFiles).forEach((imageFile) => {
        formData.append(`imageFiles`, imageFile)
      })
      onSave(formData)
      
    })
  return (
    <div className="md:max-w-4xl mx-auto sm:max-w-2xl">
      <FormProvider {...formMethods}>
        <form className="flex flex-col gap-10 mb-10" onSubmit={onSubmit}>
          <HotelDetailsSection />
          <TypeSection/>
          <FacilitiesSection/>
          <GuestsSection/>
          <ImagesSection/>
          <span className="flex justify-end">
            <Button disabled={isLoading} type="submit" className="bg-purple-600 text-white font-bold hover:bg-purple-700 disabled:bg-gray-500">{ isLoading ? 'Saving...': 'Save'}</Button>
          </span>
        </form>
      </FormProvider>
    </div>
  )
}

export default ManageHotelForms
