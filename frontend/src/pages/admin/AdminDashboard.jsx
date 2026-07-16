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

  useEffect(() => {
    loadAllAnalytics();
  }, []);

  const loadAllAnalytics = async () => {
    try {
      const dashboardRes = await getDashboardAnalytics();
      const instituteRes = await getInstituteAnalytics();
      const departmentRes = await getDepartmentAnalytics();
      const classRes = await getClassAnalytics();
      const subjectRes = await getSubjectAnalytics();
      const weeklyRes = await getWeeklyAttendanceAnalytics();
      const monthlyRes = await getMonthlyAttendanceAnalytics();
      const subjectWiseRes = await getSubjectWiseAttendanceAnalytics();
      const classWiseRes = await getClassWiseAttendanceAnalytics();

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
    } catch (error) {
      console.log("Dashboard analytics error:", error);
    }
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
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <StatsCard title="Total Students" value={analytics.totalStudents} icon="🎓" />
            <StatsCard title="Total Teachers" value={analytics.totalTeachers} icon="👨‍🏫" />
            <StatsCard title="Classes" value={analytics.totalClasses} icon="🏫" />
            <StatsCard title="Departments" value={analytics.totalDepartments} icon="🏢" />
            <StatsCard title="Subjects" value={analytics.totalSubjects} icon="📚" />
            <StatsCard title="Attendance Records" value={analytics.totalAttendance} icon="📋" />
            <StatsCard title="Present" value={analytics.present} icon="✅" />
            <StatsCard title="Absent" value={analytics.absent} icon="❌" />
            <StatsCard title="Late" value={analytics.late} icon="⏰" />
            <StatsCard
              title="Attendance %"
              value={`${analytics.attendancePercentage}%`}
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
              <StatsCard title="Students" value={instituteAnalytics.totalStudents || 0} icon="🎓" />
              <StatsCard title="Teachers" value={instituteAnalytics.totalTeachers || 0} icon="👨‍🏫" />
              <StatsCard title="Classes" value={instituteAnalytics.totalClasses || 0} icon="🏫" />
              <StatsCard title="Departments" value={instituteAnalytics.totalDepartments || 0} icon="🏢" />
              <StatsCard title="Subjects" value={instituteAnalytics.totalSubjects || 0} icon="📚" />
              <StatsCard title="Attendance" value={instituteAnalytics.totalAttendance || 0} icon="📋" />
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