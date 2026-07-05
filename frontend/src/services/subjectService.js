import axios from "axios";

const API_URL = "http://localhost:5000/api/subjects";

export const createSubject = (data) => {
  return axios.post(API_URL, data);
};

export const getSubjects = () => {
  return axios.get(API_URL);
};

export const getSubjectById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const updateSubject = (id, data) => {
  return axios.put(`${API_URL}/${id}`, data);
};

export const deleteSubject = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};