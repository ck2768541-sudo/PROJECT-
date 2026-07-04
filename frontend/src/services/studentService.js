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

export const createStudent = async (studentData) => {
  const response = await API.post("/students", studentData, getAuthHeader());
  return response.data;
};

export const getStudents = async () => {
  const response = await API.get("/students", getAuthHeader());
  return response.data;
};