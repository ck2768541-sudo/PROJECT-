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
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1">
        <Topbar />

        <section className="p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Teacher Management
              </h1>
              <p className="mt-2 text-gray-600">
                Add, edit, delete and manage teachers.
              </p>
            </div>

            <div className="rounded-lg bg-white px-5 py-3 shadow">
              Total Teachers: <b>{teachers.length}</b>
            </div>
          </div>

          <div className="mt-8 rounded-xl bg-white p-6 shadow">
            <h2 className="text-xl font-bold">
              {editingId ? "Edit Teacher" : "Add New Teacher"}
            </h2>

            {message && (
              <p className="mt-4 rounded-lg bg-blue-50 p-3 text-blue-700">
                {message}
              </p>
            )}

            <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-3">
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
                required
              />

              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
              />

              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
              />

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
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
                className="rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
              />

              <input
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                placeholder="Qualification"
                className="rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
              />

              <input
                name="subjects"
                value={formData.subjects}
                onChange={handleChange}
                placeholder="Subjects comma separated"
                className="rounded-lg border px-4 py-3 outline-none focus:border-blue-600 md:col-span-3"
              />

              <div className="md:col-span-3">
                <label className="mb-2 block font-medium text-gray-700">
                  Assign Classes
                </label>

                <select
                  name="assignedClasses"
                  value={formData.assignedClasses}
                  onChange={handleChange}
                  multiple
                  className="h-32 w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
                >
                  {classes.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name} - Section {item.section}
                    </option>
                  ))}
                </select>

                <p className="mt-2 text-sm text-gray-500">
                   Ctrl दबाकर multiple classes select करो.
                </p>
              </div>

              <button
                disabled={loading}
                className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:bg-blue-300 md:col-span-2"
              >
                {loading ? "Saving..." : editingId ? "Update Teacher" : "Add Teacher"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-lg border px-6 py-3"
                >
                  Cancel Edit
                </button>
              )}
            </form>
          </div>

          <div className="mt-8 rounded-xl bg-white p-6 shadow">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Teacher List</h2>

<div className="mt-4 flex flex-wrap gap-4">

  <select
    value={departmentFilter}
    onChange={(e) =>
      setDepartmentFilter(e.target.value)
    }
    className="rounded-lg border px-4 py-2"
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
    className="rounded-lg border px-4 py-2"
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
                className="w-72 rounded-lg border px-4 py-2 outline-none focus:border-blue-600"
              />
            </div>

            <div className="mt-4 space-y-3">
              {filteredTeachers.length === 0 ? (
                <p className="rounded-lg border border-dashed p-6 text-center text-gray-500">
                  No teachers found.
                </p>
              ) : (
                filteredTeachers.map((teacher) => (
                  <div
                    key={teacher._id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div>
                      <h3 className="font-bold">{teacher.fullName}</h3>
                      <p className="text-gray-600">
                        {teacher.department || "No Department"} •{" "}
                        {teacher.qualification || "No Qualification"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {teacher.phone || "No phone"} •{" "}
                        {teacher.email || "No email"}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        Subjects:{" "}
                        {teacher.subjects?.length
                          ? teacher.subjects.join(", ")
                          : "No subjects"}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <Link
                        to={`/admin/teachers/${teacher._id}`}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-white"
                      >
                        View
                      </Link>

                      <button
                        onClick={() => handleEdit(teacher)}
                        className="rounded-lg bg-yellow-500 px-4 py-2 text-white"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(teacher._id)}
                        className="rounded-lg bg-red-600 px-4 py-2 text-white"
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