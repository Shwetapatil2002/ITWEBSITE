import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/performance";

export const getPerformances = async () => {
    const response = await axios.get(`${API_URL}s`);
    return response.data;
};

export const getPerformanceById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const createPerformance = async (data) => {
    const response = await axios.post(API_URL, data);
    return response.data;
};

export const updatePerformance = async (id, data) => {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
};

export const deletePerformance = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};
