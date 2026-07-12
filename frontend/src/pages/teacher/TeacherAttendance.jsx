import { useEffect, useMemo, useState } from "react";
import {
  getTeacherAttendanceData,
  markAttendance,
} from "../../services/attendanceService";

function TeacherAttendance() {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);

  const [classId, setClassId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [attendanceData, setAttendanceData] = useState({});
  const [remarksData, setRemarksData] = useState({});

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadTeacherAttendanceData = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getTeacherAttendanceData();

      setClasses(response.data.classes || []);
      setSubjects(response.data.subjects || []);
      setStudents(response.data.students || []);
    } catch (error) {
      console.log("Teacher attendance data error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load teacher attendance data"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeacherAttendanceData();
  }, []);

  const filteredSubjects = useMemo(() => {
    if (!classId) return [];

    return subjects.filter((subject) => {
      const subjectClassId =
        subject.class?._id || subject.class;

      return subjectClassId === classId;
    });
  }, [subjects, classId]);

  const filteredStudents = useMemo(() => {
    if (!classId) return [];

    return students.filter((student) => {
      const studentClassId =
        student.class?._id || student.class;

      return studentClassId === classId;
    });
  }, [students, classId]);

  useEffect(() => {
    setSubjectId("");
    setAttendanceData({});
    setRemarksData({});
    setMessage("");
  }, [classId]);

  useEffect(() => {
    const initialAttendance = {};

    filteredStudents.forEach((student) => {
      initialAttendance[student._id] = "Present";
    });

    setAttendanceData(initialAttendance);
    setRemarksData({});
  }, [filteredStudents]);

  const handleStatusChange = (studentId, status) => {
    setAttendanceData((previousData) => ({
      ...previousData,
      [studentId]: status,
    }));
  };

  const handleRemarksChange = (studentId, remarks) => {
    setRemarksData((previousData) => ({
      ...previousData,
      [studentId]: remarks,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    if (!classId || !subjectId || !date) {
      setError("Class, subject and date are required.");
      return;
    }

    if (filteredStudents.length === 0) {
      setError("No active students found in this class.");
      return;
    }

    const records = filteredStudents.map((student) => ({
      student: student._id,
      class: classId,
      subject: subjectId,
      date,
      status: attendanceData[student._id] || "Present",
      remarks: remarksData[student._id] || "",
    }));

    try {
      setSaving(true);

      const response = await markAttendance({ records });

      setMessage(
        response.data?.message ||
          "Attendance marked successfully"
      );
    } catch (error) {
      console.log("Attendance save error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to save attendance"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-gray-100 p-8">
        <p className="text-gray-600">
          Loading attendance data...
        </p>
      </section>
    );
  }

  if (error && classes.length === 0) {
    return (
      <section className="min-h-screen bg-gray-100 p-8">
        <div className="rounded-xl bg-white p-6 shadow">
          <h1 className="text-2xl font-bold text-red-600">
            Attendance Error
          </h1>

          <p className="mt-3 text-gray-700">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-100 p-8">
      <div className="rounded-xl bg-white p-6 shadow">
        <h1 className="text-3xl font-bold text-gray-900">
          Mark Attendance
        </h1>

        <p className="mt-2 text-gray-600">
          Select your assigned class and subject, then mark
          student attendance.
        </p>

        {message && (
          <div className="mt-6 rounded-lg border border-green-300 bg-green-50 p-4 text-green-700">
            {message}
          </div>
        )}

        {error && (
          <div className="mt-6 rounded-lg border border-red-300 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <select
              value={classId}
              onChange={(event) =>
                setClassId(event.target.value)
              }
              className="rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
              required
            >
              <option value="">Select Assigned Class</option>

              {classes.map((classItem) => (
                <option
                  key={classItem._id}
                  value={classItem._id}
                >
                  {classItem.name}
                  {classItem.section
                    ? ` - Section ${classItem.section}`
                    : ""}
                </option>
              ))}
            </select>

            <select
              value={subjectId}
              onChange={(event) =>
                setSubjectId(event.target.value)
              }
              className="rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
              required
              disabled={!classId}
            >
              <option value="">
                {classId
                  ? "Select Assigned Subject"
                  : "Select Class First"}
              </option>

              {filteredSubjects.map((subject) => (
                <option
                  key={subject._id}
                  value={subject._id}
                >
                  {subject.name} ({subject.code})
                </option>
              ))}
            </select>

            <input
              type="date"
              value={date}
              onChange={(event) =>
                setDate(event.target.value)
              }
              className="rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
              required
            />
          </div>

          <div className="mt-8 overflow-x-auto rounded-xl border">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-3">Roll Number</th>
                  <th className="border p-3">Student Name</th>
                  <th className="border p-3">Status</th>
                  <th className="border p-3">Remarks</th>
                </tr>
              </thead>

              <tbody>
                {!classId ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="border p-6 text-center text-gray-500"
                    >
                      Select a class to load students.
                    </td>
                  </tr>
                ) : filteredStudents.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="border p-6 text-center text-gray-500"
                    >
                      No active students found in this class.
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student) => (
                    <tr key={student._id}>
                      <td className="border p-3">
                        {student.rollNumber || "N/A"}
                      </td>

                      <td className="border p-3 font-medium">
                        {student.fullName || "N/A"}
                      </td>

                      <td className="border p-3">
                        <select
                          value={
                            attendanceData[student._id] ||
                            "Present"
                          }
                          onChange={(event) =>
                            handleStatusChange(
                              student._id,
                              event.target.value
                            )
                          }
                          className="w-full rounded border px-3 py-2 outline-none"
                        >
                          <option value="Present">
                            Present
                          </option>
                          <option value="Absent">
                            Absent
                          </option>
                          <option value="Late">Late</option>
                        </select>
                      </td>

                      <td className="border p-3">
                        <input
                          type="text"
                          value={
                            remarksData[student._id] || ""
                          }
                          onChange={(event) =>
                            handleRemarksChange(
                              student._id,
                              event.target.value
                            )
                          }
                          placeholder="Optional remarks"
                          className="w-full rounded border px-3 py-2 outline-none"
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <button
            type="submit"
            disabled={
              saving ||
              !classId ||
              !subjectId ||
              filteredStudents.length === 0
            }
            className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            {saving
              ? "Saving Attendance..."
              : "Save Attendance"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default TeacherAttendance;