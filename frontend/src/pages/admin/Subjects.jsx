import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";

import {
  createSubject,
  getSubjects,
  updateSubject,
  deleteSubject,
} from "../../services/subjectService";

import { getDepartments } from "../../services/departmentService";
import { getTeachers } from "../../services/teacherService";
import { getClasses } from "../../services/classService";

function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);

  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [semesterFilter, setSemesterFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [editId, setEditId] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    department: "",
    teacher: "",
    class: "",
    semester: "",
    subjectType: "Theory",
    credits: "",
    status: "Active",
    description: "",
  });

  useEffect(() => {
    fetchSubjects();
    fetchDepartments();
    fetchTeachers();
    fetchClasses();
  }, []);

  const fetchSubjects = async () => {
    try {
      const res = await getSubjects();
      setSubjects(res.data.subjects || []);
    } catch (error) {
      console.log("Subject fetch error:", error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await getDepartments();
      setDepartments(res.data.departments || res.data || []);
    } catch (error) {
      console.log("Department fetch error:", error);
    }
  };

  const fetchTeachers = async () => {
    try {
      const res = await getTeachers();
      setTeachers(res.data.teachers || res.data || []);
    } catch (error) {
      console.log("Teacher fetch error:", error);
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      code: "",
      department: "",
      teacher: "",
      class: "",
      semester: "",
      subjectType: "Theory",
      credits: "",
      status: "Active",
      description: "",
    });

    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        code: formData.code.toUpperCase(),
        credits: Number(formData.credits || 0),
        teacher: formData.teacher || null,
        class: formData.class || null,
      };

      if (editId) {
        await updateSubject(editId, payload);
      } else {
        await createSubject(payload);
      }

      resetForm();
      fetchSubjects();
    } catch (error) {
      alert(error.response?.data?.message || "Subject save error");
      console.log("Subject save error:", error);
    }
  };

  const handleEdit = (subject) => {
    setEditId(subject._id);

    setFormData({
      name: subject.name || "",
      code: subject.code || "",
      department: subject.department?._id || subject.department || "",
      teacher: subject.teacher?._id || subject.teacher || "",
      class: subject.class?._id || subject.class || "",
      semester: subject.semester || "",
      subjectType: subject.subjectType || "Theory",
      credits: subject.credits || "",
      status: subject.status || "Active",
      description: subject.description || "",
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this subject?"
    );

    if (!confirmDelete) return;

    try {
      await deleteSubject(id);
      fetchSubjects();
    } catch (error) {
      console.log("Subject delete error:", error);
    }
  };

  const filteredSubjects = subjects.filter((subject) => {
    const matchSearch =
      subject.name?.toLowerCase().includes(search.toLowerCase()) ||
      subject.code?.toLowerCase().includes(search.toLowerCase());

    const matchDepartment = departmentFilter
      ? subject.department?._id === departmentFilter
      : true;

    const matchSemester = semesterFilter
      ? subject.semester === semesterFilter
      : true;

    const matchStatus = statusFilter ? subject.status === statusFilter : true;

    return matchSearch && matchDepartment && matchSemester && matchStatus;
  });

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Topbar />

        <section className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Subject Management
          </h1>

          <p className="mt-1 text-gray-500">
            Manage subjects, departments, teachers, classes and credits.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="rounded-lg bg-white p-5 shadow">
              <p className="text-gray-500">Total Subjects</p>
              <h2 className="mt-2 text-3xl font-bold">{subjects.length}</h2>
            </div>

            <div className="rounded-lg bg-white p-5 shadow">
              <p className="text-gray-500">Active Subjects</p>
              <h2 className="mt-2 text-3xl font-bold">
                {subjects.filter((sub) => sub.status === "Active").length}
              </h2>
            </div>

            <div className="rounded-lg bg-white p-5 shadow">
              <p className="text-gray-500">Inactive Subjects</p>
              <h2 className="mt-2 text-3xl font-bold">
                {subjects.filter((sub) => sub.status === "Inactive").length}
              </h2>
            </div>

            <div className="rounded-lg bg-white p-5 shadow">
              <p className="text-gray-500">Search Result</p>
              <h2 className="mt-2 text-3xl font-bold">
                {filteredSubjects.length}
              </h2>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-6 rounded-lg bg-white p-5 shadow"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <input
                type="text"
                name="name"
                placeholder="Subject Name"
                value={formData.name}
                onChange={handleChange}
                className="rounded border px-4 py-2 outline-none"
                required
              />

              <input
                type="text"
                name="code"
                placeholder="Subject Code"
                value={formData.code}
                onChange={handleChange}
                className="rounded border px-4 py-2 uppercase outline-none"
                required
              />

              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="rounded border px-4 py-2 outline-none"
                required
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept._id} value={dept._id}>
                    {dept.name}
                  </option>
                ))}
              </select>

<select
  name="teacher"
  value={formData.teacher}
  onChange={handleChange}
  className="rounded border px-4 py-2 outline-none"
>
  <option value="">Assign Teacher</option>

  {teachers.map((teacher) => (
    <option key={teacher._id} value={teacher._id}>
      {teacher.name ||
        teacher.fullName ||
        teacher.teacherName ||
        "Unnamed Teacher"}
    </option>
  ))}
