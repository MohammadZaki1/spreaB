import Header from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div>
      <Header />

      <div className="bg-gray-50 text-gray-800 mt-10">

        {/* HERO SECTION */}
       <section className="relative h-[70vh] mt-20">
  {/* Background Image */}
  <div
    className="absolute inset-0 bg-cover bg-center brightness-50"
    style={{
      backgroundImage: `url('https://cdn.prod.website-files.com/6331bc7bac4fd98001764860/64ad32b08751c560ba04f7ee_Asset%201%404x-100-min%20(3).jpg')`,
    }}
  ></div>

  {/* Content */}
  <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
    <h1
      data-aos="fade-up"
      className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg"
    >
      Spread<span className="text-purple-400">_B</span>
    </h1>

    <p
      data-aos="fade-up"
      data-aos-delay="200"
      className="mt-5 text-xl md:text-2xl text-white/90 max-w-3xl"
    >
      Transforming ideas into world-class digital experiences.
    </p>
    <p  data-aos="fade-up"
      data-aos-delay="200"
      className="mt-5 text-[16px] text-white/90 w-[1200px]">Spread_B refers to the calculated difference between two related values, often used to measure variations, risks, or performance gaps. In financial contexts, it might represent the difference in yields, prices, or interest rates between two securities, helping investors assess relative value or potential returns. In other technical or analytical scenarios, Spread_B can denote the distribution or range of data points, providing insight into variability or deviation from a reference point. By analyzing Spread_B, one can make informed decisions.</p>
  </div>
