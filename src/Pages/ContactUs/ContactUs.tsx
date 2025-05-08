import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Simulate form submission
    console.log('Form submitted:', formData);
    setStatus('Thank you for contacting us!');
    setFormData({ name: '', email: '', subject: '', message: '' });

    setTimeout(() => {
      setStatus(null);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-green-600 mb-8">Contact Us</h1>

        {/* Contact Information */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-green-600">Get in Touch</h2>
          <div className="space-y-3 text-lg">
            <p><i className="fas fa-phone-alt text-green-600 mr-2"></i> +880 123 456 789</p>
            <p><i className="fas fa-envelope text-green-600 mr-2"></i> contact@tutorconnect.com</p>
            <p><i className="fas fa-map-marker-alt text-green-600 mr-2"></i> 123 Main Street, Dhaka, Bangladesh</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-green-600">Send a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium">Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block font-medium">Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block font-medium">Subject</label>
              <input
                type="text"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block font-medium">Message</label>
              <textarea
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition duration-200"
            >
              Send
            </button>
            {status && <p className="text-green-600 mt-2">{status}</p>}
          </form>
        </div>

        {/* Our Team */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-green-600">Our Team</h2>
          <ul className="space-y-3">
            <li><span className="font-medium">Md Mehedi Hasan:</span> Project Manager & Frontend Developer</li>
            <li><span className="font-medium">Md Meftahul Jannat:</span> Backend Developer</li>
            <li><span className="font-medium">Md Akash Hossain:</span> Backend Developer</li>
            <li><span className="font-medium">Rafi Al Mahmud:</span> Frontend Developer</li>
            <li><span className="font-medium">Tanjim Tanvir:</span> Frontend Developer</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
