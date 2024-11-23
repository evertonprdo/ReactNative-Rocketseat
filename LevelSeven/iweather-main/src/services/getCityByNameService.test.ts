import { api } from "./api";
import { mockCityAPIResponse } from "@__tests__/mocks/api/mockCityAPIResponse";
import { getCityByNameService } from "./getCityByNameService";

describe("Service: getCityByNameService", () => {
  it("should return city details", async () => {

    jest.spyOn(api, "get").mockResolvedValue({ data: mockCityAPIResponse });
    const reponse = await getCityByNameService("São Paulo")
    
    expect(reponse.length).toBeGreaterThan(0);
  });
});