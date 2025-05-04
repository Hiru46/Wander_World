import { render, screen } from "@testing-library/react";
import Navbar from "../components/Navbar";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";

test("Navbar should render login button when user is not logged in", () => {
  render(
    <MemoryRouter>
      <AuthProvider>
        <Navbar />
      </AuthProvider>
    </MemoryRouter>
  );

  expect(screen.getByText("Login")).toBeInTheDocument();
});
