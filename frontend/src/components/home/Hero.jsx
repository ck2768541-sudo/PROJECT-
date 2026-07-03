import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="max-w-4xl text-center">
        <h1 className="text-6xl font-extrabold leading-tight text-gray-900">
          Smart Attendance
          <br />
          Management Platform
        </h1>

        <p className="mt-6 text-xl text-gray-600">
          Upsthiti helps schools, colleges and coaching institutes manage
          attendance with speed, accuracy and security.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link
            to="/signup"
            className="rounded-lg bg-blue-600 px-8 py-3 text-white hover:bg-blue-700 transition"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="rounded-lg border border-gray-300 px-8 py-3 hover:bg-gray-100 transition"
          >
            Live Demo
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;