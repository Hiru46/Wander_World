import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CountryDetail from "../pages/CountryDetail";
import { MemoryRouter } from "react-router-dom";

test("renders country details correctly", () => {
  render(
    <MemoryRouter>
      <CountryDetail />
    </MemoryRouter>
  );

  expect(screen.getByText(/Region:/)).toBeInTheDocument();
  expect(screen.getByText(/Population:/)).toBeInTheDocument();
});
