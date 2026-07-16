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
    <div className="flex min-h-screen min-w-0 bg-slate-100">
      <Sidebar />

      <main className="min-w-0 flex-1">
        <Topbar />

        <section className="p-4 sm:p-6 lg:p-8">
          <Link
            to="/admin/teachers"
            className="inline-flex items-center rounded-lg px-1 py-1 text-sm font-semibold text-indigo-600 transition hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 sm:text-base"
          >
            ← Back to Teachers
          </Link>

          <div className="mt-4 min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">
              Teacher Details
            </p>

            <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Teacher Profile
            </h1>

            <p className="mt-2 text-slate-600">
              View complete teacher and assigned class information.
            </p>
          </div>

          {message && (
            <p className="mt-6 break-words rounded-2xl border border-slate-200 bg-white p-4 text-slate-600 shadow-sm sm:p-6">
              {message}
            </p>
          )}

          {teacher && (
            <div className="mt-6 min-w-0 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm sm:mt-8">
              <div className="bg-gradient-to-r from-indigo-700 via-violet-700 to-purple-700 p-5 text-white sm:p-6 lg:p-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl border border-white/30 bg-white/15 text-3xl font-bold shadow-lg backdrop-blur">
                    {teacher.fullName?.charAt(0)?.toUpperCase() || "T"}
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-medium text-indigo-100">
                      Teacher
                    </p>

                    <h2 className="mt-1 break-words text-2xl font-bold sm:text-3xl">
                      {teacher.fullName}
                    </h2>

                    <p className="mt-2 break-words text-indigo-100">
                      {teacher.department || "Department N/A"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6 lg:p-8">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {[
                    ["Email", teacher.email || "N/A"],
                    ["Phone", teacher.phone || "N/A"],
                    ["Gender", teacher.gender || "N/A"],
                    ["Department", teacher.department || "N/A"],
                    ["Qualification", teacher.qualification || "N/A"],
                    [
                      "Subjects",
                      teacher.subjects?.length
                        ? teacher.subjects.join(", ")
                        : "N/A",
                    ],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 transition hover:border-indigo-200 hover:bg-indigo-50/40"
                    >
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        {label}
                      </p>

                      <p
                        className={`mt-2 font-semibold capitalize text-slate-800 ${
                          label === "Email"
                            ? "break-all normal-case"
                            : "break-words"
                        }`}
                      >
                        {value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">
                        Assigned Classes
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        Classes currently assigned to this teacher.
                      </p>
                    </div>

                    <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700">
                      {teacher.assignedClasses?.length || 0}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {teacher.assignedClasses?.length === 0 ? (
                      <p className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-slate-500 sm:col-span-2 xl:col-span-3">
                        No classes assigned.
                      </p>
                    ) : (
                      teacher.assignedClasses?.map((cls) => (
                        <div
                          key={cls._id}
                          className="break-words rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-indigo-200 hover:shadow-md"
                        >
                          <p className="font-bold text-slate-900">
                            {cls.name}
                          </p>

                          <p className="mt-1 text-sm text-slate-600">
                            Section {cls.section}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
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