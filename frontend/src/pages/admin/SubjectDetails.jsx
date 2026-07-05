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
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />

        <div className="flex flex-1 flex-col">
          <Topbar />

          <section className="p-6">
            <p>Loading subject details...</p>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Topbar />

        <section className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Subject Details
              </h1>
              <p className="mt-1 text-gray-500">
                Complete information about this subject.
              </p>
            </div>

            <Link
              to="/admin/subjects"
              className="rounded bg-gray-800 px-4 py-2 text-white"
            >
              Back
            </Link>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <p className="text-gray-500">Subject Name</p>
                <h2 className="text-xl font-bold">{subject.name}</h2>
              </div>

              <div>
                <p className="text-gray-500">Subject Code</p>
                <h2 className="text-xl font-bold">{subject.code}</h2>
              </div>

              <div>
                <p className="text-gray-500">Department</p>
                <h2 className="text-xl font-bold">
                  {subject.department?.name || "No Department"}
                </h2>
              </div>

              <div>
                <p className="text-gray-500">Assigned Teacher</p>
                <h2 className="text-xl font-bold">
                  {subject.teacher?.name || "Not Assigned"}
                </h2>
              </div>

              <div>
                <p className="text-gray-500">Assigned Class</p>
                <h2 className="text-xl font-bold">
                  {subject.class?.name || "Not Assigned"}
                </h2>
              </div>

              <div>
                <p className="text-gray-500">Semester</p>
                <h2 className="text-xl font-bold">{subject.semester}</h2>
              </div>

              <div>
                <p className="text-gray-500">Subject Type</p>
                <h2 className="text-xl font-bold">{subject.subjectType}</h2>
              </div>

              <div>
                <p className="text-gray-500">Credits</p>
                <h2 className="text-xl font-bold">{subject.credits}</h2>
              </div>

              <div>
                <p className="text-gray-500">Status</p>
                <h2 className="text-xl font-bold">{subject.status}</h2>
              </div>

              <div>
                <p className="text-gray-500">Description</p>
                <h2 className="text-xl font-bold">
                  {subject.description || "No description"}
                </h2>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default SubjectDetails;