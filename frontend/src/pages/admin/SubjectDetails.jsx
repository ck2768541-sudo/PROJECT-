import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";

import { getSubjectById } from "../../services/subjectService";

function SubjectDetails() {
  const { id } = useParams();
  const [subject, setSubject] = useState(null);

  useEffect(() => {
    fetchSubject();
  }, []);

  const fetchSubject = async () => {
    try {
      const res = await getSubjectById(id);
      setSubject(res.data.subject);
    } catch (error) {
      console.log("Subject details error:", error);
    }
  };

  if (!subject) {
    return (
      <div className="flex min-h-screen min-w-0 bg-slate-100">
        <Sidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar />

          <section className="p-4 sm:p-6 lg:p-8">
            <p className="rounded-2xl border border-slate-200 bg-white p-4 text-slate-600 shadow-sm sm:p-6">
              Loading subject details...
            </p>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen min-w-0 bg-slate-100">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />

        <section className="p-4 sm:p-6 lg:p-8">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600">
                Subject Details
              </p>

              <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                Subject Profile
              </h1>

              <p className="mt-2 text-slate-600">
                Complete information about this subject.
              </p>
            </div>

            <Link
              to="/admin/subjects"
              className="w-full rounded-xl bg-slate-900 px-4 py-2.5 text-center font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 sm:w-auto"
            >
              ← Back to Subjects
            </Link>
          </div>

          <div className="min-w-0 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="bg-gradient-to-r from-violet-700 via-purple-700 to-indigo-700 p-5 text-white sm:p-6 lg:p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-4 sm:gap-5">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl border border-white/30 bg-white/15 text-3xl font-bold shadow-lg backdrop-blur">
                    {subject.name?.charAt(0)?.toUpperCase() || "S"}
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-medium text-violet-100">
                      Subject
                    </p>

                    <h2 className="mt-1 break-words text-2xl font-bold sm:text-3xl">
                      {subject.name}
                    </h2>

                    <p className="mt-2 break-words text-violet-100">
                      Code: {subject.code}
                    </p>
                  </div>
                </div>

                <span
                  className={`w-fit rounded-full px-4 py-2 text-sm font-semibold ${
                    subject.status === "Active"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {subject.status}
                </span>
              </div>
            </div>

            <div className="p-4 sm:p-6 lg:p-8">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {[
                  ["Subject Name", subject.name],
                  ["Subject Code", subject.code],
                  [
                    "Department",
                    subject.department?.name || "No Department",
                  ],
                  [
                    "Assigned Teacher",
                    subject.teacher?.fullName || "Not Assigned",
                  ],
                  [
                    "Assigned Class",
                    subject.class?.name || "Not Assigned",
                  ],
                  ["Semester", subject.semester],
                  ["Subject Type", subject.subjectType],
                  ["Credits", subject.credits],
                  ["Status", subject.status],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 transition hover:border-violet-200 hover:bg-violet-50/40"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      {label}
                    </p>

                    <p className="mt-2 break-words font-semibold text-slate-800">
                      {value}
                    </p>
                  </div>
                ))}

                <div className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 transition hover:border-violet-200 hover:bg-violet-50/40 sm:col-span-2 xl:col-span-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Description
                  </p>

                  <p className="mt-2 break-words leading-7 text-slate-700">
                    {subject.description || "No description"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default SubjectDetails;