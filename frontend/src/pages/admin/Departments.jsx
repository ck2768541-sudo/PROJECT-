import { useEffect, useState } from "react";

import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";

import {
  createDepartment,
  getDepartments,
  updateDepartment,
  deleteDepartment,
} from "../../services/departmentService";

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [search, setSearch] = useState("");

  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await getDepartments();
      setDepartments(res.data.departments || res.data || []);
    } catch (error) {
      console.log("Department fetch error:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await updateDepartment(editId, formData);
      } else {
        await createDepartment(formData);
      }

      setFormData({
        name: "",
        code: "",
        description: "",
      });

      setEditId(null);
      fetchDepartments();
    } catch (error) {
      console.log("Department save error:", error);
    }
  };

  const handleEdit = (dept) => {
    setEditId(dept._id);
    setFormData({
      name: dept.name || "",
      code: dept.code || "",
      description: dept.description || "",
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this department?"
    );

    if (!confirmDelete) return;

    try {
      await deleteDepartment(id);
      fetchDepartments();
    } catch (error) {
      console.log("Department delete error:", error);
    }
  };

  const filteredDepartments = departments.filter((dept) =>
    dept.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen min-w-0 bg-slate-100">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />

        <section className="p-4 sm:p-6 lg:p-8">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
              Departments
            </p>

            <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Department Management
            </h1>

            <p className="mt-2 text-slate-600">
              Manage institute departments here.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md sm:p-5">
              <p className="text-sm font-semibold text-slate-500">
                Total Departments
              </p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
                {departments.length}
              </h2>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md sm:p-5">
              <p className="text-sm font-semibold text-slate-500">
                Active Departments
              </p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
                {departments.length}
              </h2>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md sm:col-span-2 sm:p-5 lg:col-span-1">
              <p className="text-sm font-semibold text-slate-500">
                Search Result
              </p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
                {filteredDepartments.length}
              </h2>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6"
          >
            <h2 className="text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">
              {editId ? "Edit Department" : "Add New Department"}
            </h2>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <input
                type="text"
                name="name"
                placeholder="Department Name"
                value={formData.name}
                onChange={handleChange}
                className="min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                required
              />

              <input
                type="text"
                name="code"
                placeholder="Department Code"
                value={formData.code}
                onChange={handleChange}
                className="min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                required
              />

              <input
                type="text"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="min-w-0 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:col-span-2 lg:col-span-1"
              />
            </div>

            <button
              type="submit"
              className="mt-4 w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
            >
              {editId ? "Update Department" : "Add Department"}
            </button>
          </form>

          {/* Search */}
          <input
            type="text"
            placeholder="Search department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mt-6 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          {/* Department Cards */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredDepartments.map((dept) => (
              <div
                key={dept._id}
                className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:shadow-md sm:p-5"
              >
                <h2 className="break-words text-lg font-bold text-slate-900 sm:text-xl">
                  {dept.name}
                </h2>

                <p className="mt-1 break-words text-sm font-medium text-blue-600">
                  Code: {dept.code}
                </p>

                <p className="mt-3 break-words text-sm leading-6 text-slate-600">
                  {dept.description || "No description"}
                </p>

                <div className="mt-5 grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setSelectedDepartment(dept)}
                    className="rounded-xl bg-emerald-600 px-2 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 sm:px-3"
                  >
                    View
                  </button>

                  <button
                    onClick={() => handleEdit(dept)}
                    className="rounded-xl bg-amber-500 px-2 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-600 sm:px-3"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(dept._id)}
                    className="rounded-xl bg-red-600 px-2 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 sm:px-3"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* View Details Popup */}
          {selectedDepartment && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-[2px]">
              <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl sm:p-6">
                <h2 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                  Department Details
                </h2>

                <div className="mt-5 space-y-3 break-words rounded-xl bg-slate-50 p-4 text-slate-700">
                  <p>
                    <b>Name:</b> {selectedDepartment.name}
                  </p>

                  <p>
                    <b>Code:</b> {selectedDepartment.code}
                  </p>

                  <p>
                    <b>Description:</b>{" "}
                    {selectedDepartment.description || "No description"}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedDepartment(null)}
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

export default Departments;