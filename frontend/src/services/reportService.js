import axios from "axios";
import { API_BASE_URL } from "../config/apiConfig";

const API_URL = `${API_BASE_URL}/reports`;
const ANALYTICS_URL = `${API_BASE_URL}/report-analytics`;

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
  return axios.get(`${ANALYTICS_URL}/attendance`, getAuthConfig());
};

export const getStudentAnalytics = () => {
  return axios.get(`${ANALYTICS_URL}/students`, getAuthConfig());
};

export const getTeacherAnalytics = () => {
  return axios.get(`${ANALYTICS_URL}/teachers`, getAuthConfig());
};

export const getMonthlySummary = () => {
  return axios.get(`${ANALYTICS_URL}/monthly-summary`, getAuthConfig());
};

export const getDepartmentSummary = () => {
  return axios.get(`${ANALYTICS_URL}/department-summary`, getAuthConfig());
};

export const getClassSummary = () => {
  return axios.get(`${ANALYTICS_URL}/class-summary`, getAuthConfig());
};