import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { FirebaseError } from "firebase/app";
import { Link } from "react-router-dom";

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateInputs = () => {
    // Reset error state
    setError("");
    
    // Simple email validation
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError("Please enter a valid email address");
      return false;
    }
    
    // Password validation (at least 6 characters)
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    
    // Confirm password validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    
    return true;
  };

const handleSignup = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!validateInputs()) return;
  
  setLoading(true);
  setError("");
  
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    setSuccess(true);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  } catch (error) {
    if (error instanceof FirebaseError) {
      if (error.code === "auth/email-already-in-use") {
        setError("This email is already registered. Try logging in instead.");
      } else if (error.code === "auth/invalid-email") {
        setError("Invalid email format. Please check your email address.");
      } else if (error.code === "auth/weak-password") {
        setError("Password is too weak. Use a stronger password.");
      } else {
        setError("Failed to create an account. Please try again later.");
      }
    } else {
      setError("Unexpected error. Please try again.");
    }
  } finally {
    setLoading(false);
  }
};


return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundImage: `url('/Background2.jpg')`, backgroundSize: "cover" }}>
      <div className="bg-black/40 h-full w-full absolute z-10"></div>
      <div className="max-w-md w-full p-6 bg-gray-100 rounded-lg shadow-md z-50">
        <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>
        
        {success && (
          <div className="mb-4 p-3 bg-green-200 text-green-700 rounded">
            Account created successfully! You can now log in.
          </div>
        )}
        
        {error && (
          <div className="mb-4 p-3 bg-red-200 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Verify your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>
        
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;