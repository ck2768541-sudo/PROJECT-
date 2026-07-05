import { useEffect, useState } from "react";

import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";

import {
  getAttendance,
  updateAttendance,
  deleteAttendance,
} from "../../services/attendanceService";

function AttendanceHistory() {
  const [attendance, setAttendance] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const res = await getAttendance();
      setAttendance(res.data.attendance || []);
    } catch (error) {
      console.log("Attendance history fetch error:", error);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateAttendance(id, { status });
      fetchAttendance();
    } catch (error) {
      console.log("Attendance update error:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this attendance record?"
    );

    if (!confirmDelete) return;

    try {
      await deleteAttendance(id);
      fetchAttendance();
    } catch (error) {
      console.log("Attendance delete error:", error);
    }
  };

  const total = attendance.length;
  const present = attendance.filter((a) => a.status === "Present").length;
  const absent = attendance.filter((a) => a.status === "Absent").length;
  const late = attendance.filter((a) => a.status === "Late").length;
  const percentage = total > 0 ? Math.round((present / total) * 100) : 0;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Topbar />

        <section className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Attendance History
          </h1>

          <p className="mt-1 text-gray-500">
            View, update and delete attendance records.
          </p>

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
              <p className="text-gray-500">Percentage</p>
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
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>

              <tbody>
                {attendance.length > 0 ? (
                  attendance.map((item) => (
                    <tr key={item._id}>
                     <td className="border px-4 py-2">
  {item.student?.name || item.student?.fullName || item.student?.studentName || "N/A"}
</td>

                      <td className="border px-4 py-2">
                        {item.class?.name || "N/A"}
                      </td>

                      <td className="border px-4 py-2">
                        {item.subject?.name || "N/A"}
                      </td>

                      <td className="border px-4 py-2">{item.date}</td>

                      <td className="border px-4 py-2">
                        <select
                          value={item.status}
                          onChange={(e) =>
                            handleStatusUpdate(item._id, e.target.value)
                          }
                          className="rounded border px-3 py-1 outline-none"
                        >
                          <option value="Present">Present</option>
                          <option value="Absent">Absent</option>
                          <option value="Late">Late</option>
                        </select>
                      </td>

                      <td className="border px-4 py-2">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSelectedRecord(item)}
                            className="rounded bg-green-600 px-3 py-1 text-white"
                          >
                            View
                          </button>

                          <button
                            onClick={() => handleDelete(item._id)}
                            className="rounded bg-red-600 px-3 py-1 text-white"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="border px-4 py-6 text-center text-gray-500"
                    >
                      No attendance records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {selectedRecord && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800">
                  Attendance Details
                </h2>

                <div className="mt-4 space-y-2">
                  <p>
                    <b>Student:</b> {selectedRecord.student?.name || "N/A"}
                  </p>

                  <p>
                    <b>Class:</b> {selectedRecord.class?.name || "N/A"}
                  </p>

                  <p>
                    <b>Subject:</b> {selectedRecord.subject?.name || "N/A"}
                  </p>

                  <p>
                    <b>Date:</b> {selectedRecord.date}
                  </p>

                  <p>
                    <b>Status:</b> {selectedRecord.status}
                  </p>

                  <p>
                    <b>Remarks:</b>{" "}
                    {selectedRecord.remarks || "No remarks available"}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedRecord(null)}
                  className="mt-6 rounded bg-gray-800 px-5 py-2 text-white"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default AttendanceHistory;