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

export const createTeacher = async (teacherData) => {
  const response = await API.post("/teachers", teacherData, getAuthHeader());
  return response.data;
};

export const getTeachers = async () => {
  const response = await API.get("/teachers", getAuthHeader());
  return response.data;
};

export const getTeacherById = async (id) => {
  const response = await API.get(`/teachers/${id}`, getAuthHeader());
  return response.data;
};

export const updateTeacher = async (id, teacherData) => {
  const response = await API.put(`/teachers/${id}`, teacherData, getAuthHeader());
  return response.data;
};

export const deleteTeacher = async (id) => {
  const response = await API.delete(`/teachers/${id}`, getAuthHeader());
  return response.data;
};

export const getTeacherCount = async () => {
  const response = await API.get("/teachers/count", getAuthHeader());
  return response.data;
};
export const getMyTeacherDashboard = async () => {
  const response = await API.get(
    "/teachers/me/dashboard",
    getAuthHeader()
  );

  return response.data;
};