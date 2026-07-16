import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getMyStudentDashboard } from "../../services/studentService";

function StudentDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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

      const response = await getMyStudentDashboard();
      setDashboardData(response.data);
    } catch (error) {
      console.log("Student dashboard error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load student dashboard"
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
      <section className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />

          <p className="mt-4 break-words font-medium text-slate-600">
            Loading your dashboard...
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-8">
        <div className="w-full max-w-lg rounded-3xl border border-red-100 bg-white p-5 text-center shadow-xl sm:p-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-3xl">
            !
          </div>

          <h1 className="mt-5 text-2xl font-bold text-red-600">
            Dashboard Error
          </h1>

          <p className="mt-3 break-words text-slate-600">{error}</p>
        </div>
      </section>
    );
  }

  const profile = dashboardData?.profile;
  const summary = dashboardData?.summary;

  const subjectWiseAttendance =
    dashboardData?.subjectWiseAttendance || [];

  const attendanceHistory =
    dashboardData?.attendanceHistory || [];

  const monthlyAttendance =
    dashboardData?.monthlyAttendance || [];

  const attendancePercentage =
    summary?.attendancePercentage || 0;

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
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-lg font-bold text-white shadow-lg sm:h-12 sm:w-12 sm:text-xl">
              U
            </div>

            <div className="min-w-0">
              <h1 className="break-words text-xl font-bold text-slate-900 sm:text-2xl lg:text-3xl">
                Student Dashboard
              </h1>

              <p className="mt-1 break-words text-sm text-slate-500">
                Welcome back,{" "}
                <span className="font-semibold text-blue-600">
                  {user?.fullName ||
                    profile?.fullName ||
                    "Student"}
                </span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full rounded-xl bg-red-500 px-4 py-2.5 font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-red-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 md:w-auto"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto min-w-0 max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* Profile Hero */}
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-blue-700 via-indigo-700 to-violet-700 p-4 text-white shadow-2xl shadow-indigo-200/40 sm:p-6 lg:p-8">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />
          <div className="absolute -bottom-28 right-32 h-72 w-72 rounded-full bg-white/5" />

          <div className="relative grid min-w-0 gap-6 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-8">
            <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl border border-white/30 bg-white/15 text-3xl font-bold shadow-lg backdrop-blur sm:h-24 sm:w-24 sm:text-4xl">
                {profile?.fullName?.charAt(0)?.toUpperCase() || "S"}
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium text-blue-100">
                  Student Profile
                </p>

                <h2 className="mt-1 break-words text-2xl font-bold sm:text-3xl">
                  {profile?.fullName || "Student"}
                </h2>

                <div className="mt-4 flex flex-wrap gap-2 text-xs sm:gap-3 sm:text-sm">
                  <span className="rounded-full bg-white/15 px-3 py-2 backdrop-blur sm:px-4">
                    Roll No: {profile?.rollNumber || "N/A"}
                  </span>

                  <span className="rounded-full bg-white/15 px-3 py-2 backdrop-blur sm:px-4">
                    {profile?.class?.name || "Class N/A"}
                    {profile?.class?.section
                      ? ` - ${profile.class.section}`
                      : ""}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur sm:p-5">
              <p className="text-sm text-blue-100">
                Academic Year
              </p>

              <p className="mt-1 break-words text-xl font-bold sm:text-2xl">
                {profile?.class?.academicYear || "N/A"}
              </p>
            </div>
          </div>
        </section>

        {summary?.totalClasses === 0 && (
          <div className="mt-6 break-words rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-700 shadow-sm">
            No attendance has been recorded yet.
          </div>
        )}

        {/* Summary Cards */}
        <section className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
          <div className="rounded-3xl border border-blue-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-500">
                  Total Classes
                </p>

                <p className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
                  {summary?.totalClasses || 0}
                </p>
              </div>

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-xl">
                📚
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-emerald-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-500">
                  Present
                </p>

                <p className="mt-3 text-3xl font-bold text-emerald-600 sm:text-4xl">
                  {summary?.presentCount || 0}
                </p>
              </div>

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-xl">
                ✓
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-red-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-500">
                  Absent
                </p>

                <p className="mt-3 text-3xl font-bold text-red-600 sm:text-4xl">
                  {summary?.absentCount || 0}
                </p>
              </div>

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-xl">
                ✕
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-violet-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-500">
                  Attendance
                </p>

                <p className="mt-3 text-3xl font-bold text-violet-600 sm:text-4xl">
                  {attendancePercentage}%
                </p>
              </div>

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-xl">
                %
              </div>
            </div>

            <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-500 transition-all duration-700"
                style={{
                  width: `${Math.min(
                    attendancePercentage,
                    100
                  )}%`,
                }}
              />
            </div>
          </div>
        </section>

        {/* Profile Details */}
        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:mt-8 sm:p-6 lg:p-8">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="break-words text-lg font-bold text-slate-900 sm:text-xl">
                Personal Information
              </h2>

              <p className="mt-1 break-words text-sm text-slate-500">
                Your registered student details
              </p>
            </div>

            <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-xl sm:flex">
              👤
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {[
              ["Full Name", profile?.fullName || "N/A"],
              ["Roll Number", profile?.rollNumber || "N/A"],
              ["Email", profile?.email || "N/A"],
              ["Phone", profile?.phone || "N/A"],
              [
                "Class",
                `${profile?.class?.name || "N/A"}${
                  profile?.class?.section
                    ? ` - ${profile.class.section}`
                    : ""
                }`,
              ],
              [
                "Academic Year",
                profile?.class?.academicYear || "N/A",
              ],
            ].map(([label, value]) => (
              <div
                key={label}
                className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 transition hover:border-blue-200 hover:bg-blue-50/40"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  {label}
                </p>

                <p className="mt-2 break-words font-semibold text-slate-800">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Subject-wise Attendance */}
        <section className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md sm:mt-8">
          <div className="border-b border-slate-100 p-4 sm:p-6 lg:p-8">
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
              Subject-wise Attendance
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Attendance performance across all subjects
            </p>
          </div>

          {subjectWiseAttendance.length === 0 ? (
            <div className="p-6 text-center text-slate-500 sm:p-10">
              No subject attendance found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[750px] text-left text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-6 py-4">Subject</th>
                    <th className="px-6 py-4">Total</th>
                    <th className="px-6 py-4">Present</th>
                    <th className="px-6 py-4">Absent</th>
                    <th className="px-6 py-4">Late</th>
                    <th className="px-6 py-4">Percentage</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {subjectWiseAttendance.map((item, index) => (
                    <tr
                      key={index}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-6 py-4 font-semibold text-slate-900">
                        {item.subjectName}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {item.total}
                      </td>

                      <td className="px-6 py-4 font-medium text-emerald-600">
                        {item.present}
                      </td>

                      <td className="px-6 py-4 font-medium text-red-600">
                        {item.absent}
                      </td>

                      <td className="px-6 py-4 font-medium text-amber-600">
                        {item.late}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className="h-full rounded-full bg-blue-600"
                              style={{
                                width: `${Math.min(
                                  item.percentage || 0,
                                  100
                                )}%`,
                              }}
                            />
                          </div>

                          <span className="font-semibold text-slate-700">
                            {item.percentage}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Bottom Grid */}
        <section className="mt-6 grid grid-cols-1 gap-6 sm:mt-8 xl:grid-cols-2 xl:gap-8">
          {/* Attendance History */}
          <div className="min-w-0 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
            <div className="border-b border-slate-100 p-4 sm:p-6">
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                Attendance History
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your latest attendance records
              </p>
            </div>

            {attendanceHistory.length === 0 ? (
              <div className="p-6 text-center text-slate-500 sm:p-10">
                No attendance history found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[650px] text-left text-sm">
                  <thead className="bg-slate-50 text-slate-600">
                    <tr>
                      <th className="px-5 py-4">Date</th>
                      <th className="px-5 py-4">Subject</th>
                      <th className="px-5 py-4">Class</th>
                      <th className="px-5 py-4">Status</th>
                      <th className="px-5 py-4">Remarks</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {attendanceHistory.map((item) => (
                      <tr
                        key={item._id}
                        className="transition hover:bg-slate-50"
                      >
                        <td className="px-5 py-4 text-slate-600">
                          {item.date}
                        </td>

                        <td className="px-5 py-4 font-medium text-slate-900">
                          {item.subject?.name || "N/A"}
                        </td>

                        <td className="px-5 py-4 text-slate-600">
                          {item.class?.name || "N/A"}
                          {item.class?.section
                            ? ` - ${item.class.section}`
                            : ""}
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                              item.status
                            )}`}
                          >
                            {item.status}
                          </span>
                        </td>

                        <td className="px-5 py-4 text-slate-600">
                          {item.remarks || "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Monthly Attendance */}
          <div className="min-w-0 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
            <div className="border-b border-slate-100 p-4 sm:p-6">
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                Monthly Attendance
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your month-by-month performance
              </p>
            </div>

            {monthlyAttendance.length === 0 ? (
              <div className="p-6 text-center text-slate-500 sm:p-10">
                No monthly attendance found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[650px] text-left text-sm">
                  <thead className="bg-slate-50 text-slate-600">
                    <tr>
                      <th className="px-5 py-4">Month</th>
                      <th className="px-5 py-4">Total</th>
                      <th className="px-5 py-4">Present</th>
                      <th className="px-5 py-4">Absent</th>
                      <th className="px-5 py-4">Late</th>
                      <th className="px-5 py-4">Percentage</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {monthlyAttendance.map((item) => (
                      <tr
                        key={item.month}
                        className="transition hover:bg-slate-50"
                      >
                        <td className="px-5 py-4 font-semibold text-slate-900">
                          {item.month}
                        </td>

                        <td className="px-5 py-4 text-slate-600">
                          {item.total}
                        </td>

                        <td className="px-5 py-4 text-emerald-600">
                          {item.present}
                        </td>

                        <td className="px-5 py-4 text-red-600">
                          {item.absent}
                        </td>

                        <td className="px-5 py-4 text-amber-600">
                          {item.late}
                        </td>

                        <td className="px-5 py-4 font-semibold text-blue-600">
                          {item.percentage}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>

        <footer className="mt-10 border-t border-slate-200 pt-5 pb-4 text-center text-sm text-slate-400">
          Upsthiti Student Portal
        </footer>
      </main>
    </section>
  );
}

export default StudentDashboard;