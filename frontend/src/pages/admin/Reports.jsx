import { useEffect, useState } from "react";

import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";


import {
  getStudentReport,
  getTeacherReport,
  getAttendanceReport,
  exportAttendanceExcel,
  exportAttendancePDF,
  exportStudentsExcel,
  exportTeachersExcel,
} from "../../services/reportService";


import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
 Pie,
  Cell,
  Legend,
} from "recharts";







import { getDepartments } from "../../services/departmentService";
import { getClasses } from "../../services/classService";
import { getSubjects } from "../../services/subjectService";

function Reports() {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [attendance, setAttendance] = useState([]);

  const [departments, setDepartments] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [filters, setFilters] = useState({
    departmentId: "",
    classId: "",
    subjectId: "",
    startDate: "",
    endDate: "",
  });

  const [summary, setSummary] = useState({
    total: 0,
    present: 0,
    absent: 0,
    late: 0,
    percentage: 0,
  });


const COLORS = [
  "#2563eb",
  "#16a34a",
  "#dc2626",
  "#f59e0b",
];





useEffect(() => {
  fetchDropdownData();
  fetchReports();
}, []);

useEffect(() => {
  const interval = setInterval(() => {
    fetchReports();
  }, 30000);

  return () => clearInterval(interval);
}, []);





  const fetchDropdownData = async () => {
    try {
      const deptRes = await getDepartments();
      const classRes = await getClasses();
      const subjectRes = await getSubjects();

      setDepartments(deptRes.data.departments || deptRes.data || []);
      setClasses(classRes.data.classes || classRes.data || []);
      setSubjects(subjectRes.data.subjects || subjectRes.data || []);
    } catch (error) {
      console.log("Dropdown fetch error:", error);
    }
  };

  const fetchReports = async () => {
    try {
      const studentRes = await getStudentReport({
        departmentId: filters.departmentId,
        classId: filters.classId,
      });

      const teacherRes = await getTeacherReport({
        departmentId: filters.departmentId,
      });

      const attendanceRes = await getAttendanceReport({
        classId: filters.classId,
        subjectId: filters.subjectId,
        startDate: filters.startDate,
        endDate: filters.endDate,
      });

      setStudents(studentRes.data.students || []);
      setTeachers(teacherRes.data.teachers || []);
      setAttendance(attendanceRes.data.attendance || []);

      setSummary(
        attendanceRes.data.summary || {
          total: 0,
          present: 0,
          absent: 0,
          late: 0,
          percentage: 0,
        }
      );
    } catch (error) {
      console.log("Reports fetch error:", error);
    }
  };

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleApplyFilters = () => {
    fetchReports();
  };

  const handleResetFilters = () => {
    const resetData = {
      departmentId: "",
      classId: "",
      subjectId: "",
      startDate: "",
      endDate: "",
    };

    setFilters(resetData);

    setTimeout(() => {
      fetchReports();
    }, 100);
  };

const handleExcelExport = async () => {
  try {
    const res = await exportAttendanceExcel({
      classId: filters.classId,
      subjectId: filters.subjectId,
      startDate: filters.startDate,
      endDate: filters.endDate,
    });

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", "attendance-report.xlsx");

    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.log("Excel export error:", error);
    alert("Excel export failed");
  }
};

const handlePDFExport = async () => {
  try {
    const res = await exportAttendancePDF({
      classId: filters.classId,
      subjectId: filters.subjectId,
      startDate: filters.startDate,
      endDate: filters.endDate,
    });

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", "attendance-report.pdf");

    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.log("PDF export error:", error);
    alert("PDF export failed");
  }
};

const downloadBlob = (data, filename) => {
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement("a");

  link.href = url;
  link.setAttribute("download", filename);

  document.body.appendChild(link);
  link.click();

  link.remove();
  window.URL.revokeObjectURL(url);
};

const handleStudentExcelExport = async () => {
  try {
    const res = await exportStudentsExcel({
      classId: filters.classId,
    });

    downloadBlob(res.data, "student-report.xlsx");
  } catch (error) {
    console.log("Student Excel export error:", error);
    alert("Student Excel export failed");
  }
};

const handleTeacherExcelExport = async () => {
  try {
    const res = await exportTeachersExcel({
      departmentId: filters.departmentId,
    });

    downloadBlob(res.data, "teacher-report.xlsx");
  } catch (error) {
    console.log("Teacher Excel export error:", error);
    alert("Teacher Excel export failed");
  }
};

const handlePrintReport = () => {
  window.print();
};












  return (
    <div className="flex min-h-screen min-w-0 bg-slate-100">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />

        <section className="p-4 sm:p-6 lg:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">Reports</p>

          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Reports Dashboard
          </h1>

          <p className="mt-2 text-slate-600">
            View student, teacher and attendance reports with filters.
          </p>

          {/* Dashboard Cards */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md sm:p-5">
              <p className="text-sm font-semibold text-slate-500">Total Students</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">{students.length}</h2>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md sm:p-5">
              <p className="text-sm font-semibold text-slate-500">Total Teachers</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">{teachers.length}</h2>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md sm:p-5">
              <p className="text-sm font-semibold text-slate-500">Attendance Records</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">{summary.total}</h2>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md sm:p-5">
              <p className="text-sm font-semibold text-slate-500">Attendance %</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
                {summary.percentage}%
              </h2>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md sm:p-5">
              <p className="text-sm font-semibold text-slate-500">Present</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">{summary.present}</h2>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md sm:p-5">
              <p className="text-sm font-semibold text-slate-500">Absent</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">{summary.absent}</h2>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md sm:p-5">
              <p className="text-sm font-semibold text-slate-500">Late</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">{summary.late}</h2>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md sm:p-5">
              <p className="text-sm font-semibold text-slate-500">Report Status</p>
              <h2 className="mt-2 text-2xl font-bold text-green-600">
                Active
              </h2>
            </div>
          </div>

          {/* Filters */}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <h2 className="text-xl font-extrabold tracking-tight text-slate-900">Report Filters</h2>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <select
                name="departmentId"
                value={filters.departmentId}
                onChange={handleChange}
                className="min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">All Departments</option>

                {departments.map((dept) => (
                  <option key={dept._id} value={dept._id}>
                    {dept.name}
                  </option>
                ))}
              </select>

              <select
                name="classId"
                value={filters.classId}
                onChange={handleChange}
                className="min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">All Classes</option>

                {classes.map((cls) => (
                  <option key={cls._id} value={cls._id}>
                    {cls.name || cls.className}
                  </option>
                ))}
              </select>

              <select
                name="subjectId"
                value={filters.subjectId}
                onChange={handleChange}
                className="min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">All Subjects</option>

                {subjects.map((subject) => (
                  <option key={subject._id} value={subject._id}>
                    {subject.name} ({subject.code})
                  </option>
                ))}
              </select>

              <input
                type="date"
                name="startDate"
                value={filters.startDate}
                onChange={handleChange}
                className="min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <input
                type="date"
                name="endDate"
                value={filters.endDate}
                onChange={handleChange}
                className="min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
<div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center lg:col-span-3">
                <button
                  type="button"
                  onClick={handleApplyFilters}
className="w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 sm:w-auto"
                >
                  Apply
                </button>

                <button
                  type="button"
                  onClick={handleResetFilters}
className="w-full rounded-xl bg-slate-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 sm:w-auto"
                >
                  Reset
                </button>


<button
  type="button"
  onClick={handleExcelExport}
className="w-full rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 sm:w-auto"
>
  Excel
</button>


<button
  type="button"
  onClick={handlePDFExport}
className="w-full rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 sm:w-auto"
>
  PDF
</button>




<button
  type="button"
  onClick={handleStudentExcelExport}
className="w-full rounded-xl bg-violet-600 px-3 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 sm:w-auto"
>
  Student Excel
</button>

<button
  type="button"
  onClick={handleTeacherExcelExport}
className="w-full rounded-xl bg-orange-600 px-3 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-700 sm:w-auto"
>
  Teacher Excel
</button>

<button
  type="button"
  onClick={handlePrintReport}
className="w-full rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-black sm:w-auto"
>
  Print
</button>
              </div>
            </div>
          </div>

         <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

<div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 p-4 text-white shadow-lg shadow-blue-200/60 sm:p-6">

<h2 className="text-lg">Students</h2>

<p className="mt-2 text-3xl font-bold sm:text-4xl">
{students.length}
</p>

</div>

<div className="rounded-2xl bg-gradient-to-br from-emerald-600 to-green-600 p-4 text-white shadow-lg shadow-emerald-200/60 sm:p-6">

<h2 className="text-lg">Teachers</h2>

<p className="mt-2 text-3xl font-bold sm:text-4xl">
{teachers.length}
</p>

</div>

<div className="rounded-2xl bg-gradient-to-br from-red-600 to-rose-600 p-4 text-white shadow-lg shadow-red-200/60 sm:p-6">

<h2 className="text-lg">Absent</h2>

<p className="mt-2 text-3xl font-bold sm:text-4xl">
{summary.absent}
</p>

</div>

<div className="rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 p-4 text-white shadow-lg shadow-amber-200/60 sm:p-6">

<h2 className="text-lg">Attendance %</h2>

<p className="mt-2 text-3xl font-bold sm:text-4xl">
{summary.percentage}%
</p>

</div>

</div>





























          {/* Attendance Table */}
          <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <h2 className="p-4 text-lg font-extrabold tracking-tight text-slate-900 sm:p-5 sm:text-xl">
              Attendance Report
            </h2>

            <table className="w-full min-w-[760px] border-separate border-spacing-0 text-sm">
              <thead>
                <tr className="bg-slate-100 text-left text-slate-600">
                  <th className="border-b border-r border-slate-200 px-4 py-3 first:border-l">Student</th>
                  <th className="border-b border-r border-slate-200 px-4 py-3 first:border-l">Class</th>
                  <th className="border-b border-r border-slate-200 px-4 py-3 first:border-l">Subject</th>
                  <th className="border-b border-r border-slate-200 px-4 py-3 first:border-l">Date</th>
                  <th className="border-b border-r border-slate-200 px-4 py-3 first:border-l">Status</th>
                </tr>
              </thead>

              <tbody>
                {attendance.length > 0 ? (
                  attendance.map((item) => (
                    <tr key={item._id} className="transition hover:bg-slate-50">
                      <td className="border-b border-r border-slate-200 px-4 py-3 first:border-l">
                        {item.student?.name ||
                          item.student?.fullName ||
                          item.student?.studentName ||
                          "N/A"}
                      </td>

                      <td className="border-b border-r border-slate-200 px-4 py-3 first:border-l">
                        {item.class?.name || item.class?.className || "N/A"}
                      </td>

                      <td className="border-b border-r border-slate-200 px-4 py-3 first:border-l">
                        {item.subject?.name || "N/A"}
                      </td>

                      <td className="border-b border-r border-slate-200 px-4 py-3 first:border-l">{item.date}</td>

                      <td className="border-b border-r border-slate-200 px-4 py-3 first:border-l">{item.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="border-b border-l border-r border-slate-200 bg-slate-50 px-4 py-8 text-center text-slate-500"
                    >
                      No report data found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
         

         <div className="mt-10 grid grid-cols-1 gap-6 xl:grid-cols-2 xl:gap-8">

<div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

<h2 className="mb-5 text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">

Attendance Status

</h2>

<div className="overflow-x-auto rounded-xl bg-slate-50/70 p-2">
<ResponsiveContainer width="100%" minWidth={320} height={300}>

<PieChart>

<Pie

data={[

{

name:"Present",

value:summary.present,

},

{

name:"Absent",

value:summary.absent,

},

{

name:"Late",

value:summary.late,

},

]}

dataKey="value"

outerRadius={110}

label

>

{

[

summary.present,

summary.absent,

summary.late,

].map((entry,index)=>(

<Cell

key={index}

fill={COLORS[index]}

/>

))

}

</Pie>

<Tooltip/>

<Legend/>

</PieChart>

</ResponsiveContainer>
</div>

</div>

<div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

<h2 className="mb-5 text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">

Attendance Overview

</h2>

<div className="overflow-x-auto rounded-xl bg-slate-50/70 p-2">
<ResponsiveContainer width="100%" minWidth={320} height={300}>

<BarChart

data={[

{

name:"Present",

count:summary.present,

},

{

name:"Absent",

count:summary.absent,

},

{

name:"Late",

count:summary.late,

},

]}

>

<XAxis dataKey="name"/>

<YAxis/>

<Tooltip/>

<Bar

dataKey="count"

fill="#2563eb"

/>

</BarChart>

</ResponsiveContainer>
</div>

</div>

</div>


          {/* Student Report */}
          <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <h2 className="p-4 text-lg font-extrabold tracking-tight text-slate-900 sm:p-5 sm:text-xl">
              Student Report
            </h2>

            <table className="w-full min-w-[700px] border-separate border-spacing-0 text-sm">
              <thead>
                <tr className="bg-slate-100 text-left text-slate-600">
                  <th className="border-b border-r border-slate-200 px-4 py-3 first:border-l">Student</th>
                  <th className="border-b border-r border-slate-200 px-4 py-3 first:border-l">Roll No</th>
                  <th className="border-b border-r border-slate-200 px-4 py-3 first:border-l">Class</th>
                  <th className="border-b border-r border-slate-200 px-4 py-3 first:border-l">Department</th>
                </tr>
              </thead>

              <tbody>
                {students.length > 0 ? (
                  students.map((student) => (
                    <tr key={student._id} className="transition hover:bg-slate-50">
                      <td className="border-b border-r border-slate-200 px-4 py-3 first:border-l">
                        {student.name ||
                          student.fullName ||
                          student.studentName ||
                          "N/A"}
                      </td>

                      <td className="border-b border-r border-slate-200 px-4 py-3 first:border-l">
                        {student.rollNo || student.rollNumber || "N/A"}
                      </td>

                      <td className="border-b border-r border-slate-200 px-4 py-3 first:border-l">
                        {student.class?.name ||
                          student.class?.className ||
                          "N/A"}
                      </td>

                      <td className="border-b border-r border-slate-200 px-4 py-3 first:border-l">
                       {student.department?.name ||
  student.class?.department?.name ||
  student.class?.department ||
  "N/A"}
                      </td>
                    </tr>

                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="border-b border-l border-r border-slate-200 bg-slate-50 px-4 py-8 text-center text-slate-500"
                    >
                      No student data found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Teacher Report */}
          <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <h2 className="p-4 text-lg font-extrabold tracking-tight text-slate-900 sm:p-5 sm:text-xl">
              Teacher Report
            </h2>

            <table className="w-full min-w-[720px] border-separate border-spacing-0 text-sm">
              <thead>
                <tr className="bg-slate-100 text-left text-slate-600">
                  <th className="border-b border-r border-slate-200 px-4 py-3 first:border-l">Teacher</th>
                  <th className="border-b border-r border-slate-200 px-4 py-3 first:border-l">Email</th>
                  <th className="border-b border-r border-slate-200 px-4 py-3 first:border-l">Phone</th>
                  <th className="border-b border-r border-slate-200 px-4 py-3 first:border-l">Department</th>
                </tr>
              </thead>

              <tbody>
                {teachers.length > 0 ? (
                  teachers.map((teacher) => (
                    <tr key={teacher._id} className="transition hover:bg-slate-50">
                      <td className="border-b border-r border-slate-200 px-4 py-3 first:border-l">
                        {teacher.name ||
                          teacher.fullName ||
                          teacher.teacherName ||
                          "N/A"}
                      </td>

                      <td className="border-b border-r border-slate-200 px-4 py-3 first:border-l">
                        {teacher.email || "N/A"}
                      </td>

                      <td className="border-b border-r border-slate-200 px-4 py-3 first:border-l">
                        {teacher.phone || "N/A"}
                      </td>

                      <td className="border-b border-r border-slate-200 px-4 py-3 first:border-l">
                      {teacher.department?.name ||
  teacher.department ||
  "N/A"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="border-b border-l border-r border-slate-200 bg-slate-50 px-4 py-8 text-center text-slate-500"
                    >
                      No teacher data found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Reports;