</section>

        {/* MISSION & VISION */}
        <section className="py-20 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          {/* Mission */}
          <div
            data-aos="fade-right"
            className="bg-white p-10 shadow-xl rounded-3xl border border-gray-100 hover:shadow-2xl transition"
          >
            <img
              src="https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=900&q=80"
              alt="Mission"
              className="rounded-xl mb-6"
              loading="lazy"
            />
            <h2 className="text-3xl font-bold text-purple-600">Our Mission</h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              To deliver cutting-edge digital solutions that empower businesses
              to grow, innovate, and stay ahead in a technology-driven world.
            </p>
          </div>

          {/* Vision */}
          <div
            data-aos="fade-left"
            className="bg-white p-10 shadow-xl rounded-3xl border border-gray-100 hover:shadow-2xl transition"
          >
            <img
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=900&q=80"
              alt="Vision"
              className="rounded-xl mb-6"
              loading="lazy"
            />
            <h2 className="text-3xl font-bold text-purple-600">Our Vision</h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              To become a global leader in next-generation technology solutions
              by shaping the future of digital transformation.
            </p>
          </div>
        </section>

        {/* CORE VALUES */}
        <section className="py-20 bg-white">
          <h2
            data-aos="zoom-in"
            className="text-4xl text-center font-bold text-gray-900"
          >
            Our Core Values
          </h2>

          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10 mt-12">
            {[
              {
                title: "Innovation",
                text: "We craft intelligent digital solutions through creativity and modern technology.",
                img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=900&q=80"
              },
              {
                title: "Integrity",
                text: "We deliver transparent, reliable, and ethical technology services.",
                img: "https://media.licdn.com/dms/image/v2/D5612AQEZ2fDYAzIbjg/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1718169278664?e=2147483647&v=beta&t=_w2qnw4MbQdo8t54donNiV-IZ1rxB4nTSTvjThSLouY"
              },
              {
                title: "Excellence",
                text: "We focus on premium quality and world-class user experience.",
                img: "https://static.vecteezy.com/system/resources/thumbnails/003/665/755/small/excellence-concept-quality-service-businessman-pressing-excellence-virtual-screen-photo.jpg"
              }
            ].map((value, i) => (
              <div
                key={i}
                data-aos="fade-up"
                data-aos-delay={i * 200}
                className="bg-gray-100 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
              >
                <img
                  src={value.img}
                  alt={value.title}
                  className="h-48 w-full object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <h3 className="font-bold text-xl text-purple-600">{value.title}</h3>
                  <p className="text-gray-600 mt-3">{value.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* STATS */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10 text-center">
            {[
              { count: "7+", label: "Years of Excellence" },
              { count: "150+", label: "Projects Delivered" },
              { count: "95+", label: "Happy Clients" },
              { count: "20+", label: "Skilled Professionals" }
            ].map((s, i) => (
              <div key={i} data-aos="zoom-in" data-aos-delay={i * 150}>
                <h3 className="text-5xl font-extrabold text-purple-600">{s.count}</h3>
                <p className="text-gray-600 mt-2">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TEAM SECTION */}
        <section className="py-20 bg-white">
          <h2 data-aos="fade-up" className="text-4xl text-center font-bold">
            Meet Our Team
          </h2>

          <div className="max-w-6xl mx-auto px-6 mt-14 grid md:grid-cols-4 gap-12">
            {/* Team Member 1 */}
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              className="bg-white shadow-xl rounded-2xl p-6 text-center border border-gray-100 hover:shadow-2xl hover:scale-105 transition-transform"
            >
              <img
                src="https://randomuser.me/api/portraits/men/30.jpg"
                alt="Arjun"
                className="w-32 h-32 rounded-full object-cover mx-auto shadow-md"
                loading="lazy"
              />
              <p className="mt-5 text-xl font-semibold text-gray-800">Arjun</p>
              <p className="text-purple-600">Senior Developer</p>
              <p className="mt-3 text-gray-600">
                Expert in delivering modern, scalable, high-impact solutions.
              </p>
            </div>

            {/* Team Member 2 */}
            <div
              data-aos="fade-up"
              data-aos-delay="200"
              className="bg-white shadow-xl rounded-2xl p-6 text-center border border-gray-100 hover:shadow-2xl hover:scale-105 transition-transform"
            >
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Pallavi"
                className="w-32 h-32 rounded-full object-cover mx-auto shadow-md"
                loading="lazy"
              />
              <p className="mt-5 text-xl font-semibold text-gray-800">Pallavi</p>
              <p className="text-purple-600">Project Manager</p>
              <p className="mt-3 text-gray-600">
                Passionate about creating intuitive and engaging user experiences.
              </p>
            </div>

            {/* Team Member 3 */}
            <div
              data-aos="fade-up"
              data-aos-delay="300"
              className="bg-white shadow-xl rounded-2xl p-6 text-center border border-gray-100 hover:shadow-2xl hover:scale-105 transition-transform"
            >
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Suresh"
                className="w-32 h-32 rounded-full object-cover mx-auto shadow-md"
                loading="lazy"
              />
              <p className="mt-5 text-xl font-semibold text-gray-800">Suresh Ampavilli</p>
              <p className="text-purple-600">Frontend Developer</p>
              <p className="mt-3 text-gray-600">
                Specializes in building responsive and high-performance interfaces.
              </p>
            </div>

            {/* Team Member 4 */}
            <div
              data-aos="fade-up"
              data-aos-delay="400"
              className="bg-white shadow-xl rounded-2xl p-6 text-center border border-gray-100 hover:shadow-2xl hover:scale-105 transition-transform"
            >
              <img
                src="https://randomuser.me/api/portraits/women/48.jpg"
                alt="Prabalika"
                className="w-32 h-32 rounded-full object-cover mx-auto shadow-md"
                loading="lazy"
              />
              <p className="mt-5 text-xl font-semibold text-gray-800">Prabalika</p>
              <p className="text-purple-600">Backend Developer</p>
              <p className="mt-3 text-gray-600">
                Ensures smooth server-side performance and robust application architecture.
              </p>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-20 bg-gradient-to-r from-purple-700 to-purple-500 text-white text-center">
          <h2 data-aos="zoom-in" className="text-4xl md:text-5xl font-bold">
            Let’s Build the Future Together
          </h2>

          <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">
            Partner with Flyii Solutions to bring your digital vision to life
            through innovation & excellence.
          </p>

          <Link
            to="/contact"
            data-aos="fade-up"
            className="inline-block mt-10 bg-white text-purple-700 font-semibold px-12 py-4 rounded-full text-lg shadow-lg hover:bg-gray-100 transition"
          >
            Contact Us
          </Link>
        </section>

      </div>

      <Footer />
    </div>
  );
}
