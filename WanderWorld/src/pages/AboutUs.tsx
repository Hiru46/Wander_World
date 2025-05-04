import React from "react";

const AboutUs: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black/10 text-white px-6 py-10">
      <div className="max-w-3xl bg-gray-900 rounded-lg shadow-lg p-6">
        <h1 className="text-4xl font-bold text-red-500 text-center mb-6">About Wander World</h1>
        
        <p className="text-gray-400 text-lg text-center">
          Welcome to <span className="text-yellow-500 font-bold">Wander World</span>, your <span className="font-semibold italic">ultimate destination</span> for exploring countries across the globe! Our goal is to <span className="italic text-yellow-500">"Make learning about world cultures, geography, and travel exciting and interactive".</span>
        </p>

        <div className="mt-6 space-y-6">
          <div className="border-l-4 border-red-500 pl-4">
            <h2 className="text-2xl font-semibold text-red-500">🌍 Global Exploration</h2>
            <p className="text-gray-400">
              Discover fascinating details about every country—from historical landmarks to cultural insights.
            </p>
          </div>
          
          <div className="border-l-4 border-red-500 pl-4">
            <h2 className="text-2xl font-semibold text-red-500">⭐ Save Your Favorites</h2>
            <p className="text-gray-400">
              Build your **personalized list** of favorite countries and revisit them anytime.
            </p>
          </div>
          
          <div className="border-l-4 border-red-500 pl-4">
            <h2 className="text-2xl font-semibold text-red-500">📚 Reliable Information</h2>
            <p className="text-gray-400">
              Get up-to-date details about countries, including geography, languages, and cultural highlights.
            </p>
          </div>
        </div>
        
        <p className="text-gray-400 text-center mt-6">
          Whether you're planning your next trip or just exploring for fun, <span className="font-extrabold text-yellow-500">Wander World</span> is here to take you on a journey across the globe.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;