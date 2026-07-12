function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold text-blue-400">
              Upsthiti
            </h2>

            <p className="mt-4 leading-7 text-gray-400">
              A modern Attendance & Institute Management Platform
              designed for Schools, Colleges and Coaching Institutes.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-4 text-xl font-semibold">
              Product
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>Student Management</li>
              <li>Teacher Management</li>
              <li>Attendance Tracking</li>
              <li>Reports & Analytics</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-xl font-semibold">
              Contact
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>support@upsthiti.com</li>
              <li>India</li>
              <li>Available 24×7</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-500">
          © 2026 Upsthiti. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;