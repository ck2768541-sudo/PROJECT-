import axios from "axios";

const API_URL = "http://localhost:5000/api/attendance";

export const markAttendance = (data) => {
  return axios.post(API_URL, data);
};

export const getAttendance = () => {
  return axios.get(API_URL);
};

export const getDailyAttendance = (params) => {
  return axios.get(`${API_URL}/daily`, { params });
};

export const getMonthlyAttendance = (params) => {
  return axios.get(`${API_URL}/monthly`, { params });
};

export const updateAttendance = (id, data) => {
  return axios.put(`${API_URL}/${id}`, data);
};

export const deleteAttendance = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

export const getStudentAttendanceReport = (studentId) => {
  return axios.get(`${API_URL}/student/${studentId}`);
};

export const getSubjectAttendanceReport = (subjectId) => {
  return axios.get(`${API_URL}/subject/${subjectId}`);
};