import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="min-h-screen w-64 bg-gray-900 p-6 text-white">
      <h1 className="text-2xl font-bold">Upsthiti</h1>

      <nav className="mt-10 space-y-4">
        <Link
          to="/admin"
          className="block rounded-lg bg-blue-600 px-4 py-3"
        >
          Dashboard
        </Link>

        <Link
          to="/admin/students"
          className="block rounded-lg px-4 py-3 hover:bg-gray-800"
        >
          Students
        </Link>

        <Link
          to="/admin/teachers"
          className="block rounded-lg px-4 py-3 hover:bg-gray-800"
        >
          Teachers
        </Link>

        <Link
          to="/admin/classes"
          className="block rounded-lg px-4 py-3 hover:bg-gray-800"
        >
          Classes
        </Link>

        <Link
          to="/admin/departments"
          className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-blue-600 hover:text-white"
        >
          🏢 Departments
        </Link>

        {/* ✅ New Subjects Link */}
        <Link
          to="/admin/subjects"
          className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-blue-600 hover:text-white"
        >
          📚 Subjects
        </Link>

        <Link
          to="/admin/attendance"
          className="block rounded-lg px-4 py-3 hover:bg-gray-800"
        >
          Attendance
        </Link>

        <Link
          to="/admin/reports"
          className="block rounded-lg px-4 py-3 hover:bg-gray-800"
        >
          Reports
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;