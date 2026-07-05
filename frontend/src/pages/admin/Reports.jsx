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
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Topbar />

        <section className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Reports Dashboard
          </h1>

          <p className="mt-1 text-gray-500">
            View student, teacher and attendance reports with filters.
          </p>

          {/* Dashboard Cards */}
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="rounded-lg bg-white p-5 shadow">
              <p className="text-gray-500">Total Students</p>
              <h2 className="mt-2 text-3xl font-bold">{students.length}</h2>
            </div>

            <div className="rounded-lg bg-white p-5 shadow">
              <p className="text-gray-500">Total Teachers</p>
              <h2 className="mt-2 text-3xl font-bold">{teachers.length}</h2>
            </div>

            <div className="rounded-lg bg-white p-5 shadow">
              <p className="text-gray-500">Attendance Records</p>
              <h2 className="mt-2 text-3xl font-bold">{summary.total}</h2>
            </div>

            <div className="rounded-lg bg-white p-5 shadow">
              <p className="text-gray-500">Attendance %</p>
              <h2 className="mt-2 text-3xl font-bold">
                {summary.percentage}%
              </h2>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="rounded-lg bg-white p-5 shadow">
              <p className="text-gray-500">Present</p>
              <h2 className="mt-2 text-3xl font-bold">{summary.present}</h2>
            </div>

            <div className="rounded-lg bg-white p-5 shadow">
              <p className="text-gray-500">Absent</p>
              <h2 className="mt-2 text-3xl font-bold">{summary.absent}</h2>
            </div>

            <div className="rounded-lg bg-white p-5 shadow">
              <p className="text-gray-500">Late</p>
              <h2 className="mt-2 text-3xl font-bold">{summary.late}</h2>
            </div>

            <div className="rounded-lg bg-white p-5 shadow">
              <p className="text-gray-500">Report Status</p>
              <h2 className="mt-2 text-2xl font-bold text-green-600">
                Active
              </h2>
            </div>
          </div>

          {/* Filters */}
          <div className="mt-6 rounded-lg bg-white p-5 shadow">
            <h2 className="text-xl font-bold text-gray-800">Report Filters</h2>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
              <select
                name="departmentId"
                value={filters.departmentId}
                onChange={handleChange}
                className="rounded border px-4 py-2 outline-none"
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
                className="rounded border px-4 py-2 outline-none"
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
                className="rounded border px-4 py-2 outline-none"
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
                className="rounded border px-4 py-2 outline-none"
              />

              <input
                type="date"
                name="endDate"
                value={filters.endDate}
                onChange={handleChange}
                className="rounded border px-4 py-2 outline-none"
              />

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleApplyFilters}
                  className="rounded bg-blue-600 px-5 py-2 text-white"
                >
                  Apply
                </button>

                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="rounded bg-gray-700 px-5 py-2 text-white"
                >
                  Reset
                </button>


<button
  type="button"
  onClick={handleExcelExport}
  className="rounded bg-green-600 px-5 py-2 text-white"
>
  Excel
</button>


<button
  type="button"
  onClick={handlePDFExport}
  className="rounded bg-red-600 px-5 py-2 text-white"
>
  PDF
</button>




<button
  type="button"
  onClick={handleStudentExcelExport}
  className="rounded bg-purple-600 px-5 py-2 text-white"
>
  Student Excel
</button>

<button
  type="button"
  onClick={handleTeacherExcelExport}
  className="rounded bg-orange-600 px-5 py-2 text-white"
>
  Teacher Excel
</button>

<button
  type="button"
  onClick={handlePrintReport}
  className="rounded bg-black px-5 py-2 text-white"
>
  Print
</button>
              </div>
            </div>
          </div>

         <div className="mt-8 grid md:grid-cols-4 gap-5">

<div className="bg-blue-600 rounded-xl p-6 text-white">

<h2 className="text-lg">Students</h2>

<p className="text-4xl font-bold mt-2">
{students.length}
</p>

</div>

<div className="bg-green-600 rounded-xl p-6 text-white">

<h2 className="text-lg">Teachers</h2>

<p className="text-4xl font-bold mt-2">
{teachers.length}
</p>

</div>

<div className="bg-red-600 rounded-xl p-6 text-white">

