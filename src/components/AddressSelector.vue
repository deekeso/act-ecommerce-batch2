<template>
  <div class="address-selector">
    <el-form label-position="top">
      <el-form-item label="Region" prop="region">
        <el-select
          @change="handleRegionChange"
          v-model="selectedRegionCode"
          placeholder="Select Region"
        >
          <el-option
            v-for="region in regionsList"
            :key="region.region_code"
            :label="region.region_name"
            :value="region.region_code"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Province" prop="province">
        <el-select
          @change="handleProvinceChange"
          v-model="selectedProvinceCode"
          placeholder="Select Province"
          :disabled="!selectedRegionCode"
        >
          <el-option
            v-for="province in provincesList"
            :key="province.province_code"
            :label="province.province_name"
            :value="province.province_code"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="City/Municipality" prop="city">
        <el-select
          @change="handleCityChange"
          v-model="selectedCityCode"
          placeholder="Select City/Municipality"
          :disabled="!selectedProvinceCode"
        >
          <el-option
            v-for="city in citiesList"
            :key="city.city_code"
            :label="city.city_name"
            :value="city.city_code"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Barangay" prop="barangay">
        <el-select
          @change="handleBarangayChange"
          v-model="selectedBarangayCode"
          placeholder="Select Barangay"
          :disabled="!selectedCityCode"
        >
          <el-option
            v-for="barangay in barangaysList"
            :key="barangay.brgy_code"
            :label="barangay.brgy_name"
            :value="barangay.brgy_code"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-button native-type="submit"> SUBMIT </el-button>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import regionDataRaw from '../data/region.json'
import provinceDataRaw from '../data/province.json'
import cityDataRaw from '../data/city.json'
import barangayDataRaw from '../data/barangay.json'

// Define raw data interfaces
interface RegionRaw {
  id: number
  psgc_code: string
  region_name: string
  region_code: string
}

interface ProvinceRaw {
  province_code: string
  province_name: string
  psgc_code: string
  region_code: string
}

interface CityRaw {
  city_code: string
  city_name: string
  province_code: string
  psgc_code: string
  region_desc: string
}

interface BarangayRaw {
  brgy_code: string
  brgy_name: string
  city_code: string
  province_code: string
  region_code: string
}

// Data references
const regionsList = ref<RegionRaw[]>([])
const provincesList = ref<ProvinceRaw[]>([])
const citiesList = ref<CityRaw[]>([])
const barangaysList = ref<BarangayRaw[]>([])

// Selected values
const selectedRegionCode = ref('')
const selectedProvinceCode = ref('')
const selectedCityCode = ref('')
const selectedBarangayCode = ref('')

// Selected text values
const selectedRegion = ref('')
const selectedProvince = ref('')
const selectedCity = ref('')
const selectedBarangay = ref('')

// Load regions on component creation
onMounted(() => {
  regionsList.value = regionDataRaw as RegionRaw[]
})

// Handle selection changes
const handleRegionChange = (e: Event) => {
  const target = e.target as HTMLSelectElement
  selectedRegion.value = target.selectedOptions[0].text
  selectedProvinceCode.value = ''
  selectedCityCode.value = ''
  selectedBarangayCode.value = ''
  selectedProvince.value = ''
  selectedCity.value = ''
  selectedBarangay.value = ''

  // Filter provinces by selected region
  provincesList.value = (provinceDataRaw as ProvinceRaw[]).filter(
    (province) => province.region_code === selectedRegionCode.value,
  )
}

const handleProvinceChange = (e: Event) => {
  const target = e.target as HTMLSelectElement
  selectedProvince.value = target.selectedOptions[0].text
  selectedCityCode.value = ''
  selectedBarangayCode.value = ''
  selectedCity.value = ''
  selectedBarangay.value = ''

  // Filter cities by selected province
  citiesList.value = (cityDataRaw as CityRaw[]).filter(
    (city) => city.province_code === selectedProvinceCode.value,
  )
}

const handleCityChange = (e: Event) => {
  const target = e.target as HTMLSelectElement
  selectedCity.value = target.selectedOptions[0].text
  selectedBarangayCode.value = ''
  selectedBarangay.value = ''

  // Filter barangays by selected city
  barangaysList.value = (barangayDataRaw as BarangayRaw[]).filter(
    (barangay) => barangay.city_code === selectedCityCode.value,
  )
}

const handleBarangayChange = (e: Event) => {
  const target = e.target as HTMLSelectElement
  selectedBarangay.value = target.selectedOptions[0].text

  // Emit the complete address if needed
  // emit('address-selected', {
  //   region: { code: selectedRegionCode.value, name: selectedRegion.value },
  //   province: { code: selectedProvinceCode.value, name: selectedProvince.value },
  //   city: { code: selectedCityCode.value, name: selectedCity.value },
  //   barangay: { code: selectedBarangayCode.value, name: selectedBarangay.value }
  // });
}
</script>

<style scoped></style>
