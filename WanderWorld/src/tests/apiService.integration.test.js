import { fetchAllCountries, fetchCountriesByRegion, fetchCountryByCode } from "../api/apiService";
import { vi, describe, beforeEach, it, expect, Mock } from "vitest";

// Enable global fetch mocking
globalThis.fetch = vi.fn();

describe("Integration Tests - API Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetchAllCountries should return an array of countries", async () => {
    const mockResponse = [
      { name: { common: "United States" }, cca3: "USA", region: "Americas", population: 331000000 },
      { name: { common: "Canada" }, cca3: "CAN", region: "Americas", population: 38000000 },
    ];
    (globalThis.fetch).mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const data = await fetchAllCountries();
    expect(data).toEqual(mockResponse);
    expect(globalThis.fetch).toHaveBeenCalledWith("https://restcountries.com/v3.1/all");
  });

  it("fetchCountriesByRegion should filter countries by region", async () => {
    const mockResponse = [{ name: { common: "Germany" }, cca3: "DEU", region: "Europe" }];
    (globalThis.fetch).mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const data = await fetchCountriesByRegion("Europe");
    expect(data).toEqual(mockResponse);
    expect(globalThis.fetch).toHaveBeenCalledWith("https://restcountries.com/v3.1/region/Europe");
  });

  it("fetchCountryByCode should return country details by code", async () => {
    const mockResponse = [{ name: { common: "Japan" }, cca3: "JPN", region: "Asia" }];
    (globalThis.fetch).mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const data = await fetchCountryByCode("JPN");
    expect(data).toEqual(mockResponse);
    expect(globalThis.fetch).toHaveBeenCalledWith("https://restcountries.com/v3.1/alpha/JPN");
  });
});
