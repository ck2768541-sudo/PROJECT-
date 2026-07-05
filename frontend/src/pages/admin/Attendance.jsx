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
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Topbar />

        <section className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Mark Attendance
          </h1>

          <p className="mt-1 text-gray-500">
            Mark daily student attendance by class and subject.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-6 rounded-lg bg-white p-5 shadow"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <select
                value={selectedClass}
                onChange={(e) => {
                  setSelectedClass(e.target.value);
                  setAttendanceData({});
                }}
                className="rounded border px-4 py-2 outline-none"
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
                className="rounded border px-4 py-2 outline-none"
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
                className="rounded border px-4 py-2 outline-none"
                required
              />
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full border bg-white">
                <thead>
                  <tr className="bg-gray-200 text-left">
                    <th className="border px-4 py-2">Student Name</th>
                    <th className="border px-4 py-2">Roll No</th>
                    <th className="border px-4 py-2">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <tr key={student._id}>
                      <td className="border px-4 py-2">
  {student.name || student.fullName || student.studentName || "N/A"}
</td>

                        <td className="border px-4 py-2">
                          {student.rollNo || student.rollNumber || "N/A"}
                        </td>

                        <td className="border px-4 py-2">
                          <select
                            value={attendanceData[student._id] || "Present"}
                            onChange={(e) =>
                              handleStatusChange(student._id, e.target.value)
                            }
                            className="rounded border px-3 py-1 outline-none"
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
                        className="border px-4 py-6 text-center text-gray-500"
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
              className="mt-5 rounded bg-blue-600 px-5 py-2 text-white"
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