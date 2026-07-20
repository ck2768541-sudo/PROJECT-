import { useEffect, useState } from "react";

import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";
import StatsCard from "../../components/dashboard/StatsCard";

import {
  getDashboardAnalytics,
  getInstituteAnalytics,
  getDepartmentAnalytics,
  getClassAnalytics,
  getSubjectAnalytics,
  getWeeklyAttendanceAnalytics,
  getMonthlyAttendanceAnalytics,
  getSubjectWiseAttendanceAnalytics,
  getClassWiseAttendanceAnalytics,
} from "../../services/dashboardAnalyticsService";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";

const COLORS = ["#22c55e", "#ef4444", "#f59e0b"];


const wait = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

const requestWithRetry = async (
  requestFunction,
  maximumAttempts = 5,
  retryDelay = 7000
) => {
  let lastError;

  for (let attempt = 1; attempt <= maximumAttempts; attempt += 1) {
    try {
      return await requestFunction();
    } catch (error) {
      lastError = error;

      if (attempt < maximumAttempts) {
        await wait(retryDelay);
      }
    }
  }

  throw lastError;
};



















function AdminDashboard() {
  const [analytics, setAnalytics] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalClasses: 0,
    totalDepartments: 0,
    totalSubjects: 0,
    totalAttendance: 0,
    present: 0,
    absent: 0,
    late: 0,
    attendancePercentage: 0,
  });

  const [instituteAnalytics, setInstituteAnalytics] = useState({});
  const [departmentAnalytics, setDepartmentAnalytics] = useState([]);
  const [classAnalytics, setClassAnalytics] = useState([]);
  const [subjectAnalytics, setSubjectAnalytics] = useState([]);
  const [weeklyAnalytics, setWeeklyAnalytics] = useState([]);
  const [monthlyAnalytics, setMonthlyAnalytics] = useState([]);
  const [subjectWiseAnalytics, setSubjectWiseAnalytics] = useState([]);
  const [classWiseAnalytics, setClassWiseAnalytics] = useState([]);

const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const [hasLoadedData, setHasLoadedData] = useState(false);

const loadAllAnalytics = async () => {
  setLoading(true);
  setError("");

  try {
    const [
      dashboardRes,
      instituteRes,
      departmentRes,
      classRes,
      subjectRes,
      weeklyRes,
      monthlyRes,
      subjectWiseRes,
      classWiseRes,
    ] = await Promise.all([
      requestWithRetry(() => getDashboardAnalytics()),
      requestWithRetry(() => getInstituteAnalytics()),
      requestWithRetry(() => getDepartmentAnalytics()),
      requestWithRetry(() => getClassAnalytics()),
      requestWithRetry(() => getSubjectAnalytics()),
      requestWithRetry(() => getWeeklyAttendanceAnalytics()),
      requestWithRetry(() => getMonthlyAttendanceAnalytics()),
      requestWithRetry(() => getSubjectWiseAttendanceAnalytics()),
      requestWithRetry(() => getClassWiseAttendanceAnalytics()),
    ]);

    setAnalytics(dashboardRes.data.analytics || {});
    setInstituteAnalytics(instituteRes.data.instituteAnalytics || {});
    setDepartmentAnalytics(departmentRes.data.departmentAnalytics || []);
    setClassAnalytics(classRes.data.classAnalytics || []);
    setSubjectAnalytics(subjectRes.data.subjectAnalytics || []);
    setWeeklyAnalytics(weeklyRes.data.weeklyAttendance || []);
    setMonthlyAnalytics(monthlyRes.data.monthlyAttendance || []);
    setSubjectWiseAnalytics(
      subjectWiseRes.data.subjectWiseAttendance || []
    );
    setClassWiseAnalytics(
      classWiseRes.data.classWiseAttendance || []
    );

    setHasLoadedData(true);
  } catch (requestError) {
    console.error("Dashboard analytics error:", requestError);

    setError(
      "Dashboard data load nahi ho saka. Backend wake hone mein samay lag sakta hai."
    );
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  loadAllAnalytics();
}, []);


const showValue = (value, suffix = "") => {
  if (loading && !hasLoadedData) {
    return "...";
  }

  if (error && !hasLoadedData) {
    return "—";
  }

  return `${value ?? 0}${suffix}`;
};










  return (
    <div className="flex min-h-screen min-w-0 bg-slate-100">
      <Sidebar />

      <main className="min-w-0 flex-1">
        <Topbar />

        <section className="p-4 sm:p-6 lg:p-8">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">Overview</p>
            <h1 className="mt-1 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
            Dashboard Analytics
            </h1>
            <p className="mt-2 text-sm text-slate-500">Monitor institute performance, attendance, and academic activity.</p>
            {loading && (
  <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
    Dashboard data load ho raha hai. Free backend wake hone mein thoda samay
    lag sakta hai...
  </div>
)}

{error && (
  <div className="mt-4 flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
    <p className="text-sm font-medium text-red-700">{error}</p>

    <button
      type="button"
      onClick={loadAllAnalytics}
      disabled={loading}
      className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? "Retrying..." : "Reload Dashboard"}
    </button>
  </div>
)}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <StatsCard
  title="Total Students"
  value={showValue(analytics.totalStudents)}
  icon="🎓"
