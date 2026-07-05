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
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Topbar />

        <section className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Monthly Attendance
          </h1>

          <p className="mt-1 text-gray-500">
            View monthly attendance summary.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 rounded-lg bg-white p-5 shadow md:grid-cols-5">
            <select
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
              className="rounded border px-4 py-2 outline-none"
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
              className="rounded border px-4 py-2 outline-none"
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
              className="rounded border px-4 py-2 outline-none"
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
              className="rounded border px-4 py-2 outline-none"
            />

            <button
              onClick={handleSearch}
              className="rounded bg-blue-600 px-5 py-2 text-white"
            >
              Search
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-5">
            <div className="rounded-lg bg-white p-5 shadow">
              <p className="text-gray-500">Total</p>
              <h2 className="mt-2 text-3xl font-bold">{total}</h2>
            </div>

            <div className="rounded-lg bg-white p-5 shadow">
              <p className="text-gray-500">Present</p>
              <h2 className="mt-2 text-3xl font-bold">{present}</h2>
            </div>

            <div className="rounded-lg bg-white p-5 shadow">
              <p className="text-gray-500">Absent</p>
              <h2 className="mt-2 text-3xl font-bold">{absent}</h2>
            </div>

            <div className="rounded-lg bg-white p-5 shadow">
              <p className="text-gray-500">Late</p>
              <h2 className="mt-2 text-3xl font-bold">{late}</h2>
            </div>

            <div className="rounded-lg bg-white p-5 shadow">
              <p className="text-gray-500">Attendance %</p>
              <h2 className="mt-2 text-3xl font-bold">{percentage}%</h2>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto rounded-lg bg-white shadow">
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
                        {item.class?.name || "N/A"}
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