import axios from "axios";

const API_URL = "http://localhost:5000/api/reports";

export const getStudentReport = (params = {}) => {
  return axios.get(`${API_URL}/students`, { params });
};

export const getTeacherReport = (params = {}) => {
  return axios.get(`${API_URL}/teachers`, { params });
};

export const getAttendanceReport = (params = {}) => {
  return axios.get(`${API_URL}/attendance`, { params });
};

export const exportAttendanceExcel = (params = {}) => {
  return axios.get(`${API_URL}/attendance/export/excel`, {
    params,
    responseType: "blob",
  });
};


export const exportAttendancePDF = (params = {}) => {
  return axios.get(`${API_URL}/attendance/export/pdf`, {
    params,
    responseType: "blob",
  });
};

export const exportStudentsExcel = (params = {}) => {
  return axios.get(`${API_URL}/students/export/excel`, {
    params,
    responseType: "blob",
  });
};

export const exportTeachersExcel = (params = {}) => {
  return axios.get(`${API_URL}/teachers/export/excel`, {
    params,
    responseType: "blob",
  });
};


export const getAttendanceAnalytics = () => {
  return axios.get("http://localhost:5000/api/report-analytics/attendance");
};

export const getStudentAnalytics = () => {
  return axios.get("http://localhost:5000/api/report-analytics/students");
};

export const getTeacherAnalytics = () => {
  return axios.get("http://localhost:5000/api/report-analytics/teachers");
};

export const getMonthlySummary = () => {
  return axios.get("http://localhost:5000/api/report-analytics/monthly-summary");
};

export const getDepartmentSummary = () => {
  return axios.get(
    "http://localhost:5000/api/report-analytics/department-summary"
  );
};

export const getClassSummary = () => {
  return axios.get("http://localhost:5000/api/report-analytics/class-summary");
};


