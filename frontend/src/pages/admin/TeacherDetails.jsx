import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";
import { getTeacherById } from "../../services/teacherService";

function TeacherDetails() {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [message, setMessage] = useState("Loading teacher...");

  useEffect(() => {
    const loadTeacher = async () => {
      try {
        const response = await getTeacherById(id);
        setTeacher(response.data);
        setMessage("");
      } catch {
        setMessage("Teacher not found ❌");
      }
    };

    loadTeacher();
  }, [id]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1">
        <Topbar />

        <section className="p-8">
          <Link to="/admin/teachers" className="text-blue-600">
            ← Back to Teachers
          </Link>

          <h1 className="mt-4 text-3xl font-bold">Teacher Profile</h1>

          {message && (
            <p className="mt-6 rounded-xl bg-white p-6 shadow">{message}</p>
          )}

          {teacher && (
            <div className="mt-8 rounded-xl bg-white p-8 shadow">
              <h2 className="text-2xl font-bold">{teacher.fullName}</h2>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <p><b>Email:</b> {teacher.email || "N/A"}</p>
                <p><b>Phone:</b> {teacher.phone || "N/A"}</p>
                <p><b>Gender:</b> {teacher.gender}</p>
                <p><b>Department:</b> {teacher.department || "N/A"}</p>
                <p><b>Qualification:</b> {teacher.qualification || "N/A"}</p>
                <p>
                  <b>Subjects:</b>{" "}
                  {teacher.subjects?.length ? teacher.subjects.join(", ") : "N/A"}
                </p>
              </div>

              <div className="mt-6">
                <h3 className="text-xl font-bold">Assigned Classes</h3>

                <div className="mt-3 space-y-2">
                  {teacher.assignedClasses?.length === 0 ? (
                    <p className="text-gray-500">No classes assigned.</p>
                  ) : (
                    teacher.assignedClasses.map((cls) => (
                      <div key={cls._id} className="rounded-lg border p-3">
                        {cls.name} - Section {cls.section}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default TeacherDetails;