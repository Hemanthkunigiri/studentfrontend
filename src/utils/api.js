import axiosInstance from "./axiosInstance";

const API_URL = "/students"; //  baseURL is already set in axiosInstance

export const createStudent = async (student) => {
  try {
    const response = await axiosInstance.post(API_URL, student);
    return response.data;
  } catch (error) {
    console.error("Error creating student:", error.response?.data || error.message);
    throw error;
  }
};

export const getStudents = async () => {
  try {
    const response = await axiosInstance.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching students:", error.response?.data || error.message);
    throw error;
  }
};

export const updateStudent = async (id, student) => {
  try {
    console.log("Sending PUT request to:", `${API_URL}/${id}`);
    console.log("Payload being sent:", student);

    const response = await axiosInstance.put(`${API_URL}/${id}`, student, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("Response received:", response.data);
    return response.data.student;
  } catch (error) {
    console.error("Error updating student:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteStudent = async (id) => {
  try {
    await axiosInstance.delete(`${API_URL}/${id}`);
    console.log("Student deleted successfully");
  } catch (error) {
    console.error("Error deleting student:", error.response?.data || error.message);
    throw error;
  }
};
