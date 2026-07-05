import { useEffect, useState } from "react";

import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";

import { getStudents } from "../../services/studentService";
import { getStudentAttendanceReport } from "../../services/attendanceService";

function StudentAttendanceReport() {
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [attendance, setAttendance] = useState([]);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await getStudents();
    setStudents(res.data.students || res.data || []);
  };

  const handleSearch = async () => {
    if (!studentId) {
      alert("Please select student");
      return;
    }

    const res = await getStudentAttendanceReport(studentId);
    setAttendance(res.data.attendance || []);
    setSummary(res.data.summary);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Topbar />

        <section className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Student Attendance Report
          </h1>

          <div className="mt-6 flex gap-4 rounded-lg bg-white p-5 shadow">
            <select
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full rounded border px-4 py-2 outline-none"
            >
              <option value="">Select Student</option>

              {students.map((student) => (
               
<option key={student._id} value={student._id}>
  {student.name || student.fullName || student.studentName || "Unnamed Student"}
</option>

              ))}
            </select>

            <button
              onClick={handleSearch}
              className="rounded bg-blue-600 px-5 py-2 text-white"
            >
              Search
            </button>
          </div>

          {summary && (
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-5">
              <div className="rounded-lg bg-white p-5 shadow">
                <p>Total</p>
                <h2 className="text-3xl font-bold">{summary.total}</h2>
              </div>

              <div className="rounded-lg bg-white p-5 shadow">
                <p>Present</p>
                <h2 className="text-3xl font-bold">{summary.present}</h2>
              </div>

              <div className="rounded-lg bg-white p-5 shadow">
                <p>Absent</p>
                <h2 className="text-3xl font-bold">{summary.absent}</h2>
              </div>

              <div className="rounded-lg bg-white p-5 shadow">
                <p>Late</p>
                <h2 className="text-3xl font-bold">{summary.late}</h2>
              </div>

              <div className="rounded-lg bg-white p-5 shadow">
                <p>Percentage</p>
                <h2 className="text-3xl font-bold">{summary.percentage}%</h2>
              </div>
            </div>
          )}

          <div className="mt-6 overflow-x-auto rounded-lg bg-white shadow">
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="border px-4 py-2">Subject</th>
                  <th className="border px-4 py-2">Class</th>
                  <th className="border px-4 py-2">Date</th>
                  <th className="border px-4 py-2">Status</th>
                </tr>
              </thead>

              <tbody>
                {attendance.length > 0 ? (
                  attendance.map((item) => (
                    <tr key={item._id}>
                      <td className="border px-4 py-2">
                        {item.subject?.name || "N/A"}
                      </td>
                      <td className="border px-4 py-2">
                        {item.class?.name || "N/A"}
                      </td>
                      <td className="border px-4 py-2">{item.date}</td>
                      <td className="border px-4 py-2">{item.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="border px-4 py-6 text-center text-gray-500"
                    >
                      No report found.
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

export default StudentAttendanceReport;