/>

<StatsCard
  title="Total Teachers"
  value={showValue(analytics.totalTeachers)}
  icon="👨‍🏫"
/>

<StatsCard
  title="Classes"
  value={showValue(analytics.totalClasses)}
  icon="🏫"
/>

<StatsCard
  title="Departments"
  value={showValue(analytics.totalDepartments)}
  icon="🏢"
/>

<StatsCard
  title="Subjects"
  value={showValue(analytics.totalSubjects)}
  icon="📚"
/>

<StatsCard
  title="Attendance Records"
  value={showValue(analytics.totalAttendance)}
  icon="📋"
/>

<StatsCard
  title="Present"
  value={showValue(analytics.present)}
  icon="✅"
/>

<StatsCard
  title="Absent"
  value={showValue(analytics.absent)}
  icon="❌"
/>

<StatsCard
  title="Late"
  value={showValue(analytics.late)}
  icon="⏰"
/>

<StatsCard
  title="Attendance %"
  value={showValue(analytics.attendancePercentage, "%")}
  icon="📊"
/>
            
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
            <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <h2 className="mb-5 text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">
                Attendance Status
              </h2>

              <div className="h-[280px] w-full rounded-xl bg-slate-50/70 p-2 sm:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Present", value: analytics.present },
                        { name: "Absent", value: analytics.absent },
                        { name: "Late", value: analytics.late },
                      ]}
                      dataKey="value"
                      outerRadius="70%"
                      label
                    >
                      {[
                        analytics.present,
                        analytics.absent,
                        analytics.late,
                      ].map((entry, index) => (
                        <Cell key={index} fill={COLORS[index]} />
                      ))}
                    </Pie>

                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <h2 className="mb-5 text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">
                Attendance Overview
              </h2>

              <div className="overflow-x-auto">
                <div className="h-[280px] min-w-[420px] rounded-xl bg-slate-50/70 p-2 sm:h-[300px] sm:min-w-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: "Present", count: analytics.present },
                        { name: "Absent", count: analytics.absent },
                        { name: "Late", count: analytics.late },
                      ]}
                    >
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#2563eb" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <h2 className="mb-4 text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">
              Institute Summary
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatsCard
  title="Students"
  value={showValue(instituteAnalytics.totalStudents)}
  icon="🎓"
/>

<StatsCard
  title="Teachers"
  value={showValue(instituteAnalytics.totalTeachers)}
  icon="👨‍🏫"
/>

<StatsCard
  title="Classes"
  value={showValue(instituteAnalytics.totalClasses)}
  icon="🏫"
/>

<StatsCard
  title="Departments"
  value={showValue(instituteAnalytics.totalDepartments)}
  icon="🏢"
/>

<StatsCard
  title="Subjects"
  value={showValue(instituteAnalytics.totalSubjects)}
  icon="📚"
/>

<StatsCard
  title="Attendance"
  value={showValue(instituteAnalytics.totalAttendance)}
  icon="📋"