<h2 className="text-lg">Absent</h2>

<p className="text-4xl font-bold mt-2">
{summary.absent}
</p>

</div>

<div className="bg-yellow-500 rounded-xl p-6 text-white">

<h2 className="text-lg">Attendance %</h2>

<p className="text-4xl font-bold mt-2">
{summary.percentage}%
</p>

</div>

</div>





























          {/* Attendance Table */}
          <div className="mt-6 overflow-x-auto rounded-lg bg-white shadow">
            <h2 className="p-5 text-xl font-bold text-gray-800">
              Attendance Report
            </h2>

            <table className="w-full border">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="border px-4 py-2">Student</th>
                  <th className="border px-4 py-2">Class</th>
                  <th className="border px-4 py-2">Subject</th>
                  <th className="border px-4 py-2">Date</th>
                  <th className="border px-4 py-2">Status</th>
                </tr>
              </thead>

              <tbody>
                {attendance.length > 0 ? (
                  attendance.map((item) => (
                    <tr key={item._id}>
                      <td className="border px-4 py-2">
                        {item.student?.name ||
                          item.student?.fullName ||
                          item.student?.studentName ||
                          "N/A"}
                      </td>

                      <td className="border px-4 py-2">
                        {item.class?.name || item.class?.className || "N/A"}
                      </td>

                      <td className="border px-4 py-2">
                        {item.subject?.name || "N/A"}
                      </td>

                      <td className="border px-4 py-2">{item.date}</td>

                      <td className="border px-4 py-2">{item.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="border px-4 py-6 text-center text-gray-500"
                    >
                      No report data found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
         

         <div className="mt-10 grid lg:grid-cols-2 gap-8">

<div className="bg-white rounded-xl shadow p-5">

<h2 className="text-xl font-bold mb-5">

Attendance Status

</h2>

<ResponsiveContainer width="100%" height={300}>

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

<div className="bg-white rounded-xl shadow p-5">

<h2 className="text-xl font-bold mb-5">

Attendance Overview

</h2>

<ResponsiveContainer width="100%" height={300}>

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


          {/* Student Report */}
          <div className="mt-6 overflow-x-auto rounded-lg bg-white shadow">
            <h2 className="p-5 text-xl font-bold text-gray-800">
              Student Report
            </h2>

            <table className="w-full border">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="border px-4 py-2">Student</th>
                  <th className="border px-4 py-2">Roll No</th>
                  <th className="border px-4 py-2">Class</th>
                  <th className="border px-4 py-2">Department</th>
                </tr>
              </thead>

              <tbody>
                {students.length > 0 ? (
                  students.map((student) => (
                    <tr key={student._id}>
                      <td className="border px-4 py-2">
                        {student.name ||
                          student.fullName ||
                          student.studentName ||
                          "N/A"}
                      </td>

                      <td className="border px-4 py-2">
                        {student.rollNo || student.rollNumber || "N/A"}
                      </td>

                      <td className="border px-4 py-2">
                        {student.class?.name ||
                          student.class?.className ||
                          "N/A"}
                      </td>

                      <td className="border px-4 py-2">
                        {student.department?.name || "N/A"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="border px-4 py-6 text-center text-gray-500"
                    >
                      No student data found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Teacher Report */}
          <div className="mt-6 overflow-x-auto rounded-lg bg-white shadow">
            <h2 className="p-5 text-xl font-bold text-gray-800">
              Teacher Report
            </h2>

            <table className="w-full border">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="border px-4 py-2">Teacher</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Phone</th>
                  <th className="border px-4 py-2">Department</th>
                </tr>
              </thead>

              <tbody>
                {teachers.length > 0 ? (
                  teachers.map((teacher) => (
                    <tr key={teacher._id}>
                      <td className="border px-4 py-2">
                        {teacher.name ||
                          teacher.fullName ||
                          teacher.teacherName ||
                          "N/A"}
                      </td>

                      <td className="border px-4 py-2">
                        {teacher.email || "N/A"}
                      </td>

                      <td className="border px-4 py-2">
                        {teacher.phone || "N/A"}
                      </td>

                      <td className="border px-4 py-2">
                        {teacher.department?.name || "N/A"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="border px-4 py-6 text-center text-gray-500"
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