import { FormProvider, useForm } from "react-hook-form";
import HotelDetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import { Button } from "flowbite-react";

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
    adultCount: number;
    childCount: number;
}

type Props = {
  onSave: (hotelFormData: FormData) => void
  isLoading: boolean
};

const ManageHotelForms = ({ onSave, isLoading }: Props) => {
    const formMethods = useForm<HotelFormData>()
    const { handleSubmit } = formMethods;

    const onSubmit = handleSubmit((formDataJSON: HotelFormData) => {
      const formData = new FormData()
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
      Array.from(formDataJSON.imageFiles).forEach((imageFile) => {
        formData.append(`imageFiles`, imageFile)
      })

      onSave(formData)
      
    })
  return (
    <div className="max-w-4xl mx-auto sm:max-w-2xl">
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
