import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const createClass = async (classData, token) => {
  const response = await API.post(
    "/classes",
    classData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};