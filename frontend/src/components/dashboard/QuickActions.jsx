function QuickActions() {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-bold">
        Quick Actions
      </h2>

      <div className="grid gap-3">
        <button className="rounded-lg bg-blue-600 py-3 text-white">
          Add Student
        </button>

        <button className="rounded-lg bg-green-600 py-3 text-white">
          Add Teacher
        </button>

        <button className="rounded-lg bg-purple-600 py-3 text-white">
          Mark Attendance
        </button>
      </div>
    </div>
  );
}

export default QuickActions;