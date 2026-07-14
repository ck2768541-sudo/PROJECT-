import axios from "axios";

const API_URL = "http://localhost:5000/api/reports";

const getAuthConfig = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getStudentReport = (params = {}) => {
  return axios.get(`${API_URL}/students`, {
    ...getAuthConfig(),
    params,
  });
};

export const getTeacherReport = (params = {}) => {
  return axios.get(`${API_URL}/teachers`, {
    ...getAuthConfig(),
    params,
  });
};

export const getAttendanceReport = (params = {}) => {
  return axios.get(`${API_URL}/attendance`, {
    ...getAuthConfig(),
    params,
  });
};

export const exportAttendanceExcel = (params = {}) => {
  return axios.get(`${API_URL}/attendance/export/excel`, {
    ...getAuthConfig(),
    params,
    responseType: "blob",
  });
};

export const exportAttendancePDF = (params = {}) => {
  return axios.get(`${API_URL}/attendance/export/pdf`, {
    ...getAuthConfig(),
    params,
    responseType: "blob",
  });
};

export const exportStudentsExcel = (params = {}) => {
  return axios.get(`${API_URL}/students/export/excel`, {
    ...getAuthConfig(),
    params,
    responseType: "blob",
  });
};

export const exportTeachersExcel = (params = {}) => {
  return axios.get(`${API_URL}/teachers/export/excel`, {
    ...getAuthConfig(),
    params,
    responseType: "blob",
  });
};

export const getAttendanceAnalytics = () => {
  return axios.get(
    "http://localhost:5000/api/report-analytics/attendance",
    getAuthConfig()
  );
};

export const getStudentAnalytics = () => {
  return axios.get(
    "http://localhost:5000/api/report-analytics/students",
    getAuthConfig()
  );
};

export const getTeacherAnalytics = () => {
  return axios.get(
    "http://localhost:5000/api/report-analytics/teachers",
    getAuthConfig()
  );
};

export const getMonthlySummary = () => {
  return axios.get(
    "http://localhost:5000/api/report-analytics/monthly-summary",
    getAuthConfig()
  );
};

export const getDepartmentSummary = () => {
  return axios.get(
    "http://localhost:5000/api/report-analytics/department-summary",
    getAuthConfig()
  );
};

export const getClassSummary = () => {
  return axios.get(
    "http://localhost:5000/api/report-analytics/class-summary",
    getAuthConfig()
  );
};