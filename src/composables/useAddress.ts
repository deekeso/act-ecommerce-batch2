import { ref, watch } from 'vue'
import type { UserAddress } from '../stores/user'

// Import JSON data
import regionData from '../data/region.json'
import provinceData from '../data/province.json'
import cityData from '../data/city.json'
import barangayData from '../data/barangay.json'

// Define interfaces for the raw data
interface Region {
  region_code: string
  region_name: string
}
interface Province {
  province_code: string
  province_name: string
  region_code: string
}
interface City {
  city_code: string
  city_name: string
  province_code: string
}
interface Barangay {
  brgy_code: string
  brgy_name: string
  city_code: string
}

export function useAddress() {
  // Reactive state for the address form
  const addressForm = ref<UserAddress>({
    name: '',
    region: '',
    province: '',
    city: '',
    barangay: '',
    street: '',
    instructions: '',
  })

  // Reactive lists for dropdowns
  const regionsList = ref<Region[]>(regionData as Region[])
  const provincesList = ref<Province[]>([])
  const citiesList = ref<City[]>([])
  const barangaysList = ref<Barangay[]>([])

  // Watch for region changes to update provinces
  watch(
    () => addressForm.value.region,
    (newRegion) => {
      provincesList.value = newRegion
        ? (provinceData as Province[]).filter((p) => p.region_code === newRegion)
        : []
      if (!provincesList.value.some((p) => p.province_code === addressForm.value.province)) {
        addressForm.value.province = ''
      }
    },
    { immediate: true },
  )

  // Watch for province changes to update cities
  watch(
    () => addressForm.value.province,
    (newProvince) => {
      citiesList.value = newProvince
        ? (cityData as City[]).filter((c) => c.province_code === newProvince)
        : []
      if (!citiesList.value.some((c) => c.city_code === addressForm.value.city)) {
        addressForm.value.city = ''
      }
    },
    { immediate: true },
  )

  // Watch for city changes to update barangays
  watch(
    () => addressForm.value.city,
    (newCity) => {
      barangaysList.value = newCity
        ? (barangayData as Barangay[]).filter((b) => b.city_code === newCity)
        : []
      if (!barangaysList.value.some((b) => b.brgy_code === addressForm.value.barangay)) {
        addressForm.value.barangay = ''
      }
    },
    { immediate: true },
  )

  // Function to set the address and trigger updates
  const setAddress = (newAddress: UserAddress) => {
    addressForm.value = { ...newAddress }
  }

  const resetAddress = () => {
    addressForm.value.name = ''
    addressForm.value.region = ''
    addressForm.value.province = ''
    addressForm.value.city = ''
    addressForm.value.barangay = ''
    addressForm.value.street = ''
    addressForm.value.instructions = ''
    // The watchers will automatically clear the provincesList, citiesList, and barangaysList
  }

  return {
    addressForm,
    regionsList,
    provincesList,
    citiesList,
    barangaysList,
    setAddress,
    resetAddress,
  }
}
