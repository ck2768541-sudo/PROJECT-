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
    <div className="flex min-h-screen min-w-0 bg-slate-100">
      <Sidebar />

      <main className="min-w-0 flex-1">
        <Topbar />

        <section className="p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                Classes
              </p>

              <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                Class Management
              </h1>

              <p className="mt-2 text-slate-600">
                Create and manage institute classes.
              </p>
            </div>

            <div className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-600 shadow-sm sm:w-auto sm:px-5">
              Total Classes:{" "}
              <b className="text-slate-900">{classes.length}</b>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:mt-8 sm:p-6">
            <h2 className="text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">
              {editingId ? "Edit Class" : "Add New Class"}
            </h2>

            {message && (
              <p className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-3 text-sm font-medium text-blue-700">
                {message}
              </p>
            )}

            <form
              onSubmit={handleSubmit}
              className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
            >
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Class Name"
                className="min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                required
              />

              <input
                name="section"
                value={formData.section}
                onChange={handleChange}
                placeholder="Section"
                className="min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                required
              />

              <input
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="Department"
                className="min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <input
                name="academicYear"
                value={formData.academicYear}
                onChange={handleChange}
                placeholder="Academic Year"
                className="min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                required
              />

              <button
                disabled={loading}
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-blue-300 sm:col-span-2"
              >
                {loading ? "Saving..." : editingId ? "Update Class" : "Add Class"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300 sm:col-span-2"
                >
                  Cancel Edit
                </button>
              )}
            </form>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:mt-8 sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <h2 className="text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">
                Class List
              </h2>

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search class..."
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 lg:w-72"
              />
            </div>

            <div className="mt-4 space-y-3">
              {filteredClasses.length === 0 ? (
                <p className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500">
                  No classes found.
                </p>
              ) : (
                filteredClasses.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0">
                      <h3 className="break-words text-base font-bold text-slate-900 sm:text-lg">
                        {item.name}
                      </h3>

                      <p className="mt-1 break-words text-sm text-slate-600">
                        Section {item.section} •{" "}
                        {item.department || "No Department"} •{" "}
                        {item.academicYear}
                      </p>
                    </div>

                    <div className="grid w-full grid-cols-2 gap-2 sm:w-auto sm:flex sm:gap-3">
                      <button
                        onClick={() => handleEdit(item)}
                        className="rounded-xl bg-amber-500 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-600 sm:px-4"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(item._id)}
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

export default Classes;