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

setClassWiseAnalytics(classWiseRes.data.classWiseAttendance || []);

    } catch (error) {
      console.log("Dashboard analytics error:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1">
        <Topbar />

        <section className="p-8">
          <h1 className="mb-6 text-2xl font-bold text-gray-800">
            Dashboard Analytics
          </h1>

          <div className="grid gap-6 md:grid-cols-4">
            <StatsCard title="Total Students" value={analytics.totalStudents} icon="🎓" />
            <StatsCard title="Total Teachers" value={analytics.totalTeachers} icon="👨‍🏫" />
            <StatsCard title="Classes" value={analytics.totalClasses} icon="🏫" />
            <StatsCard title="Departments" value={analytics.totalDepartments} icon="🏢" />
            <StatsCard title="Subjects" value={analytics.totalSubjects} icon="📚" />
            <StatsCard title="Attendance Records" value={analytics.totalAttendance} icon="📋" />
            <StatsCard title="Present" value={analytics.present} icon="✅" />
            <StatsCard title="Absent" value={analytics.absent} icon="❌" />
            <StatsCard title="Late" value={analytics.late} icon="⏰" />
            <StatsCard title="Attendance %" value={`${analytics.attendancePercentage}%`} icon="📊" />
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div className="rounded-xl bg-white p-5 shadow">
              <h2 className="mb-5 text-xl font-bold">Attendance Status</h2>

              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={[
                      { name: "Present", value: analytics.present },
                      { name: "Absent", value: analytics.absent },
                      { name: "Late", value: analytics.late },
                    ]}
                    dataKey="value"
                    outerRadius={110}
                    label
                  >
                    {[analytics.present, analytics.absent, analytics.late].map(
                      (entry, index) => (
                        <Cell key={index} fill={COLORS[index]} />
                      )
                    )}
                  </Pie>

                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="rounded-xl bg-white p-5 shadow">
              <h2 className="mb-5 text-xl font-bold">Attendance Overview</h2>

              <ResponsiveContainer width="100%" height={300}>
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

          <div className="mt-10 rounded-xl bg-white p-5 shadow">
            <h2 className="mb-4 text-xl font-bold text-gray-800">
              Institute Summary
            </h2>

            <div className="grid gap-4 md:grid-cols-3">
              <StatsCard title="Students" value={instituteAnalytics.totalStudents || 0} icon="🎓" />
              <StatsCard title="Teachers" value={instituteAnalytics.totalTeachers || 0} icon="👨‍🏫" />
              <StatsCard title="Classes" value={instituteAnalytics.totalClasses || 0} icon="🏫" />
              <StatsCard title="Departments" value={instituteAnalytics.totalDepartments || 0} icon="🏢" />
              <StatsCard title="Subjects" value={instituteAnalytics.totalSubjects || 0} icon="📚" />
              <StatsCard title="Attendance" value={instituteAnalytics.totalAttendance || 0} icon="📋" />
            </div>
          </div>

          <div className="mt-10 overflow-x-auto rounded-xl bg-white p-5 shadow">
            <h2 className="mb-4 text-xl font-bold text-gray-800">
              Department Analytics
            </h2>

            <table className="w-full border">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="border px-4 py-2">Department</th>
                  <th className="border px-4 py-2">Teachers</th>
                  <th className="border px-4 py-2">Subjects</th>
                </tr>
              </thead>

              <tbody>
                {departmentAnalytics.length > 0 ? (
                  departmentAnalytics.map((dept) => (
                    <tr key={dept.departmentId}>
                      <td className="border px-4 py-2">{dept.departmentName}</td>
                      <td className="border px-4 py-2">{dept.teachers}</td>
                      <td className="border px-4 py-2">{dept.subjects}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="border px-4 py-6 text-center text-gray-500">
                      No department analytics found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-10 overflow-x-auto rounded-xl bg-white p-5 shadow">
            <h2 className="mb-4 text-xl font-bold text-gray-800">
              Class Analytics
            </h2>

            <table className="w-full border">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="border px-4 py-2">Class</th>
                  <th className="border px-4 py-2">Students</th>
                  <th className="border px-4 py-2">Attendance Records</th>
                  <th className="border px-4 py-2">Attendance %</th>
                </tr>
              </thead>

              <tbody>
                {classAnalytics.length > 0 ? (
                  classAnalytics.map((cls) => (
                    <tr key={cls.classId}>
                      <td className="border px-4 py-2">{cls.className}</td>
                      <td className="border px-4 py-2">{cls.students}</td>
                      <td className="border px-4 py-2">{cls.totalAttendance}</td>
                      <td className="border px-4 py-2">{cls.attendancePercentage}%</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="border px-4 py-6 text-center text-gray-500">
                      No class analytics found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-10 overflow-x-auto rounded-xl bg-white p-5 shadow">
            <h2 className="mb-4 text-xl font-bold text-gray-800">
              Subject Analytics
            </h2>

            <table className="w-full border">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="border px-4 py-2">Subject</th>
                  <th className="border px-4 py-2">Code</th>
                  <th className="border px-4 py-2">Department</th>
                  <th className="border px-4 py-2">Teacher</th>
                  <th className="border px-4 py-2">Class</th>
                  <th className="border px-4 py-2">Attendance %</th>
                </tr>
              </thead>

              <tbody>
                {subjectAnalytics.length > 0 ? (
                  subjectAnalytics.map((subject) => (
                    <tr key={subject.subjectId}>
                      <td className="border px-4 py-2">{subject.subjectName}</td>
                      <td className="border px-4 py-2">{subject.code}</td>
                      <td className="border px-4 py-2">{subject.department}</td>
                      <td className="border px-4 py-2">{subject.teacher}</td>
                      <td className="border px-4 py-2">{subject.className}</td>
                      <td className="border px-4 py-2">
                        {subject.attendancePercentage}%
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="border px-4 py-6 text-center text-gray-500">
                      No subject analytics found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>



<div className="mt-10 rounded-xl bg-white p-5 shadow">

  <h2 className="mb-5 text-xl font-bold">
    Weekly Attendance Trend
  </h2>

  <ResponsiveContainer width="100%" height={350}>

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



<div className="mt-10 rounded-xl bg-white p-5 shadow">
  <h2 className="mb-5 text-xl font-bold">
    Monthly Attendance Trend
  </h2>

  <ResponsiveContainer width="100%" height={350}>
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


<div className="mt-10 rounded-xl bg-white p-5 shadow">

  <h2 className="mb-5 text-xl font-bold">
    Subject-wise Attendance
  </h2>

  <ResponsiveContainer width="100%" height={350}>

    <BarChart data={subjectWiseAnalytics}>

      <CartesianGrid strokeDasharray="3 3" />

      <XAxis
        dataKey="subjectName"
      />

      <YAxis />

      <Tooltip />

      <Legend />

      <Bar
        dataKey="percentage"
        fill="#3b82f6"
      />

    </BarChart>

  </ResponsiveContainer>

</div>


<div className="mt-10 rounded-xl bg-white p-5 shadow">
  <h2 className="mb-5 text-xl font-bold">
    Class-wise Attendance
  </h2>

  <ResponsiveContainer width="100%" height={350}>
    <BarChart data={classWiseAnalytics}>
      <CartesianGrid strokeDasharray="3 3" />

      <XAxis dataKey="className" />

      <YAxis />

      <Tooltip />

      <Legend />

      <Bar
        dataKey="percentage"
        fill="#8b5cf6"
      />
    </BarChart>
  </ResponsiveContainer>
</div>










        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;