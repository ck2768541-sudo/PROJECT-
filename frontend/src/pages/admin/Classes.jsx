import { useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";
import { createClass } from "../../services/classService";

function Classes() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    section: "",
    department: "",
    academicYear: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddClass = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await createClass(formData, token);

      setClasses([...classes, response.data]);
      setSuccess("Class added successfully ✅");
    } catch (err) {
      console.log(err.response?.data || err.message);

      setClasses([...classes, formData]);
      setError(err.response?.data?.message || "Backend failed, added only on screen");
    }

    setFormData({
      name: "",
      section: "",
      department: "",
      academicYear: "",
    });

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1">
        <Topbar />

        <section className="p-8">
          <h1 className="text-3xl font-bold text-gray-900">Class Management</h1>
          <p className="mt-2 text-gray-600">Create and manage institute classes.</p>

          <div className="mt-8 rounded-xl bg-white p-6 shadow">
            <h2 className="text-xl font-bold">Add New Class</h2>

            {success && <p className="mt-4 rounded-lg bg-green-50 p-3 text-green-700">{success}</p>}
            {error && <p className="mt-4 rounded-lg bg-red-50 p-3 text-red-700">{error}</p>}

            <form onSubmit={handleAddClass} className="mt-6 grid gap-4 md:grid-cols-4">
              <input name="name" value={formData.name} onChange={handleChange} placeholder="Class Name" className="rounded-lg border px-4 py-3 outline-none focus:border-blue-600" required />
              <input name="section" value={formData.section} onChange={handleChange} placeholder="Section" className="rounded-lg border px-4 py-3 outline-none focus:border-blue-600" required />
              <input name="department" value={formData.department} onChange={handleChange} placeholder="Department" className="rounded-lg border px-4 py-3 outline-none focus:border-blue-600" />
              <input name="academicYear" value={formData.academicYear} onChange={handleChange} placeholder="Academic Year" className="rounded-lg border px-4 py-3 outline-none focus:border-blue-600" required />

              <button disabled={loading} className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:bg-blue-300 md:col-span-4">
                {loading ? "Adding..." : "Add Class"}
              </button>
            </form>
          </div>

          <div className="mt-8 rounded-xl bg-white p-6 shadow">
            <h2 className="text-xl font-bold">Class List</h2>

            <div className="mt-4 space-y-3">
              {classes.length === 0 ? (
                <p className="text-gray-500">No classes added yet.</p>
              ) : (
                classes.map((item, index) => (
                  <div key={item._id || index} className="rounded-lg border p-4">
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="text-gray-600">
                      Section {item.section} • {item.department} • {item.academicYear}
                    </p>
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

export default Classes;