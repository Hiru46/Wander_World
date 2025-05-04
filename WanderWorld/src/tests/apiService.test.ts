import { fetchAllCountries, fetchCountryByName, fetchCountriesByRegion, fetchCountryByCode } from "../api/apiService";

// Enable fetch mocking
global.fetch = jest.fn();

describe("API Service Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks before each test
  });

  test("fetchAllCountries should return an array of countries", async () => {
    const mockResponse = [
      { name: { common: "United States" }, cca3: "USA", region: "Americas", population: 331000000 },
      { name: { common: "Canada" }, cca3: "CAN", region: "Americas", population: 38000000 },
    ];

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });
      

    const data = await fetchAllCountries();
    expect(data).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith("https://restcountries.com/v3.1/all");
  });

  test("fetchCountryByName should return country details", async () => {
    const mockResponse = [{ name: { common: "Japan" }, cca3: "JPN", region: "Asia" }];

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const data = await fetchCountryByName("Japan");
    expect(data).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith("https://restcountries.com/v3.1/name/Japan");
  });

  test("fetchCountriesByRegion should return countries from a specific region", async () => {
    const mockResponse = [{ name: { common: "France" }, cca3: "FRA", region: "Europe" }];

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const data = await fetchCountriesByRegion("Europe");
    expect(data).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith("https://restcountries.com/v3.1/region/Europe");
  });

  test("fetchCountryByCode should return details for a country by its code", async () => {
    const mockResponse = [{ name: { common: "Germany" }, cca3: "DEU", region: "Europe" }];

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const data = await fetchCountryByCode("DEU");
    expect(data).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith("https://restcountries.com/v3.1/alpha/DEU");
  });

  test("fetchCountryByName should return an empty array if country is not found", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 404,
    });

    const data = await fetchCountryByName("Atlantis");
    expect(data).toEqual([]);
    expect(global.fetch).toHaveBeenCalledWith("https://restcountries.com/v3.1/name/Atlantis");
  });

  test("fetchAllCountries should throw an error on API failure", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
    });

    await expect(fetchAllCountries()).rejects.toThrow("Failed to fetch countries");
  });
});
