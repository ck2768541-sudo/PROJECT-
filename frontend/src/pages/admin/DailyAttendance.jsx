import { useEffect, useState } from "react";

import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";

import { getClasses } from "../../services/classService";
import { getSubjects } from "../../services/subjectService";
import { getDailyAttendance } from "../../services/attendanceService";

function DailyAttendance() {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [attendance, setAttendance] = useState([]);

  const [classId, setClassId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    fetchClasses();
    fetchSubjects();
    setDate(new Date().toISOString().split("T")[0]);
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
    const res = await getDailyAttendance({
      classId,
      subjectId,
      date,
    });

    setAttendance(res.data.attendance || []);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Topbar />

        <section className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Daily Attendance
          </h1>

          <p className="mt-1 text-gray-500">
            View attendance by class, subject and date.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 rounded-lg bg-white p-5 shadow md:grid-cols-4">
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

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="rounded border px-4 py-2 outline-none"
            />

            <button
              onClick={handleSearch}
              className="rounded bg-blue-600 px-5 py-2 text-white"
            >
              Search
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="rounded-lg bg-white p-5 shadow">
              <p className="text-gray-500">Total Records</p>
              <h2 className="mt-2 text-3xl font-bold">{attendance.length}</h2>
            </div>

            <div className="rounded-lg bg-white p-5 shadow">
              <p className="text-gray-500">Present</p>
              <h2 className="mt-2 text-3xl font-bold">
                {attendance.filter((item) => item.status === "Present").length}
              </h2>
            </div>

            <div className="rounded-lg bg-white p-5 shadow">
              <p className="text-gray-500">Absent</p>
              <h2 className="mt-2 text-3xl font-bold">
                {attendance.filter((item) => item.status === "Absent").length}
              </h2>
            </div>

            <div className="rounded-lg bg-white p-5 shadow">
              <p className="text-gray-500">Late</p>
              <h2 className="mt-2 text-3xl font-bold">
                {attendance.filter((item) => item.status === "Late").length}
              </h2>
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
                      No attendance records found.
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

export default DailyAttendance;