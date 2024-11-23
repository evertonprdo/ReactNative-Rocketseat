import { getStorageCity, saveStorageCity, removeStorageCity } from "@libs/asyncStorage/cityStorage";
import { CityProps } from "@services/getCityByNameService";

const newCity: CityProps = {
  id: '1',
  name: 'São Paulo',
  latitude: 456,
  longitude: 789,
}

describe("Storage: CityStorage", () => {
  it("should be return null when don't have a city storage", async () => {
    const reponse = await getStorageCity();

    expect(reponse).toBeNull();
  })

  it("should be return city storage.", async () => {
    await saveStorageCity(newCity)
    const reponse = await getStorageCity();

    expect(reponse).toEqual(newCity)
  })

  it("should be remove city storage.", async () => {
    await saveStorageCity(newCity);
    await removeStorageCity();

    const response = await getStorageCity();
    expect(response).toBeNull();
  })
})