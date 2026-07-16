import { useEffect, useState } from "react";

import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";

import { getStudents } from "../../services/studentService";
import { getClasses } from "../../services/classService";
import { getSubjects } from "../../services/subjectService";
import { markAttendance } from "../../services/attendanceService";

function Attendance() {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [date, setDate] = useState("");

  const [attendanceData, setAttendanceData] = useState({});

  useEffect(() => {
    fetchStudents();
    fetchClasses();
    fetchSubjects();

    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await getStudents();
      setStudents(res.data.students || res.data || []);
    } catch (error) {
      console.log("Student fetch error:", error);
    }
  };

  const fetchClasses = async () => {
    try {
      const res = await getClasses();
      setClasses(res.data.classes || res.data || []);
    } catch (error) {
      console.log("Class fetch error:", error);
    }
  };

  const fetchSubjects = async () => {
    try {
      const res = await getSubjects();
      setSubjects(res.data.subjects || res.data || []);
    } catch (error) {
      console.log("Subject fetch error:", error);
    }
  };

  const handleStatusChange = (studentId, status) => {
    setAttendanceData({
      ...attendanceData,
      [studentId]: status,
    });
  };

  const filteredStudents = selectedClass
    ? students.filter(
        (student) =>
          student.class?._id === selectedClass || student.class === selectedClass
      )
    : [];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedClass || !selectedSubject || !date) {
      alert("Please select class, subject and date");
      return;
    }

    if (filteredStudents.length === 0) {
      alert("No students found in this class");
      return;
    }

    const records = filteredStudents.map((student) => ({
      student: student._id,
      class: selectedClass,
      subject: selectedSubject,
      date,
      status: attendanceData[student._id] || "Present",
    }));

    try {
      await markAttendance({ records });
      alert("Attendance marked successfully");
      setAttendanceData({});
    } catch (error) {
      console.log("Attendance submit error:", error);
      alert("Attendance submit error");
    }
  };

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
              Mark Attendance
            </h1>

            <p className="mt-2 text-slate-600">
              Mark daily student attendance by class and subject.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6"
          >
            <h2 className="text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">
              Attendance Details
            </h2>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <select
                value={selectedClass}
                onChange={(e) => {
                  setSelectedClass(e.target.value);
                  setAttendanceData({});
                }}
                className="min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                required
              >
                <option value="">Select Class</option>

                {classes.map((cls) => (
                  <option key={cls._id} value={cls._id}>
                    {cls.name}
                  </option>
                ))}
              </select>

              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                required
              >
                <option value="">Select Subject</option>

                {subjects.map((subject) => (
                  <option key={subject._id} value={subject._id}>
                    {subject.name} ({subject.code})
                  </option>
                ))}
              </select>

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:col-span-2 lg:col-span-1"
                required
              />
            </div>

            <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full min-w-[640px] border-separate border-spacing-0 bg-white text-sm">
                <thead>
                  <tr className="bg-slate-100 text-left text-slate-600">
                    <th className="border-b border-r border-slate-200 px-4 py-3 first:border-l">
                      Student Name
                    </th>
                    <th className="border-b border-r border-slate-200 px-4 py-3">
                      Roll No
                    </th>
                    <th className="border-b border-r border-slate-200 px-4 py-3">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <tr
                        key={student._id}
                        className="transition hover:bg-slate-50"
                      >
                        <td className="border-b border-r border-slate-200 px-4 py-3 first:border-l">
                          {student.name ||
                            student.fullName ||
                            student.studentName ||
                            "N/A"}
                        </td>

                        <td className="border-b border-r border-slate-200 px-4 py-3 text-slate-600">
                          {student.rollNo || student.rollNumber || "N/A"}
                        </td>

                        <td className="border-b border-r border-slate-200 px-4 py-3">
                          <select
                            value={attendanceData[student._id] || "Present"}
                            onChange={(e) =>
                              handleStatusChange(student._id, e.target.value)
                            }
                            className="w-full min-w-[120px] rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          >
                            <option value="Present">Present</option>
                            <option value="Absent">Absent</option>
                            <option value="Late">Late</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="3"
                        className="border-b border-l border-r border-slate-200 bg-slate-50 px-4 py-8 text-center text-slate-500"
                      >
                        Please select a class to show students.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <button
              type="submit"
              className="mt-5 w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
            >
              Save Attendance
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Attendance;