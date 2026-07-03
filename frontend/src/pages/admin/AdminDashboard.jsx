function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-gray-900">
        Admin Dashboard
      </h1>

      <p className="mt-2 text-gray-600">
        Welcome to Upsthiti Admin Panel
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-4">

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-lg font-semibold">Students</h2>
          <p className="mt-3 text-4xl font-bold">0</p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-lg font-semibold">Teachers</h2>
          <p className="mt-3 text-4xl font-bold">0</p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-lg font-semibold">Classes</h2>
          <p className="mt-3 text-4xl font-bold">0</p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-lg font-semibold">Attendance</h2>
          <p className="mt-3 text-4xl font-bold">0%</p>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;