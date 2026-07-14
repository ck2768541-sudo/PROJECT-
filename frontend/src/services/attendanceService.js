import axios from "axios";

const API_URL = "http://localhost:5000/api/attendance";
const getAuthConfig = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
export const markAttendance = (data) => {
  return axios.post(API_URL, data, getAuthConfig());
};
export const getAttendance = () => {
  return axios.get(API_URL, getAuthConfig());
};

export const getDailyAttendance = (params) => {
  return axios.get(`${API_URL}/daily`, {
    ...getAuthConfig(),
    params,
  });
};

export const getMonthlyAttendance = (params) => {
  return axios.get(`${API_URL}/monthly`, {
    ...getAuthConfig(),
    params,
  });
};

export const updateAttendance = (id, data) => {
  return axios.put(
    `${API_URL}/${id}`,
    data,
    getAuthConfig()
  );
};

export const deleteAttendance = (id) => {
  return axios.delete(
    `${API_URL}/${id}`,
    getAuthConfig()
  );
};

export const getStudentAttendanceReport = (studentId) => {
  return axios.get(
    `${API_URL}/student/${studentId}`,
    getAuthConfig()
  );
};
export const getSubjectAttendanceReport = (subjectId) => {
  return axios.get(
    `${API_URL}/subject/${subjectId}`,
    getAuthConfig()
  );
};
export const getTeacherAttendanceData = () => {
  return axios.get(`${API_URL}/teacher/data`, getAuthConfig());
};