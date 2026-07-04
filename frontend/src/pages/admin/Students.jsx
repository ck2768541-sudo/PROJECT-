import { useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";
import { createStudent, getStudents } from "../../services/studentService";
import { getClasses } from "../../services/classService";

function Students() {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    rollNumber: "",
    gender: "",
    phone: "",
    email: "",
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
      classId: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await createStudent(formData);
      setMessage("Student added successfully ✅");
      resetForm();
      loadStudents();
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to add student ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1">
        <Topbar />

        <section className="p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Student Management
              </h1>
              <p className="mt-2 text-gray-600">
                Add and manage institute students.
              </p>
            </div>

            <div className="rounded-lg bg-white px-5 py-3 shadow">
              Total Students: <b>{students.length}</b>
            </div>
          </div>

          <div className="mt-8 rounded-xl bg-white p-6 shadow">
            <h2 className="text-xl font-bold">Add New Student</h2>

            {message && (
              <p className="mt-4 rounded-lg bg-blue-50 p-3 text-blue-700">
                {message}
              </p>
            )}

            <form
              onSubmit={handleSubmit}
              className="mt-6 grid gap-4 md:grid-cols-3"
            >
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
                required
              />

              <input
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleChange}
                placeholder="Roll Number"
                className="rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
                required
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
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
              />

              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
              />

              <select
                name="classId"
                value={formData.classId}
                onChange={handleChange}
                className="rounded-lg border px-4 py-3 outline-none focus:border-blue-600"
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
                className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:bg-blue-300 md:col-span-3"
              >
                {loading ? "Saving..." : "Add Student"}
              </button>
            </form>
          </div>

          <div className="mt-8 rounded-xl bg-white p-6 shadow">
            <h2 className="text-xl font-bold">Student List</h2>

            <div className="mt-4 space-y-3">
              {students.length === 0 ? (
                <p className="rounded-lg border border-dashed p-6 text-center text-gray-500">
                  No students added yet.
                </p>
              ) : (
                students.map((student) => (
                  <div
                    key={student._id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div>
                      <h3 className="font-bold">{student.fullName}</h3>
                      <p className="text-gray-600">
                        Roll: {student.rollNumber} • {student.gender} •{" "}
                        {student.class?.name || "No Class"}
                      </p>
                    </div>

                    <div className="text-sm text-gray-500">
                      {student.phone || "No phone"}
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