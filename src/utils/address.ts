import type { UserAddress } from '@/stores/user'

// A simple cache to avoid re-fetching JSON files
const cache = new Map<string, any[]>()

async function getJsonData(name: string): Promise<any[]> {
  if (cache.has(name)) {
    return cache.get(name)!
  }
  const data = (await import(`@/data/${name}.json`)).default
  cache.set(name, data)
  return data
}

/**
 * Translates an address with codes into a full, human-readable string.
 * @param address The UserAddress object with codes.
 * @returns A promise that resolves to the formatted address string.
 */
export async function getFullAddressString(address: UserAddress): Promise<string> {
  if (!address) return 'No address provided'

  try {
    const [regions, provinces, cities, barangays] = await Promise.all([
      getJsonData('region'),
      getJsonData('province'),
      getJsonData('city'),
      getJsonData('barangay'),
    ])

    const regionName = regions.find((r) => r.region_code === address.region)?.region_name || ''
    const provinceName =
      provinces.find((p) => p.province_code === address.province)?.province_name || ''
    const cityName = cities.find((c) => c.city_code === address.city)?.city_name || ''
    const brgyName = barangays.find((b) => b.brgy_code === address.barangay)?.brgy_name || ''

    return [address.street, brgyName, cityName, provinceName, regionName].filter(Boolean).join(', ')
  } catch (error) {
    console.error('Error formatting address:', error)
    return 'Address could not be displayed'
  }
}
