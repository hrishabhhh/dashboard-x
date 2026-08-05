import { useTheme } from "../hooks/useTheme";

function HeroHome() {
  const { theme } = useTheme();
  console.log(theme, "theme=================");

  return (
    <div className={`min-h-screen flex items-center justify-center px-6 py-6`}>
      <div
        className={` ${theme === "dark" ? "bg-gray-900" : "bg-white"} max-w-8xl w-full rounded-3xl shadow-2xl border border-red-100 p-10 text-center`}
      >
        <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto mb-10">
          A modern Full Stack Authentication & Admin Dashboard Platform built
          with React, Node.js, Express, MongoDB, JWT, bcrypt and Nodemailer.
        </p>

        <div className="flex flex-wrap justify-center gap-5 mb-14">
          <button className="bg-red-600 hover:bg-red-700 text-white px-7 py-3 rounded-xl shadow-lg transition duration-300">
            Get Started
          </button>

          <button className="border-2 border-red-600 text-red-600 hover:bg-red-50 px-7 py-3 rounded-xl transition duration-300">
            Learn More
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-red-100 rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300">
            <div className="text-4xl mb-3">🔐</div>
            <h2 className="text-xl font-bold text-red-600 mb-2">
              Authentication
            </h2>
            <p className="text-gray-500 text-sm">
              JWT Authentication, Protected Routes & Secure Login
            </p>
          </div>

          <div className="bg-white border border-red-100 rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300">
            <div className="text-4xl mb-3">📧</div>
            <h2 className="text-xl font-bold text-red-600 mb-2">
              OTP Verification
            </h2>
            <p className="text-gray-500 text-sm">
              Email Verification & Secure Password Recovery
            </p>
          </div>

          <div className="bg-white border border-red-100 rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300">
            <div className="text-4xl mb-3">🛡️</div>
            <h2 className="text-xl font-bold text-red-600 mb-2">Security</h2>
            <p className="text-gray-500 text-sm">
              bcrypt Hashing, OTP Expiry & Brute Force Protection
            </p>
          </div>

          <div className="bg-white border border-red-100 rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300">
            <div className="text-4xl mb-3">⚡</div>
            <h2 className="text-xl font-bold text-red-600 mb-2">
              Backend APIs
            </h2>
            <p className="text-gray-500 text-sm">
              Express, MongoDB, REST APIs & Nodemailer Integration
            </p>
          </div>
        </div>

        <div className="mt-14 border-t border-gray-200 pt-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Tech Stack</h3>

          <div className="flex flex-wrap justify-center gap-4">
            {[
              "React",
              "Node.js",
              "Express",
              "MongoDB",
              "JWT",
              "bcrypt",
              "Nodemailer",
              "Tailwind CSS",
            ].map((tech) => (
              <span
                key={tech}
                className="px-5 py-2 bg-red-100 text-red-700 rounded-full font-medium hover:bg-red-200 transition duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <p className="mt-12 text-gray-500">
          Built with ❤️ by{" "}
          <span className="font-semibold text-red-600">Hrishabh Jain</span>
        </p>
      </div>
    </div>
  );
}

export default HeroHome;
