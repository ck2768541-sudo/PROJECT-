import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getMyTeacherDashboard } from "../../services/teacherService";

function TeacherDashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const fetchDashboard = async () => {
    try {
      setError("");

      const response = await getMyTeacherDashboard();
      setDashboardData(response.data);
    } catch (error) {
      console.log("Teacher dashboard error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load teacher dashboard"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />

          <p className="mt-4 font-medium text-slate-600">
            Loading teacher dashboard...
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
        <div className="w-full max-w-lg rounded-3xl border border-red-100 bg-white p-8 text-center shadow-xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-3xl font-bold text-red-600">
            !
          </div>

          <h1 className="mt-5 text-2xl font-bold text-red-600">
            Dashboard Error
          </h1>

          <p className="mt-3 text-slate-600">{error}</p>
        </div>
      </section>
    );
  }

  const profile = dashboardData?.profile;
  const summary = dashboardData?.summary;
  const assignedClasses = profile?.assignedClasses || [];
  const assignedSubjects = dashboardData?.assignedSubjects || [];
  const recentAttendance = dashboardData?.recentAttendance || [];

  const getStatusClass = (status) => {
    if (status === "Present") {
      return "bg-emerald-100 text-emerald-700";
    }

    if (status === "Absent") {
      return "bg-red-100 text-red-700";
    }

    if (status === "Late") {
      return "bg-amber-100 text-amber-700";
    }

    return "bg-slate-100 text-slate-700";
  };

  return (
    <section className="min-h-screen min-w-0 bg-slate-100">
      {/* Top Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-lg font-bold text-white shadow-lg sm:h-12 sm:w-12 sm:text-xl">
              U
            </div>

            <div className="min-w-0">
              <h1 className="break-words text-xl font-bold text-slate-900 sm:text-2xl lg:text-3xl">
                Teacher Dashboard
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Welcome back,{" "}
                <span className="font-semibold text-indigo-600">
                  {profile?.fullName || "Teacher"}
                </span>
              </p>
            </div>
          </div>

          <div className="grid w-full grid-cols-2 gap-2 sm:w-auto sm:flex sm:items-center sm:gap-3">
            <Link
              to="/teacher/attendance"
              className="rounded-xl bg-indigo-600 px-3 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:px-5"
            >
              Mark Attendance
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-xl bg-red-500 px-3 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-red-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 sm:px-4"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto min-w-0 max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* Teacher Profile Hero */}
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-indigo-700 via-violet-700 to-purple-700 p-4 text-white shadow-2xl shadow-violet-200/40 sm:p-6 lg:p-8">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />
          <div className="absolute -bottom-28 right-32 h-72 w-72 rounded-full bg-white/5" />

          <div className="relative grid min-w-0 gap-6 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-8">
            <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl border border-white/30 bg-white/15 text-3xl font-bold shadow-lg backdrop-blur sm:h-24 sm:w-24 sm:text-4xl">
                {profile?.fullName?.charAt(0)?.toUpperCase() || "T"}
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium text-indigo-100">
                  Teacher Profile
                </p>

                <h2 className="mt-1 break-words text-2xl font-bold sm:text-3xl">
                  {profile?.fullName || "Teacher"}
                </h2>

                <div className="mt-4 flex flex-wrap gap-2 text-xs sm:gap-3 sm:text-sm">
                  <span className="rounded-full bg-white/15 px-4 py-2 backdrop-blur">
                    {profile?.department || "Department N/A"}
                  </span>

                  <span className="rounded-full bg-white/15 px-4 py-2 backdrop-blur">
                    {profile?.qualification || "Qualification N/A"}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur">
              <p className="text-sm text-indigo-100">
                Assigned Subjects
              </p>

              <p className="mt-1 text-3xl font-bold">
                {summary?.totalSubjects || 0}
              </p>
            </div>
          </div>
        </section>

        {/* Summary Cards */}
        <section className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
          <div className="rounded-3xl border border-blue-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">
                  Assigned Classes
                </p>

                <p className="mt-3 text-4xl font-bold text-blue-600">
                  {summary?.totalClasses || 0}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-xl">
                🏫
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-violet-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">
                  Assigned Subjects
                </p>

                <p className="mt-3 text-4xl font-bold text-violet-600">
                  {summary?.totalSubjects || 0}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-xl">
                📚
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">
                  Attendance Records
                </p>

                <p className="mt-3 text-4xl font-bold text-slate-800">
                  {summary?.totalAttendanceRecords || 0}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-xl">
                📋
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-emerald-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">
                  Present
                </p>

                <p className="mt-3 text-4xl font-bold text-emerald-600">
                  {summary?.presentCount || 0}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-xl">
                ✓
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-red-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">
                  Absent
                </p>

                <p className="mt-3 text-4xl font-bold text-red-600">
                  {summary?.absentCount || 0}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-xl">
                ✕
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-amber-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">
                  Late
                </p>

                <p className="mt-3 text-4xl font-bold text-amber-600">
                  {summary?.lateCount || 0}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-xl">
                ⏱
              </div>
            </div>
          </div>
        </section>

        {/* Personal Information */}
        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:mt-8 sm:p-6 lg:p-8">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="break-words text-lg font-bold text-slate-900 sm:text-xl">
                Personal Information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your registered teacher details
              </p>
            </div>

            <div className="hidden h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-xl sm:flex">
              👨‍🏫
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {[
              ["Full Name", profile?.fullName || "N/A"],
              ["Email", profile?.email || "N/A"],
              ["Phone", profile?.phone || "N/A"],
              ["Gender", profile?.gender || "N/A"],
              ["Department", profile?.department || "N/A"],
              ["Qualification", profile?.qualification || "N/A"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 transition hover:border-indigo-200 hover:bg-indigo-50/40"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  {label}
                </p>

                <p className="mt-2 break-words font-semibold capitalize text-slate-800">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Assigned Classes */}
        <section className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md sm:mt-8">
          <div className="border-b border-slate-100 p-4 sm:p-6 lg:p-8">
            <h2 className="text-xl font-bold text-slate-900">
              My Assigned Classes
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Classes currently assigned to you
            </p>
          </div>

          {assignedClasses.length === 0 ? (
            <div className="p-6 text-center text-slate-500 sm:p-10">
              No assigned classes found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-left text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-6 py-4">Class</th>
                    <th className="px-6 py-4">Section</th>
                    <th className="px-6 py-4">Department</th>
                    <th className="px-6 py-4">Academic Year</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {assignedClasses.map((item) => (
                    <tr
                      key={item._id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-6 py-4 font-semibold text-slate-900">
                        {item.name || "N/A"}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {item.section || "N/A"}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {item.department || "N/A"}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {item.academicYear || "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Assigned Subjects */}
        <section className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md sm:mt-8">
          <div className="border-b border-slate-100 p-4 sm:p-6 lg:p-8">
            <h2 className="text-xl font-bold text-slate-900">
              My Assigned Subjects
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Subjects currently assigned to you
            </p>
          </div>

          {assignedSubjects.length === 0 ? (
            <div className="p-6 text-center text-slate-500 sm:p-10">
              No subjects assigned.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-6 py-4">Subject</th>
                    <th className="px-6 py-4">Code</th>
                    <th className="px-6 py-4">Class</th>
                    <th className="px-6 py-4">Department</th>
                    <th className="px-6 py-4">Semester</th>
                    <th className="px-6 py-4">Type</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {assignedSubjects.map((subject) => (
                    <tr
                      key={subject._id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-6 py-4 font-semibold text-slate-900">
                        {subject.name || "N/A"}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {subject.code || "N/A"}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {subject.class?.name || "N/A"}
                        {subject.class?.section
                          ? ` - ${subject.class.section}`
                          : ""}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {subject.department?.name || "N/A"}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {subject.semester || "N/A"}
                      </td>

                      <td className="px-6 py-4">
                        <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                          {subject.subjectType || "N/A"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Recent Attendance */}
        <section className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md sm:mt-8">
          <div className="border-b border-slate-100 p-4 sm:p-6 lg:p-8">
            <h2 className="text-xl font-bold text-slate-900">
              Recent Attendance
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Latest attendance records from your classes
            </p>
          </div>

          {recentAttendance.length === 0 ? (
            <div className="p-6 text-center text-slate-500 sm:p-10">
              No recent attendance found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Student</th>
                    <th className="px-6 py-4">Roll No</th>
                    <th className="px-6 py-4">Subject</th>
                    <th className="px-6 py-4">Class</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {recentAttendance.map((item) => (
                    <tr
                      key={item._id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-6 py-4 text-slate-600">
                        {item.date || "N/A"}
                      </td>

                      <td className="px-6 py-4 font-semibold text-slate-900">
                        {item.student?.fullName || "N/A"}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {item.student?.rollNumber || "N/A"}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {item.subject?.name || "N/A"}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {item.class?.name || "N/A"}
                        {item.class?.section
                          ? ` - ${item.class.section}`
                          : ""}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                            item.status
                          )}`}
                        >
                          {item.status || "N/A"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <footer className="mt-10 border-t border-slate-200 pt-5 pb-4 text-center text-sm text-slate-400">
          Upsthiti Teacher Portal
        </footer>
      </main>
    </section>
  );
}

export default TeacherDashboard;