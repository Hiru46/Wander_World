import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import CountryDetail from "./pages/CountryDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./pages/ProtectedRoute";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Profile from "./pages/Profile";

const App: React.FC = () => {
  const location = useLocation();

  // Hide Navbar & Footer for Login & Signup pages
  const showNavbarFooter = !["/login", "/signup"].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-conic" style={{ backgroundImage: `url('/Background2.jpg')`}}>
      {showNavbarFooter && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/country/:code" element={<ProtectedRoute><CountryDetail /></ProtectedRoute>} />
        </Routes>
      </main>
      {showNavbarFooter && <Footer />}
    </div>
  );
};

export default App;
