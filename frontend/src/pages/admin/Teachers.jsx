import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";

import {
  createTeacher,
  getTeachers,
  updateTeacher,
  deleteTeacher,
} from "../../services/teacherService";

import { getClasses } from "../../services/classService";

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [search, setSearch] = useState("");


const [departmentFilter, setDepartmentFilter] = useState("");
const [genderFilter, setGenderFilter] = useState("");



  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

const [formData, setFormData] = useState({
  fullName: "",
  email: "",
  password: "",
  phone: "",
  gender: "",
  department: "",
  qualification: "",
  subjects: "",
  assignedClasses: [],
});

  const loadTeachers = async () => {
    try {
      const response = await getTeachers();
      setTeachers(response.data);
    } catch {
      setMessage("Failed to load teachers");
    }
  };

  const loadClasses = async () => {
    try {
      const response = await getClasses();
      setClasses(response.data);
    } catch {
      setClasses([]);
    }
  };

  useEffect(() => {
    loadTeachers();
    loadClasses();
  }, []);

  const handleChange = (e) => {
    const { name, value, selectedOptions } = e.target;

    if (name === "assignedClasses") {
      const values = Array.from(selectedOptions, (option) => option.value);
      setFormData({ ...formData, assignedClasses: values });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
  fullName: "",
  email: "",
  password: "",
  phone: "",
  gender: "",
  department: "",
 qualification: "",
  subjects: "",
  assignedClasses: [],
});
  };

  const preparePayload = () => {
    return {
      ...formData,
      subjects: formData.subjects
        ? formData.subjects.split(",").map((item) => item.trim()).filter(Boolean)
        : [],
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (editingId) {
        await updateTeacher(editingId, preparePayload());
        setMessage("Teacher updated successfully ✅");
      } else {
        await createTeacher(preparePayload());
        setMessage("Teacher added successfully ✅");
      }

      resetForm();
      loadTeachers();
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to save teacher ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (teacher) => {
    setEditingId(teacher._id);

    setFormData({
      fullName: teacher.fullName || "",
  email: teacher.email || "",
password: "",
phone: teacher.phone || "",
      gender: teacher.gender || "",
      department: teacher.department || "",
      qualification: teacher.qualification || "",
      subjects: teacher.subjects?.join(", ") || "",
      assignedClasses: teacher.assignedClasses?.map((item) => item._id) || [],
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this teacher?")) return;

    try {
      await deleteTeacher(id);
      setMessage("Teacher deleted successfully ✅");
      loadTeachers();
    } catch {
      setMessage("Failed to delete teacher ❌");
    }
  };


  const filteredTeachers = teachers.filter((teacher) => {

  const matchesSearch =
    `${teacher.fullName}
     ${teacher.email || ""}
     ${teacher.phone || ""}
     ${teacher.department || ""}`
      .toLowerCase()
      .includes(search.toLowerCase());

  const matchesDepartment =
    departmentFilter === "" ||
    teacher.department === departmentFilter;

  const matchesGender =
    genderFilter === "" ||
    teacher.gender === genderFilter;

  return (
    matchesSearch &&
    matchesDepartment &&
    matchesGender
  );

});


  return (
    <div className="flex min-h-screen min-w-0 bg-slate-100">
      <Sidebar />

      <main className="min-w-0 flex-1">
        <Topbar />

        <section className="p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">Teachers</p>
              <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                Teacher Management
              </h1>
              <p className="mt-2 text-slate-600">
                Add, edit, delete and manage teachers.
              </p>
            </div>

            <div className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-600 shadow-sm sm:w-auto sm:px-5">
              Total Teachers: <b>{teachers.length}</b>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:mt-8 sm:p-6">
            <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
              {editingId ? "Edit Teacher" : "Add New Teacher"}
            </h2>

            {message && (
              <p className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-3 text-sm font-medium text-blue-700">
                {message}
              </p>
            )}

            <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                required
              />

              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

<input
  type="password"
  name="password"
  value={formData.password}
  onChange={handleChange}
  placeholder="Password"
  className="min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
  required={!editingId}
/>










              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>

              <input
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="Department"
                className="min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <input
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                placeholder="Qualification"
                className="min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <input
                name="subjects"
                value={formData.subjects}
                onChange={handleChange}
                placeholder="Subjects comma separated"
                className="min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:col-span-2 lg:col-span-3"
              />

              <div className="sm:col-span-2 lg:col-span-3">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Assign Classes
                </label>

                <select
                  name="assignedClasses"
                  value={formData.assignedClasses}
                  onChange={handleChange}
                  multiple
                  className="h-32 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  {classes.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name} - Section {item.section}
                    </option>
                  ))}
                </select>

                <p className="mt-2 text-sm text-slate-500">
                   Ctrl दबाकर multiple classes select करो.
                </p>
              </div>

              <button
                disabled={loading}
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-blue-300 sm:col-span-2 lg:col-span-2"
              >
                {loading ? "Saving..." : editingId ? "Update Teacher" : "Add Teacher"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300"
                >
                  Cancel Edit
                </button>
              )}
            </form>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:mt-8 sm:p-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <h2 className="text-xl font-extrabold tracking-tight text-slate-900">Teacher List</h2>

<div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 xl:mt-0 xl:w-auto">

  <select
    value={departmentFilter}
    onChange={(e) =>
      setDepartmentFilter(e.target.value)
    }
    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
  >
    <option value="">All Departments</option>
    <option value="B.Tech">B.Tech</option>
    <option value="BCA">BCA</option>
    <option value="MBA">MBA</option>
  </select>

  <select
    value={genderFilter}
    onChange={(e) =>
      setGenderFilter(e.target.value)
    }
    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
  >
    <option value="">All Genders</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
    <option value="other">Other</option>
  </select>

</div>


              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search teacher..."
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 xl:w-72"
              />
            </div>

            <div className="mt-4 space-y-3">
              {filteredTeachers.length === 0 ? (
                <p className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500">
                  No teachers found.
                </p>
              ) : (
                filteredTeachers.map((teacher) => (
                  <div
                    key={teacher._id}
                    className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0">
                      <h3 className="break-words text-base font-bold text-slate-900 sm:text-lg">{teacher.fullName}</h3>
                      <p className="mt-1 break-words text-sm text-slate-600">
                        {teacher.department || "No Department"} •{" "}
                        {teacher.qualification || "No Qualification"}
                      </p>
                      <p className="mt-1 break-all text-sm text-slate-500">
                        {teacher.phone || "No phone"} •{" "}
                        {teacher.email || "No email"}
                      </p>
                      <p className="mt-1 break-words text-sm text-slate-500">
                        Subjects:{" "}
                        {teacher.subjects?.length
                          ? teacher.subjects.join(", ")
                          : "No subjects"}
                      </p>
                    </div>

                    <div className="grid w-full grid-cols-3 gap-2 sm:w-auto sm:flex sm:gap-3">
                      <Link
                        to={`/admin/teachers/${teacher._id}`}
                        className="rounded-xl bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 sm:px-4"
                      >
                        View
                      </Link>

                      <button
                        onClick={() => handleEdit(teacher)}
                        className="rounded-xl bg-amber-500 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-600 sm:px-4"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(teacher._id)}
                        className="rounded-xl bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 sm:px-4"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Teachers;