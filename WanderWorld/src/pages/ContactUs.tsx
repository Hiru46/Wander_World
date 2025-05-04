import React, { useState } from "react";

const ContactUs: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black/10 text-white px-6 py-10">
      <div className="max-w-lg bg-gray-900 rounded-lg shadow-lg p-6">
        <h1 className="text-4xl font-bold text-red-500 text-center mb-6">Contact Us</h1>

        <p className="text-gray-400 text-center">
          Have questions or suggestions? We'd love to hear from you! Fill out the form below and we'll get back to you soon.
        </p>

        {submitted ? (
          <div className="mt-6 text-center text-green-400">
            <p className="text-xl">✅ Message Sent!</p>
            <p>We'll reach out to you as soon as possible.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              ></textarea>
            </div>

            <button type="submit" className="bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg font-bold shadow-lg w-full">
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactUs;