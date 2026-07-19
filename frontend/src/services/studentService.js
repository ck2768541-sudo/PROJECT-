import axios from "axios";
import { API_BASE_URL } from "../config/apiConfig";

const API = axios.create({
baseURL: API_BASE_URL,
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

export const getStudentById = async (id) => {
  const response = await API.get(`/students/${id}`, getAuthHeader());
  return response.data;
};

export const updateStudent = async (id, studentData) => {
  const response = await API.put(`/students/${id}`, studentData, getAuthHeader());
  return response.data;
};

export const deleteStudent = async (id) => {
  const response = await API.delete(`/students/${id}`, getAuthHeader());
  return response.data;
};

export const getStudentCount = async () => {
  const response = await API.get("/students/count", getAuthHeader());
  return response.data;
};



export const getMyStudentDashboard = async () => {
  const response = await API.get(
    "/students/me/dashboard",
    getAuthHeader()
  );

  return response.data;
};