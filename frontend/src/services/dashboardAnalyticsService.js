import axios from "axios";
import { API_BASE_URL } from "../config/apiConfig";


const API_URL = `${API_BASE_URL}/dashboard-analytics`;
export const getDashboardAnalytics = () => {
  return axios.get(API_URL);
};

export const getInstituteAnalytics = () => {
  return axios.get(`${API_URL}/institute`);
};

export const getDepartmentAnalytics = () => {
  return axios.get(`${API_URL}/departments`);
};

export const getClassAnalytics = () => {
  return axios.get(`${API_URL}/classes`);
};

export const getSubjectAnalytics = () => {
  return axios.get(`${API_URL}/subjects`);
};

export const getWeeklyAttendanceAnalytics = () => {
  return axios.get(`${API_URL}/attendance/weekly`);
};

export const getMonthlyAttendanceAnalytics = () => {
  return axios.get(`${API_URL}/attendance/monthly`);
};

export const getSubjectWiseAttendanceAnalytics = () => {
  return axios.get(`${API_URL}/attendance/subjects`);
};

export const getClassWiseAttendanceAnalytics = () => {
  return axios.get(`${API_URL}/attendance/classes`);
};