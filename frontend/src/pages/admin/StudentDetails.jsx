import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";
import { getStudentById } from "../../services/studentService";

function StudentDetails() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [message, setMessage] = useState("Loading student...");

  useEffect(() => {
    const loadStudent = async () => {
      try {
        const response = await getStudentById(id);
        setStudent(response.data);
        setMessage("");
      } catch {
        setMessage("Student not found ❌");
      }
    };

    loadStudent();
  }, [id]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1">
        <Topbar />

        <section className="p-8">
          <Link to="/admin/students" className="text-blue-600">
            ← Back to Students
          </Link>

          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Student Profile
          </h1>

          {message && (
            <p className="mt-6 rounded-lg bg-white p-6 shadow">{message}</p>
          )}

          {student && (
            <div className="mt-8 rounded-xl bg-white p-8 shadow">
              <h2 className="text-2xl font-bold">{student.fullName}</h2>
              <p className="mt-2 text-gray-600">
                Roll Number: {student.rollNumber}
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <p><b>Gender:</b> {student.gender}</p>
                <p><b>Phone:</b> {student.phone || "N/A"}</p>
                <p><b>Email:</b> {student.email || "N/A"}</p>
                <p><b>Class:</b> {student.class?.name || "N/A"}</p>
                <p><b>Section:</b> {student.class?.section || "N/A"}</p>
                <p><b>Department:</b> {student.class?.department || "N/A"}</p>
                <p><b>Academic Year:</b> {student.class?.academicYear || "N/A"}</p>
                <p>
                  <b>Joined:</b>{" "}
                  {new Date(student.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default StudentDetails;