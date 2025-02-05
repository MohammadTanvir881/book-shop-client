import img4 from "../assets/book4.jpg";
import fardin from "../assets/cartoon.jpg"

const AboutPage = () => {
  return (
    <div>
      {/* About Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
            About Us
          </h2>
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 px-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Our Story
              </h3>
              <p className="text-gray-600 mb-8">
                I have always believed that books have a magical power—they can
                transport us to different worlds, introduce us to fascinating
                characters, and fill our minds with endless knowledge. My
                journey as a bookstore owner began not just as a business
                venture but as a lifelong dream.
              </p>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Our Mission
              </h3>
              <p className="text-gray-600 mb-8">
                Our mission is to provide high-quality products and services
                that meet the needs of our customers. We strive to innovate and
                improve every day, ensuring that we stay ahead of the curve in
                our industry.
              </p>
            </div>
            <div className="w-full md:w-1/2 px-6">
              <img src={img4} alt="About Us" className="rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
            Our Team
          </h2>
          <div className="flex flex-wrap -mx-4">
            {[
              { name: "John Doe", role: "CEO & Founder" },
              { name: "Jane Smith", role: "CTO" },
              { name: "Mike Johnson", role: "Lead Developer" },
            ].map((member, index) => (
              <div key={index} className="w-full md:w-1/3 px-4 mb-8">
                <div className="bg-gray-100 rounded-lg shadow-lg p-6">
                  <img
                    src={fardin}
                    alt={member.name}
                    className="rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-xl font-bold text-gray-800 text-center">
                    {member.name}
                  </h3>
                  <p className="text-gray-600 text-center">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