/>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <h2 className="mb-4 text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">
              Department Analytics
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] border-separate border-spacing-0 overflow-hidden text-sm">
                <thead>
                  <tr className="bg-slate-100 text-left text-slate-600">
                    <th className="border-b border-r border-slate-200 px-4 py-3 first:border-l">Department</th>
                    <th className="border-b border-r border-slate-200 px-4 py-3 first:border-l">Teachers</th>
                    <th className="border-b border-r border-slate-200 px-4 py-3 first:border-l">Subjects</th>
                  </tr>
                </thead>

                <tbody>
                  {departmentAnalytics.length > 0 ? (
                    departmentAnalytics.map((dept) => (
                      <tr key={dept.departmentId} className="transition hover:bg-slate-50">
                        <td className="border-b border-r border-slate-200 px-4 py-3 first:border-l">{dept.departmentName}</td>
                        <td className="border-b border-r border-slate-200 px-4 py-3 first:border-l">{dept.teachers}</td>
                        <td className="border-b border-r border-slate-200 px-4 py-3 first:border-l">{dept.subjects}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="3"
                        className="border-b border-l border-r border-slate-200 px-4 py-8 text-center text-slate-500"
                      >
                        No department analytics found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <h2 className="mb-4 text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">
              Class Analytics
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] border-separate border-spacing-0 overflow-hidden text-sm">
                <thead>
                  <tr className="bg-slate-100 text-left text-slate-600">
                    <th className="border-b border-r border-slate-200 px-4 py-3 first:border-l">Class</th>
                    <th className="border-b border-r border-slate-200 px-4 py-3 first:border-l">Students</th>
                    <th className="border-b border-r border-slate-200 px-4 py-3 first:border-l">Attendance Records</th>
                    <th className="border-b border-r border-slate-200 px-4 py-3 first:border-l">Attendance %</th>
                  </tr>
                </thead>

                <tbody>
                  {classAnalytics.length > 0 ? (
                    classAnalytics.map((cls) => (
                      <tr key={cls.classId} className="transition hover:bg-slate-50">
                        <td className="border-b border-r border-slate-200 px-4 py-3 first:border-l">{cls.className}</td>
                        <td className="border-b border-r border-slate-200 px-4 py-3 first:border-l">{cls.students}</td>
                        <td className="border-b border-r border-slate-200 px-4 py-3 first:border-l">{cls.totalAttendance}</td>
                        <td className="border-b border-r border-slate-200 px-4 py-3 first:border-l">
                          {cls.attendancePercentage}%
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="border-b border-l border-r border-slate-200 px-4 py-8 text-center text-slate-500"
                      >
                        No class analytics found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <h2 className="mb-4 text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">
              Subject Analytics
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[950px] border-separate border-spacing-0 overflow-hidden text-sm">
                <thead>
                  <tr className="bg-slate-100 text-left text-slate-600">
                    <th className="border-b border-r border-slate-200 px-4 py-3 first:border-l">Subject</th>
                    <th className="border-b border-r border-slate-200 px-4 py-3 first:border-l">Code</th>
                    <th className="border-b border-r border-slate-200 px-4 py-3 first:border-l">Department</th>
                    <th className="border-b border-r border-slate-200 px-4 py-3 first:border-l">Teacher</th>
                    <th className="border-b border-r border-slate-200 px-4 py-3 first:border-l">Class</th>
                    <th className="border-b border-r border-slate-200 px-4 py-3 first:border-l">Attendance %</th>
                  </tr>
                </thead>

                <tbody>
                  {subjectAnalytics.length > 0 ? (
                    subjectAnalytics.map((subject) => (
                      <tr key={subject.subjectId} className="transition hover:bg-slate-50">
                        <td className="border-b border-r border-slate-200 px-4 py-3 first:border-l">{subject.subjectName}</td>
                        <td className="border-b border-r border-slate-200 px-4 py-3 first:border-l">{subject.code}</td>
                        <td className="border-b border-r border-slate-200 px-4 py-3 first:border-l">{subject.department}</td>
                        <td className="border-b border-r border-slate-200 px-4 py-3 first:border-l">{subject.teacher}</td>
                        <td className="border-b border-r border-slate-200 px-4 py-3 first:border-l">{subject.className}</td>
                        <td className="border-b border-r border-slate-200 px-4 py-3 first:border-l">
                          {subject.attendancePercentage}%
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="border-b border-l border-r border-slate-200 px-4 py-8 text-center text-slate-500"
                      >
                        No subject analytics found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <h2 className="mb-5 text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">
              Weekly Attendance Trend
            </h2>

            <div className="overflow-x-auto">
              <div className="h-[320px] min-w-[600px] rounded-xl bg-slate-50/70 p-2 sm:h-[350px] sm:min-w-0">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyAnalytics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Legend />

                    <Line
                      type="monotone"
                      dataKey="present"
                      stroke="#22c55e"
                      strokeWidth={3}
                    />
                    <Line
                      type="monotone"
                      dataKey="absent"
                      stroke="#ef4444"
                      strokeWidth={3}
                    />
                    <Line
                      type="monotone"
                      dataKey="late"
                      stroke="#f59e0b"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="mt-8 min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <h2 className="mb-5 text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">
              Monthly Attendance Trend
            </h2>

            <div className="overflow-x-auto">
              <div className="h-[320px] min-w-[600px] rounded-xl bg-slate-50/70 p-2 sm:h-[350px] sm:min-w-0">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyAnalytics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />

                    <Line
                      type="monotone"
                      dataKey="present"
                      stroke="#22c55e"
                      strokeWidth={3}
                    />
                    <Line
                      type="monotone"
                      dataKey="absent"
                      stroke="#ef4444"
                      strokeWidth={3}
                    />
                    <Line
                      type="monotone"
                      dataKey="late"
                      stroke="#f59e0b"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="mt-8 min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <h2 className="mb-5 text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">
              Subject-wise Attendance
            </h2>

            <div className="overflow-x-auto">
              <div className="h-[320px] min-w-[760px] rounded-xl bg-slate-50/70 p-2 sm:h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={subjectWiseAnalytics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subjectName" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="percentage" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="mt-8 min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <h2 className="mb-5 text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">
              Class-wise Attendance
            </h2>

            <div className="overflow-x-auto">
              <div className="h-[320px] min-w-[760px] rounded-xl bg-slate-50/70 p-2 sm:h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={classWiseAnalytics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="className" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="percentage" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;