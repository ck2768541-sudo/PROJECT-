import { useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";
import {
  createClass,
  getClasses,
  updateClass,
  deleteClass,
} from "../../services/classService";

function Classes() {
  const [classes, setClasses] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    section: "",
    department: "",
    academicYear: "",
  });

  const loadClasses = async () => {
    try {
      const response = await getClasses();
      setClasses(response.data);
    } catch {
      setMessage("Failed to load classes ❌");
    }
  };

  useEffect(() => {
    loadClasses();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      section: "",
      department: "",
      academicYear: "",
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (editingId) {
        await updateClass(editingId, formData);
        setMessage("Class updated successfully ✅");
      } else {
        await createClass(formData);
        setMessage("Class added successfully ✅");
      }

      resetForm();
      loadClasses();
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setFormData({
      name: item.name,
      section: item.section,
      department: item.department,
      academicYear: item.academicYear,
    });
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this class?")) return;

    try {
      await deleteClass(id);
      setMessage("Class deleted successfully ✅");
      loadClasses();
    } catch {
      setMessage("Failed to delete class ❌");
    }
  };

  const filteredClasses = classes.filter((item) =>
    `${item.name} ${item.section} ${item.department} ${item.academicYear}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1">
        <Topbar />

        <section className="p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Class Management
              </h1>
              <p className="mt-2 text-gray-600">
                Create and manage institute classes.
              </p>
            </div>

            <div className="rounded-lg bg-white px-5 py-3 shadow">
              Total Classes: <b>{classes.length}</b>
            </div>
          </div>

          <div className="mt-8 rounded-xl bg-white p-6 shadow">
            <h2 className="text-xl font-bold">
              {editingId ? "Edit Class" : "Add New Class"}
            </h2>

            {message && (
              <p className="mt-4 rounded-lg bg-blue-50 p-3 text-blue-700">
                {message}
              </p>
            )}

            <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-4">
              <input name="name" value={formData.name} onChange={handleChange} placeholder="Class Name" className="rounded-lg border px-4 py-3 outline-none focus:border-blue-600" required />
              <input name="section" value={formData.section} onChange={handleChange} placeholder="Section" className="rounded-lg border px-4 py-3 outline-none focus:border-blue-600" required />
              <input name="department" value={formData.department} onChange={handleChange} placeholder="Department" className="rounded-lg border px-4 py-3 outline-none focus:border-blue-600" />
              <input name="academicYear" value={formData.academicYear} onChange={handleChange} placeholder="Academic Year" className="rounded-lg border px-4 py-3 outline-none focus:border-blue-600" required />

              <button disabled={loading} className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:bg-blue-300 md:col-span-2">
                {loading ? "Saving..." : editingId ? "Update Class" : "Add Class"}
              </button>

              {editingId && (
                <button type="button" onClick={resetForm} className="rounded-lg border px-6 py-3 md:col-span-2">
                  Cancel Edit
                </button>
              )}
            </form>
          </div>

          <div className="mt-8 rounded-xl bg-white p-6 shadow">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-bold">Class List</h2>

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search class..."
                className="w-72 rounded-lg border px-4 py-2 outline-none focus:border-blue-600"
              />
            </div>

            <div className="mt-4 space-y-3">
              {filteredClasses.length === 0 ? (
                <p className="rounded-lg border border-dashed p-6 text-center text-gray-500">
                  No classes found.
                </p>
              ) : (
                filteredClasses.map((item) => (
                  <div key={item._id} className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <h3 className="font-bold">{item.name}</h3>
                      <p className="text-gray-600">
                        Section {item.section} • {item.department || "No Department"} • {item.academicYear}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <button onClick={() => handleEdit(item)} className="rounded-lg bg-yellow-500 px-4 py-2 text-white">
                        Edit
                      </button>

                      <button onClick={() => handleDelete(item._id)} className="rounded-lg bg-red-600 px-4 py-2 text-white">
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

export default Classes;