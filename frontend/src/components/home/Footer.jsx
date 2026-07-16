function Footer() {
  return (
    <footer className="relative overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-violet-600/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div className="min-w-0 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-xl font-bold text-white shadow-lg shadow-blue-950/40">
                U
              </div>

              <div>
                <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                  Upsthiti
                </h2>

                <p className="text-xs font-medium uppercase tracking-[0.16em] text-blue-300">
                  Smart Attendance System
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-xl break-words text-sm leading-6 text-slate-400 sm:text-base sm:leading-7">
              A modern Attendance & Institute Management Platform
              designed for Schools, Colleges and Coaching Institutes.
            </p>
          </div>

          {/* Product */}
          <div className="min-w-0">
            <h3 className="mb-4 text-lg font-bold text-white sm:text-xl">
              Product
            </h3>

            <ul className="space-y-3 break-words text-sm text-slate-400 sm:text-base">
              <li className="transition hover:text-white">Student Management</li>
              <li className="transition hover:text-white">Teacher Management</li>
              <li className="transition hover:text-white">Attendance Tracking</li>
              <li className="transition hover:text-white">Reports & Analytics</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="min-w-0">
            <h3 className="mb-4 text-lg font-bold text-white sm:text-xl">
              Contact
            </h3>

            <ul className="space-y-3 break-words text-sm text-slate-400 sm:text-base">
              <li className="break-all transition hover:text-white">
                support@upsthiti.com
              </li>
              <li className="transition hover:text-white">India</li>
              <li className="transition hover:text-white">Available 24×7</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 text-center text-sm text-slate-500 sm:mt-12 sm:text-base">
          © 2026 Upsthiti. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;