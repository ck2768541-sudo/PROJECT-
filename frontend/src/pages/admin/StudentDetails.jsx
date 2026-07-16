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
    <div className="flex min-h-screen min-w-0 bg-slate-100">
      <Sidebar />

      <main className="min-w-0 flex-1">
        <Topbar />

        <section className="p-4 sm:p-6 lg:p-8">
          <Link
            to="/admin/students"
            className="inline-flex items-center rounded-lg px-1 py-1 text-sm font-semibold text-blue-600 transition hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 sm:text-base"
          >
            ← Back to Students
          </Link>

          <div className="mt-4 min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
              Student Details
            </p>

            <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Student Profile
            </h1>

            <p className="mt-2 text-slate-600">
              View complete student and academic information.
            </p>
          </div>

          {message && (
            <p className="mt-6 break-words rounded-2xl border border-slate-200 bg-white p-4 text-slate-600 shadow-sm sm:p-6">
              {message}
            </p>
          )}

          {student && (
            <div className="mt-6 min-w-0 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm sm:mt-8">
              <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-violet-700 p-5 text-white sm:p-6 lg:p-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl border border-white/30 bg-white/15 text-3xl font-bold shadow-lg backdrop-blur">
                    {student.fullName?.charAt(0)?.toUpperCase() || "S"}
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-medium text-blue-100">
                      Student
                    </p>

                    <h2 className="mt-1 break-words text-2xl font-bold sm:text-3xl">
                      {student.fullName}
                    </h2>

                    <p className="mt-2 break-words text-blue-100">
                      Roll Number: {student.rollNumber}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6 lg:p-8">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {[
                    ["Gender", student.gender],
                    ["Phone", student.phone || "N/A"],
                    ["Email", student.email || "N/A"],
                    ["Class", student.class?.name || "N/A"],
                    ["Section", student.class?.section || "N/A"],
                    ["Department", student.class?.department || "N/A"],
                    [
                      "Academic Year",
                      student.class?.academicYear || "N/A",
                    ],
                    [
                      "Joined",
                      new Date(student.createdAt).toLocaleDateString(),
                    ],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 transition hover:border-blue-200 hover:bg-blue-50/40"
                    >
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        {label}
                      </p>

                      <p
                        className={`mt-2 font-semibold text-slate-800 ${
                          label === "Email"
                            ? "break-all"
                            : "break-words"
                        }`}
                      >
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default StudentDetails;