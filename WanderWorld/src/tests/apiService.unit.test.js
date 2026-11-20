import { fetchCountryByName } from "../api/apiService";
import { vi, describe, beforeEach, it, expect, Mock } from "vitest";

// Mock global fetch
globalThis.fetch = vi.fn();

describe("Unit Tests - API Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetchCountryByName should return correct country details", async () => {
    const mockResponse = [{ name: { common: "France" }, cca3: "FRA", region: "Europe" }];
    (globalThis.fetch).mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const data = await fetchCountryByName("France");
    expect(data).toEqual(mockResponse);
    expect(globalThis.fetch).toHaveBeenCalledWith("https://restcountries.com/v3.1/name/France");
  });

  it("fetchCountryByName should return an empty array if not found", async () => {
    (globalThis.fetch).mockResolvedValue({
      ok: false,
      status: 404,
    });

    const data = await fetchCountryByName("Atlantis");
    expect(data).toEqual([]);
    expect(globalThis.fetch).toHaveBeenCalledWith("https://restcountries.com/v3.1/name/Atlantis");
  });
});
