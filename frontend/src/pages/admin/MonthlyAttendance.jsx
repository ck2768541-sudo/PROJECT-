import { useEffect, useState } from "react";

import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";

import { getClasses } from "../../services/classService";
import { getSubjects } from "../../services/subjectService";
import { getMonthlyAttendance } from "../../services/attendanceService";

function MonthlyAttendance() {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [attendance, setAttendance] = useState([]);

  const [classId, setClassId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    fetchClasses();
    fetchSubjects();
  }, []);

  const fetchClasses = async () => {
    const res = await getClasses();
    setClasses(res.data.classes || res.data || []);
  };

  const fetchSubjects = async () => {
    const res = await getSubjects();
    setSubjects(res.data.subjects || res.data || []);
  };

  const handleSearch = async () => {
    const res = await getMonthlyAttendance({
      month,
      year,
      classId,
      subjectId,
    });

    setAttendance(res.data.attendance || []);
  };

  const total = attendance.length;
  const present = attendance.filter((item) => item.status === "Present").length;
  const absent = attendance.filter((item) => item.status === "Absent").length;
  const late = attendance.filter((item) => item.status === "Late").length;

  const percentage = total > 0 ? Math.round((present / total) * 100) : 0;

  return (
    <div className="flex min-h-screen min-w-0 bg-slate-100">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />

        <section className="p-4 sm:p-6 lg:p-8">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
              Attendance
            </p>

            <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Monthly Attendance
            </h1>

            <p className="mt-2 text-slate-600">
              View monthly attendance summary.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-2 sm:p-6 lg:grid-cols-3 xl:grid-cols-5">
            <select
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
              className="min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="">All Classes</option>
              {classes.map((cls) => (
                <option key={cls._id} value={cls._id}>
                  {cls.name}
                </option>
              ))}
            </select>

            <select
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
              className="min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="">All Subjects</option>
              {subjects.map((subject) => (
                <option key={subject._id} value={subject._id}>
                  {subject.name}
                </option>
              ))}
            </select>

            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>

            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <button
              onClick={handleSearch}
              className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-span-2 lg:col-span-1"
            >
              Search
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md sm:p-5">
              <p className="text-sm font-semibold text-slate-500">Total</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
                {total}
              </h2>
            </div>

            <div className="rounded-2xl border border-emerald-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-5">
              <p className="text-sm font-semibold text-slate-500">Present</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-emerald-600">
                {present}
              </h2>
            </div>

            <div className="rounded-2xl border border-red-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-5">
              <p className="text-sm font-semibold text-slate-500">Absent</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-red-600">
                {absent}
              </h2>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-5">
              <p className="text-sm font-semibold text-slate-500">Late</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-amber-600">
                {late}
              </h2>
            </div>

            <div className="rounded-2xl border border-violet-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:col-span-2 sm:p-5 lg:col-span-1">
              <p className="text-sm font-semibold text-slate-500">
                Attendance %
              </p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-violet-600">
                {percentage}%
              </h2>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full min-w-[760px] border-separate border-spacing-0 text-sm">
              <thead>
                <tr className="bg-slate-100 text-left text-slate-600">
                  <th className="border-b border-r border-slate-200 px-4 py-3 first:border-l">
                    Student
                  </th>
                  <th className="border-b border-r border-slate-200 px-4 py-3">
                    Class
                  </th>
                  <th className="border-b border-r border-slate-200 px-4 py-3">
                    Subject
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
                        {item.subject?.name || "N/A"}
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
                      colSpan="5"
                      className="border-b border-l border-r border-slate-200 bg-slate-50 px-4 py-8 text-center text-slate-500"
                    >
                      No monthly attendance records found.
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

export default MonthlyAttendance;