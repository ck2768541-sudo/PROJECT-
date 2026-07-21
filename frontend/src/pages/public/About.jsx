import { Link } from "react-router-dom";

function About() {
  const features = [
    {
      title: "Student Management",
      description:
        "Students ke profiles, classes, roll numbers aur attendance records ko ek jagah manage karein.",
    },
    {
      title: "Teacher Management",
      description:
        "Teachers ko classes aur subjects assign karke unke access ko properly control karein.",
    },
    {
      title: "Attendance Tracking",
      description:
        "Daily attendance mark karein aur monthly, subject-wise aur student-wise records dekhein.",
    },
    {
      title: "Reports & Analytics",
      description:
        "Attendance reports ko filter, print, Excel aur PDF format mein export karein.",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-violet-600/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
              About Upsthiti
            </p>

            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              Smarter Attendance.
              <span className="block text-blue-400">
                Stronger Institutions.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Upsthiti ek modern Attendance aur Institute Management
              Platform hai, jo schools, colleges, coaching centres aur
              training institutes ke daily academic operations ko simple,
              fast aur organized banata hai.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
              >
                Login to Upsthiti
              </Link>

              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-xl border border-slate-700 px-6 py-3 font-semibold text-white transition hover:border-slate-500 hover:bg-slate-900"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
              Our Mission
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Attendance management ko simple aur reliable banana
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
              Hamara objective manual attendance process ko digital,
              accurate aur report-friendly banana hai. Upsthiti ke through
              institute administrators, teachers aur students ko unke role
              ke according clear aur secure access milta hai.
            </p>

            <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
              Is platform ka focus sirf attendance mark karna nahi, balki
              academic data ko organize karna, reports generate karna aur
              institute management ko better decisions lene mein help karna
              bhi hai.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/60 sm:p-9">
            <h3 className="text-2xl font-bold text-slate-900">
              Upsthiti kis ke liye hai?
            </h3>

            <ul className="mt-6 space-y-4 text-slate-600">
              {[
                "Schools",
                "Colleges",
                "Coaching Institutes",
                "Training Centres",
                "Educational Organizations",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                    ✓
                  </span>

                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
              What We Provide
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              One platform, complete attendance workflow
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              Upsthiti institute ke important academic modules ko ek
              centralized platform mein connect karta hai.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
                  U
                </div>

                <h3 className="text-xl font-bold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
            Role-Based System
          </p>

          <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Har user ke liye correct access
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-slate-950 p-7 text-white">
            <h3 className="text-xl font-bold text-blue-300">
              Institute Admin
            </h3>

            <p className="mt-4 leading-7 text-slate-300">
              Students, teachers, departments, classes, subjects,
              attendance aur reports ko manage karta hai.
            </p>
          </div>

          <div className="rounded-2xl bg-blue-600 p-7 text-white">
            <h3 className="text-xl font-bold">
              Teacher
            </h3>

            <p className="mt-4 leading-7 text-blue-50">
              Assigned classes aur subjects ko access karta hai aur
              attendance mark karta hai.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-7 shadow-lg ring-1 ring-slate-200">
            <h3 className="text-xl font-bold text-slate-900">
              Student
            </h3>

            <p className="mt-4 leading-7 text-slate-600">
              Apna profile, attendance summary, subject-wise attendance aur
              history dekhta hai.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white">
            Ready to explore Upsthiti?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-blue-100">
            Secure login ke through apne role ke according dashboard access
            karein.
          </p>

          <Link
            to="/login"
            className="mt-7 inline-flex rounded-xl bg-white px-7 py-3 font-bold text-blue-700 transition hover:bg-blue-50"
          >
            Go to Login
          </Link>
        </div>
      </section>
    </main>
  );
}

export default About;