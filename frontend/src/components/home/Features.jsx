function Features() {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-4xl font-bold text-gray-900">
          Powerful Features for Every Institute
        </h2>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <div className="rounded-xl border p-6 shadow-sm">
            <h3 className="text-xl font-bold">Student Management</h3>
            <p className="mt-3 text-gray-600">
              Add, update and manage student records easily.
            </p>
          </div>

          <div className="rounded-xl border p-6 shadow-sm">
            <h3 className="text-xl font-bold">Teacher Management</h3>
            <p className="mt-3 text-gray-600">
              Assign teachers to classes and subjects.
            </p>
          </div>

          <div className="rounded-xl border p-6 shadow-sm">
            <h3 className="text-xl font-bold">Smart Attendance</h3>
            <p className="mt-3 text-gray-600">
              Mark attendance quickly with accurate reports.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;