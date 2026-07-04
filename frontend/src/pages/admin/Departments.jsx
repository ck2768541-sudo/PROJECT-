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
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Topbar />

        <section className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Department Management
          </h1>

          <p className="mt-1 text-gray-500">
            Manage institute departments here.
          </p>

          {/* Stats Cards */}
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-white p-5 shadow">
              <p className="text-gray-500">Total Departments</p>
              <h2 className="mt-2 text-3xl font-bold">
                {departments.length}
              </h2>
            </div>

            <div className="rounded-lg bg-white p-5 shadow">
              <p className="text-gray-500">Active Departments</p>
              <h2 className="mt-2 text-3xl font-bold">
                {departments.length}
              </h2>
            </div>

            <div className="rounded-lg bg-white p-5 shadow">
              <p className="text-gray-500">Search Result</p>
              <h2 className="mt-2 text-3xl font-bold">
                {filteredDepartments.length}
              </h2>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="mt-6 rounded-lg bg-white p-5 shadow"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <input
                type="text"
                name="name"
                placeholder="Department Name"
                value={formData.name}
                onChange={handleChange}
                className="rounded border px-4 py-2 outline-none"
                required
              />

              <input
                type="text"
                name="code"
                placeholder="Department Code"
                value={formData.code}
                onChange={handleChange}
                className="rounded border px-4 py-2 outline-none"
                required
              />

              <input
                type="text"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="rounded border px-4 py-2 outline-none"
              />
            </div>

            <button
              type="submit"
              className="mt-4 rounded bg-blue-600 px-5 py-2 text-white"
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
            className="mt-6 w-full rounded border px-4 py-2 outline-none"
          />

          {/* Department Cards */}
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {filteredDepartments.map((dept) => (
              <div
                key={dept._id}
                className="rounded-lg bg-white p-5 shadow"
              >
                <h2 className="text-xl font-bold text-gray-800">
                  {dept.name}
                </h2>

                <p className="mt-1 text-gray-500">
                  Code: {dept.code}
                </p>

                <p className="mt-2 text-gray-600">
                  {dept.description || "No description"}
                </p>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => setSelectedDepartment(dept)}
                    className="rounded bg-green-600 px-3 py-1 text-white"
                  >
                    View
                  </button>

                  <button
                    onClick={() => handleEdit(dept)}
                    className="rounded bg-yellow-500 px-3 py-1 text-white"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(dept._id)}
                    className="rounded bg-red-600 px-3 py-1 text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* View Details Popup */}
          {selectedDepartment && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800">
                  Department Details
                </h2>

                <div className="mt-4 space-y-2">
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

export default Departments;