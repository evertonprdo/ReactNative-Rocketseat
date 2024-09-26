import AsyncStorage from "@react-native-async-storage/async-storage"
import { getStorageCity, saveStorageCity, removeStorageCity } from "@libs/asyncStorage/cityStorage"
import { CityProps } from "@services/getCityByNameService"

const newCity: CityProps = {
  id: '1',
  name: 'São Paulo',
  latitude: 123,
  longitude: 456
}

describe("Storage: CityStorage", () => {
  beforeEach(async () => {
    const keys = await AsyncStorage.getAllKeys()
    await AsyncStorage.multiRemove(keys)
  })

  it("should be return null when don't have a city storaged", async () => {
    const response = await getStorageCity()
    expect(response).toBeNull()
  })

  it("should be return city storaged.", async () => {   
    await saveStorageCity(newCity)

    const data = await getStorageCity()
    expect(data).toEqual(newCity)
  })

  it("should be remove city storage.", async () => {
    await saveStorageCity(newCity)
    await removeStorageCity()
    const data = await getStorageCity()

    expect(data).toBeNull()
  })
})