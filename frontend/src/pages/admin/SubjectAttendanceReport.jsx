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
    <div className="flex min-h-screen min-w-0 bg-slate-100">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />

        <section className="p-4 sm:p-6 lg:p-8">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
              Reports
            </p>

            <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Subject Attendance Report
            </h1>

            <p className="mt-2 text-slate-600">
              View attendance records and summary for an individual subject.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[minmax(0,1fr)_auto] sm:p-6">
            <select
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
              className="min-w-0 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
              className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
            >
              Search
            </button>
          </div>

          {summary && (
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md sm:p-5">
                <p className="text-sm font-semibold text-slate-500">Total</p>
                <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
                  {summary.total}
                </h2>
              </div>

              <div className="rounded-2xl border border-emerald-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-5">
                <p className="text-sm font-semibold text-slate-500">Present</p>
                <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-emerald-600">
                  {summary.present}
                </h2>
              </div>

              <div className="rounded-2xl border border-red-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-5">
                <p className="text-sm font-semibold text-slate-500">Absent</p>
                <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-red-600">
                  {summary.absent}
                </h2>
              </div>

              <div className="rounded-2xl border border-amber-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-5">
                <p className="text-sm font-semibold text-slate-500">Late</p>
                <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-amber-600">
                  {summary.late}
                </h2>
              </div>

              <div className="rounded-2xl border border-violet-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:col-span-2 sm:p-5 lg:col-span-1">
                <p className="text-sm font-semibold text-slate-500">
                  Percentage
                </p>
                <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-violet-600">
                  {summary.percentage}%
                </h2>
              </div>
            </div>
          )}

          <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full min-w-[640px] border-separate border-spacing-0 text-sm">
              <thead>
                <tr className="bg-slate-100 text-left text-slate-600">
                  <th className="border-b border-r border-slate-200 px-4 py-3 first:border-l">
                    Student
                  </th>
                  <th className="border-b border-r border-slate-200 px-4 py-3">
                    Class
                  </th>
                  <th className="border-b border-r border-slate-200 px-4 py-3">
                    Date
                  </th>
                  <th className="border-b border-r border-slate-200 px-4 py-3">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {attendance.length > 0 ? (
                  attendance.map((item) => (
                    <tr
                      key={item._id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="border-b border-r border-slate-200 px-4 py-3 first:border-l">
                        {item.student?.name ||
                          item.student?.fullName ||
                          item.student?.studentName ||
                          "N/A"}
                      </td>

                      <td className="border-b border-r border-slate-200 px-4 py-3 text-slate-600">
                        {item.class?.name || "N/A"}
                      </td>

                      <td className="border-b border-r border-slate-200 px-4 py-3 text-slate-600">
                        {item.date}
                      </td>

                      <td className="border-b border-r border-slate-200 px-4 py-3">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            item.status === "Present"
                              ? "bg-emerald-100 text-emerald-700"
                              : item.status === "Absent"
                              ? "bg-red-100 text-red-700"
                              : item.status === "Late"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="border-b border-l border-r border-slate-200 bg-slate-50 px-4 py-8 text-center text-slate-500"
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