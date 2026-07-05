import { useEffect, useState } from "react";

import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";

import { getSubjects } from "../../services/subjectService";
import { getSubjectAttendanceReport } from "../../services/attendanceService";

function SubjectAttendanceReport() {
  const [subjects, setSubjects] = useState([]);
  const [subjectId, setSubjectId] = useState("");
  const [attendance, setAttendance] = useState([]);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    const res = await getSubjects();
    setSubjects(res.data.subjects || res.data || []);
  };

  const handleSearch = async () => {
    if (!subjectId) {
      alert("Please select subject");
      return;
    }

    const res = await getSubjectAttendanceReport(subjectId);
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
            Subject Attendance Report
          </h1>

          <div className="mt-6 flex gap-4 rounded-lg bg-white p-5 shadow">
            <select
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
              className="w-full rounded border px-4 py-2 outline-none"
            >
              <option value="">Select Subject</option>

              {subjects.map((subject) => (
                <option key={subject._id} value={subject._id}>
                  {subject.name} ({subject.code})
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
                  <th className="border px-4 py-2">Student</th>
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
  {item.student?.name ||
    item.student?.fullName ||
    item.student?.studentName ||
    "N/A"}
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

export default SubjectAttendanceReport;