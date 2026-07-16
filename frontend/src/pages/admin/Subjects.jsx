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
    <div className="flex min-h-screen min-w-0 bg-slate-100">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />

        <section className="p-4 sm:p-6 lg:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">Subjects</p>

          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Subject Management
          </h1>

          <p className="mt-2 break-words text-slate-600">
            Manage subjects, departments, teachers, classes and credits.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md">
              <p className="text-sm font-semibold text-slate-500">Total Subjects</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">{subjects.length}</h2>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md">
              <p className="text-sm font-semibold text-slate-500">Active Subjects</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
                {subjects.filter((sub) => sub.status === "Active").length}
              </h2>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md">
              <p className="text-sm font-semibold text-slate-500">Inactive Subjects</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
                {subjects.filter((sub) => sub.status === "Inactive").length}
              </h2>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md">
              <p className="text-sm font-semibold text-slate-500">Search Result</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
                {filteredSubjects.length}
              </h2>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6"
          >
            <h2 className="text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">
              {editId ? "Edit Subject" : "Add New Subject"}
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <input
                type="text"
                name="name"
                placeholder="Subject Name"
                value={formData.name}
                onChange={handleChange}
                className="min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                required
              />

              <input
                type="text"
                name="code"
                placeholder="Subject Code"
                value={formData.code}
                onChange={handleChange}
                className="min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 uppercase text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                required
              />

              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
  className="min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
                className="min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
                className="min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                required
              />

              <select
                name="subjectType"
                value={formData.subjectType}
                onChange={handleChange}
                className="min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
                className="min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
                className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:col-span-2 lg:col-span-3"
              />
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:flex">
              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
              >
                {editId ? "Update Subject" : "Add Subject"}
              </button>

              {editId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="w-full rounded-xl bg-slate-700 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-slate-800 sm:w-auto"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <input
              type="text"
              placeholder="Search subject or code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
              className="min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
              className="min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredSubjects.map((subject) => (
              <div key={subject._id} className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:shadow-md sm:p-5">
                <div className="flex min-w-0 items-start justify-between gap-3">
                  <h2 className="min-w-0 break-words text-lg font-bold text-slate-900 sm:text-xl">
                    {subject.name}
                  </h2>

                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold text-white ${
                      subject.status === "Active"
                        ? "bg-green-600"
                        : "bg-red-600"
                    }`}
                  >
                    {subject.status}
                  </span>
                </div>

                <p className="mt-2 break-words text-slate-600">Code: {subject.code}</p>
                <p className="mt-2 break-words text-slate-600">
                  Department: {subject.department?.name || "No Department"}
                </p>
                <p className="mt-2 break-words text-slate-600">
Teacher: {subject.teacher?.fullName || "Not Assigned"}
                </p>
                <p className="mt-2 break-words text-slate-600">
                  Class: {subject.class?.name || "Not Assigned"}
                </p>
                <p className="mt-2 break-words text-slate-600">
                  Semester: {subject.semester}
                </p>
                <p className="mt-2 break-words text-slate-600">
                  Type: {subject.subjectType}
                </p>
                <p className="mt-2 break-words text-slate-600">
                  Credits: {subject.credits}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                  <button
                    onClick={() => setSelectedSubject(subject)}
                    className="rounded-xl bg-emerald-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                  >
                    Popup
                  </button>

                  <Link
                    to={`/admin/subjects/${subject._id}`}
                    className="rounded-xl bg-violet-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700"
                  >
                    Details
                  </Link>

                  <button
                    onClick={() => handleEdit(subject)}
                    className="rounded-xl bg-amber-500 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(subject._id)}
                    className="rounded-xl bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {selectedSubject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-[2px]">
              <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl sm:p-6">
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
                  Subject Details
                </h2>

                <div className="mt-5 space-y-3 break-words rounded-xl bg-slate-50 p-4 text-slate-700">
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
                   <b>Teacher:</b> {selectedSubject.teacher?.fullName || "Not Assigned"}
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
                  className="mt-6 w-full rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-slate-800 sm:w-auto"
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