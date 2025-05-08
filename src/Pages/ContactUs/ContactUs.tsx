import { FaTwitter, FaInstagram, FaEnvelope } from "react-icons/fa";
import { toast } from "sonner";

const ContactPage = () => {
  const handleSubmit = (e: any) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      subject: e.target.subject.value,
      message: e.target.message.value,
    };

    console.log("Form submitted with the following data:");
    console.log(formData);

    toast.success("Thank you for your message! We will get back to you soon.");
    e.target.reset();
  };

  const staffMembers = [
    {
      name: "Sarah Johnson",
      role: "Owner & Manager",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    },
    {
      name: "Michael Chen",
      role: "Events Coordinator",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    },
    {
      name: "Emily Rodriguez",
      role: "Children's Specialist",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    },
    {
      name: "David Wilson",
      role: "Inventory Specialist",
      image:
        "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    },
  ];

  const hours = [
    { day: "Monday", time: "9am - 6pm" },
    { day: "Tuesday", time: "9am - 6pm" },
    { day: "Wednesday", time: "9am - 6pm" },
    { day: "Thursday", time: "9am - 8pm" },
    { day: "Friday", time: "9am - 8pm" },
    { day: "Saturday", time: "10am - 8pm" },
    { day: "Sunday", time: "11am - 5pm" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-800 to-green-600 py-24 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Get in Touch
          </h1>
          <p className="text-xl">
            We'd love to hear from you! Visit us, give us a call, or send us a
            message.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Contact Info */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-serif font-bold text-green-800 mb-6 pb-2 border-b-2 border-green-200">
              Our Information
            </h2>

            <div className="grid grid-cols-[40px,1fr] gap-5 mb-8">
              <div className="bg-green-100 text-green-600 w-10 h-10 rounded-full flex items-center justify-center text-xl">
                📍
              </div>
              <div>
                <h3 className="text-lg font-bold text-green-800 mb-1">
                  Address
                </h3>
                <p className="text-gray-700">
                  123 Bookworm Lane
                  <br />
                  Literary District
                  <br />
                  Greenville, GL 12345
                </p>
              </div>
            </div>

            <div className="grid grid-cols-[40px,1fr] gap-5 mb-8">
              <div className="bg-green-100 text-green-600 w-10 h-10 rounded-full flex items-center justify-center text-xl">
                📞
              </div>
              <div>
                <h3 className="text-lg font-bold text-green-800 mb-1">Phone</h3>
                <p className="text-gray-700">
                  Main: (123) 456-7890
                  <br />
                  Events: (123) 456-7891
                </p>
              </div>
            </div>

            <div className="grid grid-cols-[40px,1fr] gap-5 mb-8">
              <div className="bg-green-100 text-green-600 w-10 h-10 rounded-full flex items-center justify-center text-xl">
                ✉️
              </div>
              <div>
                <h3 className="text-lg font-bold text-green-800 mb-1">Email</h3>
                <p className="text-gray-700">
                  info@greenleafbooks.com
                  <br />
                  events@greenleafbooks.com
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-serif font-bold text-green-800 mb-6 pb-2 border-b-2 border-green-200">
              Opening Hours
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {hours.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-gray-700">{item.day}</span>
                  <span className="text-gray-700 font-medium">{item.time}</span>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-serif font-bold text-green-800 mt-10 mb-6 pb-2 border-b-2 border-green-200">
              Find Us
            </h2>
            <div className="h-72 rounded-lg overflow-hidden shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215256027567!2d-73.9878449241644!3d40.74844097138985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1623251156832!5m2!1sen!2sus"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                title="Google Maps Location"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-serif font-bold text-green-800 mb-6 pb-2 border-b-2 border-green-200">
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="phone"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="subject"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="order">Order Inquiry</option>
                  <option value="event">Event Information</option>
                  <option value="suggestion">Book Suggestion</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-md transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Staff Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-serif font-bold text-green-800 mb-4">
            Meet Our Team
          </h2>
          <p className="text-gray-700 mb-8">
            Our knowledgeable staff is here to help you find your next great
            read.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {staffMembers.map((staff, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={staff.image}
                    alt={staff.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-green-800 mb-1">
                    {staff.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{staff.role}</p>
                  <div className="flex justify-center space-x-4">
                    <a
                      href="#"
                      className="text-green-600 hover:text-green-800 text-xl"
                    >
                      <FaTwitter />
                    </a>
                    <a
                      href="#"
                      className="text-green-600 hover:text-green-800 text-xl"
                    >
                      <FaInstagram />
                    </a>
                    <a
                      href="#"
                      className="text-green-600 hover:text-green-800 text-xl"
                    >
                      <FaEnvelope />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;
