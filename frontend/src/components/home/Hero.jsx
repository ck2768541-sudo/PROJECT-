function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Background decoration */}
      <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-purple-200/40 blur-3xl" />

      <div className="relative mx-auto grid min-h-[90vh] max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2">
        {/* Left content */}
        <div>
          <span className="inline-block rounded-full border border-blue-200 bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            Smart Attendance Management System
          </span>

          <h1 className="mt-6 text-5xl font-extrabold leading-tight text-gray-900 md:text-6xl">
            Manage Attendance
            <br />
            <span className="text-blue-600">
              Faster, Smarter & Securely
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-gray-600">
            Upsthiti helps institutes manage students, teachers, classes,
            subjects, attendance, reports and analytics from one secure
            platform.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-2xl border border-white bg-white/80 p-4 text-center shadow-sm backdrop-blur">
              <h2 className="text-2xl font-bold text-blue-600">100%</h2>
              <p className="mt-1 text-sm text-gray-600">Digital</p>
            </div>

            <div className="rounded-2xl border border-white bg-white/80 p-4 text-center shadow-sm backdrop-blur">
              <h2 className="text-2xl font-bold text-green-600">24×7</h2>
              <p className="mt-1 text-sm text-gray-600">Access</p>
            </div>

            <div className="rounded-2xl border border-white bg-white/80 p-4 text-center shadow-sm backdrop-blur">
              <h2 className="text-2xl font-bold text-purple-600">Secure</h2>
              <p className="mt-1 text-sm text-gray-600">JWT Auth</p>
            </div>

            <div className="rounded-2xl border border-white bg-white/80 p-4 text-center shadow-sm backdrop-blur">
              <h2 className="text-2xl font-bold text-orange-600">Live</h2>
              <p className="mt-1 text-sm text-gray-600">Analytics</p>
            </div>
          </div>
        </div>

        {/* Right dashboard preview */}
        <div className="relative">
          <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-r from-blue-300/30 to-purple-300/30 blur-2xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-white bg-white p-5 shadow-2xl">
            {/* Preview header */}
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <p className="text-sm text-gray-500">Admin Overview</p>
                <h2 className="text-xl font-bold text-gray-900">
                  Attendance Dashboard
                </h2>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                AK
              </div>
            </div>

            {/* Preview cards */}
            <div className="mt-5 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-blue-50 p-4">
                <p className="text-sm text-blue-700">Students</p>
                <h3 className="mt-2 text-3xl font-bold text-gray-900">
                  1,248
                </h3>
                <p className="mt-2 text-xs text-green-600">
                  Active students
                </p>
              </div>

              <div className="rounded-2xl bg-purple-50 p-4">
                <p className="text-sm text-purple-700">Teachers</p>
                <h3 className="mt-2 text-3xl font-bold text-gray-900">
                  84
                </h3>
                <p className="mt-2 text-xs text-green-600">
                  Active teachers
                </p>
              </div>

              <div className="rounded-2xl bg-green-50 p-4">
                <p className="text-sm text-green-700">Present Today</p>
                <h3 className="mt-2 text-3xl font-bold text-gray-900">
                  92%
                </h3>
                <p className="mt-2 text-xs text-gray-500">
                  Overall attendance
                </p>
              </div>

              <div className="rounded-2xl bg-orange-50 p-4">
                <p className="text-sm text-orange-700">Classes</p>
                <h3 className="mt-2 text-3xl font-bold text-gray-900">
                  36
                </h3>
                <p className="mt-2 text-xs text-gray-500">
                  Active classes
                </p>
              </div>
            </div>

            {/* Attendance chart preview */}
            <div className="mt-5 rounded-2xl border bg-gray-50 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-gray-900">
                    Weekly Attendance
                  </h3>
                  <p className="text-sm text-gray-500">
                    Present students this week
                  </p>
                </div>

                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  +8.4%
                </span>
              </div>

              <div className="mt-6 flex h-36 items-end justify-between gap-3">
                {[65, 78, 72, 90, 84, 68].map((height, index) => (
                  <div
                    key={index}
                    className="flex flex-1 flex-col items-center gap-2"
                  >
                    <div
                      className="w-full rounded-t-lg bg-gradient-to-t from-blue-600 to-blue-400"
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-xs text-gray-500">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][index]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent activity */}
            <div className="mt-5 rounded-2xl border p-4">
              <h3 className="font-bold text-gray-900">Recent Activity</h3>

              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Attendance marked successfully
                    </p>
                    <p className="text-xs text-gray-500">
                      B.Tech CSE 1st Year
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-blue-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      New student added
                    </p>
                    <p className="text-xs text-gray-500">
                      Student Management
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-purple-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Monthly report generated
                    </p>
                    <p className="text-xs text-gray-500">
                      Reports & Analytics
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;