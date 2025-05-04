import { renderHook, act } from "@testing-library/react-hooks";
import { FavoritesProvider, useFavorites } from "../context/FavouritesContext";
import { Country } from "../api/apiService";

describe("Favorites Context", () => {
  test("should add and remove a country from favorites", () => {
    const country: Country = { 
      cca3: "US", 
      name: { common: "United States", official: "United States of America" },
      flags: { svg: "https://flagcdn.com/us.svg", png: "https://flagcdn.com/us.png" },
      population: 331002651,
      region: "Americas"
    };

    const { result } = renderHook(() => useFavorites(), { wrapper: FavoritesProvider });

    act(() => {
      result.current.addFavorite(country);
    });
    expect(result.current.favorites).toContainEqual(country);

    act(() => {
      result.current.removeFavorite(country.cca3);
    });
    expect(result.current.favorites).not.toContainEqual(country);
  });
});
