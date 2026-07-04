import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

const getAuthHeader = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const createDepartment = async (departmentData) => {
  const response = await API.post(
    "/departments",
    departmentData,
    getAuthHeader()
  );

  return response.data;
};

export const getDepartments = async () => {
  const response = await API.get(
    "/departments",
    getAuthHeader()
  );

  return response.data;
};

export const getDepartmentCount = async () => {
  const response = await API.get(
    "/departments/count",
    getAuthHeader()
  );

  return response.data;
};


export const updateDepartment = async (id, departmentData) => {
  const response = await API.put(
    `/departments/${id}`,
    departmentData,
    getAuthHeader()
  );

  return response.data;
};

export const deleteDepartment = async (id) => {
  const response = await API.delete(
    `/departments/${id}`,
    getAuthHeader()
  );

  return response.data;
};