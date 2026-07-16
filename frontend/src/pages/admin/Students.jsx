import { useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";
import { Link } from "react-router-dom";
import {
  createStudent,
  getStudents,
  updateStudent,
  deleteStudent,
} from "../../services/studentService";
import { getClasses } from "../../services/classService";

function Students() {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
  fullName: "",
  rollNumber: "",
  gender: "",
  phone: "",
  email: "",
  password: "",
  classId: "",
});

  const loadStudents = async () => {
    try {
      const response = await getStudents();
      setStudents(response.data);
    } catch {
      setMessage("Failed to load students ❌");
    }
  };

  const loadClasses = async () => {
    try {
      const response = await getClasses();
      setClasses(response.data);
    } catch {
      setMessage("Failed to load classes ❌");
    }
  };

  useEffect(() => {
    loadStudents();
    loadClasses();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
   setFormData({
  fullName: "",
  rollNumber: "",
  gender: "",
  phone: "",
  email: "",
  password: "",
  classId: "",
});
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (editingId) {
        await updateStudent(editingId, formData);
        setMessage("Student updated successfully ✅");
      } else {
        await createStudent(formData);
        setMessage("Student added successfully ✅");
      }

      resetForm();
      loadStudents();
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to save student ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (student) => {
    setEditingId(student._id);
    setFormData({
  fullName: student.fullName,
  rollNumber: student.rollNumber,
  gender: student.gender,
  phone: student.phone || "",
  email: student.email || "",
  password: "",
  classId: student.class?._id || "",
});
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this student?")) return;

    try {
      await deleteStudent(id);
      setMessage("Student deleted successfully ✅");
      loadStudents();
    } catch {
      setMessage("Failed to delete student ❌");
    }
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch = `${student.fullName} ${student.rollNumber} ${student.email || ""}`
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesClass = classFilter
      ? student.class?._id === classFilter
      : true;

    return matchesSearch && matchesClass;
  });

  return (
    <div className="flex min-h-screen min-w-0 bg-slate-100">
      <Sidebar />

      <main className="min-w-0 flex-1">
        <Topbar />

        <section className="p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">Students</p>
              <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                Student Management
              </h1>
              <p className="mt-2 text-slate-600">
                Add and manage institute students.
              </p>
            </div>

            <div className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-600 shadow-sm sm:w-auto sm:px-5">
              Total Students: <b>{students.length}</b>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:mt-8 sm:p-6">
            <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
              {editingId ? "Edit Student" : "Add New Student"}
            </h2>

            {message && (
              <p className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-3 text-sm font-medium text-blue-700">
                {message}
              </p>
            )}

            <form
              onSubmit={handleSubmit}
              className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                required
              />

              <input
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleChange}
                placeholder="Roll Number"
                className="min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                required
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
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <input
                name="email"
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






              <select
                name="classId"
                value={formData.classId}
                onChange={handleChange}
                className="min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                required
              >
                <option value="">Select Class</option>
                {classes.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name} - Section {item.section}
                  </option>
                ))}
              </select>

              <button
                disabled={loading}
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-blue-300 sm:col-span-2 lg:col-span-2"
              >
                {loading
                  ? "Saving..."
                  : editingId
                  ? "Update Student"
                  : "Add Student"}
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
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <h2 className="text-xl font-extrabold tracking-tight text-slate-900">Student List</h2>

              <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:w-auto">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search student..."
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:min-w-0 lg:w-64"
                />

                <select
                  value={classFilter}
                  onChange={(e) => setClassFilter(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">All Classes</option>
                  {classes.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name} - {item.section}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {filteredStudents.length === 0 ? (
                <p className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500">
                  No students found.
                </p>
              ) : (
                filteredStudents.map((student) => (
                  <div
                    key={student._id}
                    className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0">
                      <h3 className="break-words text-base font-bold text-slate-900 sm:text-lg">{student.fullName}</h3>
                      <p className="mt-1 break-words text-sm text-slate-600">
                        Roll: {student.rollNumber} • {student.gender} •{" "}
                        {student.class?.name || "No Class"}
                      </p>
                      <p className="mt-1 break-all text-sm text-slate-500">
                        {student.phone || "No phone"} •{" "}
                        {student.email || "No email"}
                      </p>
                    </div>

                    <div className="grid w-full grid-cols-3 gap-2 sm:w-auto sm:flex sm:gap-3">




                   <Link
  to={`/admin/students/${student._id}`}
  className="rounded-xl bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 sm:px-4"
>
  View
</Link>   

                    
                   
  
                      <button
                        onClick={() => handleEdit(student)}
                        className="rounded-xl bg-amber-500 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-600 sm:px-4"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(student._id)}
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

export default Students;