</select>



  

              <select
                name="class"
                value={formData.class}
                onChange={handleChange}
                className="rounded border px-4 py-2 outline-none"
              >
                <option value="">Assign Class</option>
                {classes.map((cls) => (
                  <option key={cls._id} value={cls._id}>
                    {cls.name}
                  </option>
                ))}
              </select>

              <input
                type="text"
                name="semester"
                placeholder="Semester"
                value={formData.semester}
                onChange={handleChange}
                className="rounded border px-4 py-2 outline-none"
                required
              />

              <select
                name="subjectType"
                value={formData.subjectType}
                onChange={handleChange}
                className="rounded border px-4 py-2 outline-none"
              >
                <option value="Theory">Theory</option>
                <option value="Practical">Practical</option>
                <option value="Lab">Lab</option>
              </select>

              <input
                type="number"
                name="credits"
                placeholder="Credits"
                value={formData.credits}
                onChange={handleChange}
                className="rounded border px-4 py-2 outline-none"
              />

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="rounded border px-4 py-2 outline-none"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              <input
                type="text"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="rounded border px-4 py-2 outline-none md:col-span-3"
              />
            </div>

            <div className="mt-4 flex gap-3">
              <button
                type="submit"
                className="rounded bg-blue-600 px-5 py-2 text-white"
              >
                {editId ? "Update Subject" : "Add Subject"}
              </button>

              {editId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded bg-gray-700 px-5 py-2 text-white"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
            <input
              type="text"
              placeholder="Search subject or code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded border px-4 py-2 outline-none"
            />

            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="rounded border px-4 py-2 outline-none"
            >
              <option value="">All Departments</option>
              {departments.map((dept) => (
                <option key={dept._id} value={dept._id}>
                  {dept.name}
                </option>
              ))}
            </select>

            <select
              value={semesterFilter}
              onChange={(e) => setSemesterFilter(e.target.value)}
              className="rounded border px-4 py-2 outline-none"
            >
              <option value="">All Semesters</option>
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
              <option value="3">Semester 3</option>
              <option value="4">Semester 4</option>
              <option value="5">Semester 5</option>
              <option value="6">Semester 6</option>
              <option value="7">Semester 7</option>
              <option value="8">Semester 8</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded border px-4 py-2 outline-none"
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {filteredSubjects.map((subject) => (
              <div key={subject._id} className="rounded-lg bg-white p-5 shadow">
                <div className="flex items-start justify-between">
                  <h2 className="text-xl font-bold text-gray-800">
                    {subject.name}
                  </h2>

                  <span
                    className={`rounded px-2 py-1 text-xs text-white ${
                      subject.status === "Active"
                        ? "bg-green-600"
                        : "bg-red-600"
                    }`}
                  >
                    {subject.status}
                  </span>
                </div>

                <p className="mt-1 text-gray-500">Code: {subject.code}</p>
                <p className="mt-1 text-gray-500">
                  Department: {subject.department?.name || "No Department"}
                </p>
                <p className="mt-1 text-gray-500">
                  Teacher: {subject.teacher?.name || "Not Assigned"}
                </p>
                <p className="mt-1 text-gray-500">
                  Class: {subject.class?.name || "Not Assigned"}
                </p>
                <p className="mt-1 text-gray-500">
                  Semester: {subject.semester}
                </p>
                <p className="mt-1 text-gray-500">
                  Type: {subject.subjectType}
                </p>
                <p className="mt-1 text-gray-500">
                  Credits: {subject.credits}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedSubject(subject)}
                    className="rounded bg-green-600 px-3 py-1 text-white"
                  >
                    Popup
                  </button>

                  <Link
                    to={`/admin/subjects/${subject._id}`}
                    className="rounded bg-purple-600 px-3 py-1 text-white"
                  >
                    Details
                  </Link>

                  <button
                    onClick={() => handleEdit(subject)}
                    className="rounded bg-yellow-500 px-3 py-1 text-white"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(subject._id)}
                    className="rounded bg-red-600 px-3 py-1 text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {selectedSubject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800">
                  Subject Details
                </h2>

                <div className="mt-4 space-y-2">
                  <p>
                    <b>Name:</b> {selectedSubject.name}
                  </p>
                  <p>
                    <b>Code:</b> {selectedSubject.code}
                  </p>
                  <p>
                    <b>Department:</b>{" "}
                    {selectedSubject.department?.name || "No Department"}
                  </p>
                  <p>
                    <b>Teacher:</b>{" "}
                    {selectedSubject.teacher?.name || "Not Assigned"}
                  </p>
                  <p>
                    <b>Class:</b>{" "}
                    {selectedSubject.class?.name || "Not Assigned"}
                  </p>
                  <p>
                    <b>Semester:</b> {selectedSubject.semester}
                  </p>
                  <p>
                    <b>Type:</b> {selectedSubject.subjectType}
                  </p>
                  <p>
                    <b>Credits:</b> {selectedSubject.credits}
                  </p>
                  <p>
                    <b>Status:</b> {selectedSubject.status}
                  </p>
                  <p>
                    <b>Description:</b>{" "}
                    {selectedSubject.description || "No description"}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedSubject(null)}
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

export default Subjects;