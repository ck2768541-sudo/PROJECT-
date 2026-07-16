function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-purple-200/40 blur-3xl" />

      <div className="relative mx-auto grid min-h-[auto] max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:min-h-[90vh] lg:grid-cols-2 lg:gap-14 lg:py-20">
        <div className="min-w-0">
          <span className="inline-flex max-w-full items-center rounded-full border border-blue-200 bg-blue-100/80 px-3 py-2 text-xs font-semibold text-blue-700 shadow-sm backdrop-blur sm:px-4 sm:text-sm">
            Smart Attendance Management System
          </span>

          <h1 className="mt-5 break-words text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:mt-6 sm:text-4xl md:text-5xl lg:text-6xl">
            Manage Attendance
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Faster, Smarter & Securely
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:mt-7 sm:text-lg sm:leading-8">
            Upsthiti helps institutes manage students, teachers, classes,
            subjects, attendance, reports and analytics from one secure
            platform.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-4 sm:gap-4">
            {[
              ["100%", "Digital", "text-blue-600"],
              ["24×7", "Access", "text-emerald-600"],
              ["Secure", "JWT Auth", "text-violet-600"],
              ["Live", "Analytics", "text-orange-600"],
            ].map(([value, label, color]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/80 bg-white/80 p-3 text-center shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md sm:p-4"
              >
                <h2 className={`text-xl font-extrabold sm:text-2xl ${color}`}>
                  {value}
                </h2>
                <p className="mt-1 text-xs font-medium text-slate-600 sm:text-sm">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-w-0">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-r from-blue-300/30 to-purple-300/30 blur-2xl sm:-inset-6" />

          <div className="relative overflow-hidden rounded-3xl border border-white/80 bg-white/95 p-3 shadow-2xl shadow-indigo-200/40 backdrop-blur sm:rounded-[2rem] sm:p-5">
            <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-4">
              <div className="min-w-0">
                <p className="text-xs font-medium text-slate-500 sm:text-sm">
                  Admin Overview
                </p>
                <h2 className="break-words text-base font-extrabold tracking-tight text-slate-900 sm:text-xl">
                  Attendance Dashboard
                </h2>
              </div>

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700 shadow-sm sm:h-11 sm:w-11 sm:text-base">
                AK
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:mt-5 sm:gap-4">
              {[
                ["Students", "1,248", "Active students", "border-blue-100 bg-blue-50", "text-blue-700"],
                ["Teachers", "84", "Active teachers", "border-violet-100 bg-violet-50", "text-violet-700"],
                ["Present Today", "92%", "Overall attendance", "border-emerald-100 bg-emerald-50", "text-emerald-700"],
                ["Classes", "36", "Active classes", "border-orange-100 bg-orange-50", "text-orange-700"],
              ].map(([label, value, note, cardClass, labelClass]) => (
                <div
                  key={label}
                  className={`min-w-0 rounded-2xl border p-3 transition hover:-translate-y-0.5 hover:shadow-sm sm:p-4 ${cardClass}`}
                >
                  <p className={`text-xs font-semibold sm:text-sm ${labelClass}`}>
                    {label}
                  </p>
                  <h3 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">
                    {value}
                  </h3>
                  <p className="mt-2 text-[11px] text-slate-500 sm:text-xs">
                    {note}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-3 sm:mt-5 sm:p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <h3 className="font-extrabold text-slate-900">
                    Weekly Attendance
                  </h3>
                  <p className="text-xs text-slate-500 sm:text-sm">
                    Present students this week
                  </p>
                </div>

                <span className="w-fit rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                  +8.4%
                </span>
              </div>

              <div className="mt-5 flex h-32 items-end justify-between gap-2 sm:mt-6 sm:h-36 sm:gap-3">
                {[65, 78, 72, 90, 84, 68].map((height, index) => (
                  <div key={index} className="flex min-w-0 flex-1 flex-col items-center gap-2">
                    <div
                      className="w-full rounded-t-lg bg-gradient-to-t from-blue-600 to-blue-400 shadow-sm"
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-[10px] text-slate-500 sm:text-xs">
                      {[
                        "Mon",
                        "Tue",
                        "Wed",
                        "Thu",
                        "Fri",
                        "Sat",
                      ][index]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-3 sm:mt-5 sm:p-4">
              <h3 className="font-extrabold text-slate-900">Recent Activity</h3>

              <div className="mt-4 space-y-3">
                {[
                  ["bg-emerald-500", "Attendance marked successfully", "B.Tech CSE 1st Year"],
                  ["bg-blue-500", "New student added", "Student Management"],
                  ["bg-violet-500", "Monthly report generated", "Reports & Analytics"],
                ].map(([dot, title, subtitle]) => (
                  <div key={title} className="flex items-start gap-3">
                    <div className={`mt-1 h-3 w-3 shrink-0 rounded-full shadow-sm ${dot}`} />
                    <div className="min-w-0">
                      <p className="break-words text-sm font-medium text-slate-800">
                        {title}
                      </p>
                      <p className="break-words text-xs text-slate-500">
                        {subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;