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

export const createClass = async (classData) => {
  const response = await API.post("/classes", classData, getAuthHeader());
  return response.data;
};

export const getClasses = async () => {
  const response = await API.get("/classes", getAuthHeader());
  return response.data;
};

export const updateClass = async (id, classData) => {
  const response = await API.put(`/classes/${id}`, classData, getAuthHeader());
  return response.data;
};

export const deleteClass = async (id) => {
  const response = await API.delete(`/classes/${id}`, getAuthHeader());
  return response.data;
};

export const getClassCount = async () => {
  const response = await API.get("/classes/count", getAuthHeader());
  return response.data;
};