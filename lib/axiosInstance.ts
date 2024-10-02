import axios from 'axios';

// Membuat instance axios dengan konfigurasi dasar
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api', // Ganti dengan base URL API kamu
//   timeout: 10000, // Timeout request (dalam ms)
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getData = async (url:string) => {
    try {
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  
  // Fungsi untuk melakukan POST request
  export const postData = async (url:string, data:unknown) => {
    try {
      const response = await axiosInstance.post(url, data);
      return response.data;
    } catch (error) {
      console.error('Error posting data:', error);
      throw error;
    }
  };
  
  // Fungsi untuk melakukan PUT request
  export const putData = async (url:string, data:unknown) => {
    try {
      const response = await axiosInstance.put(url, data);
      return response.data;
    } catch (error) {
      console.error('Error updating data:', error);
      throw error;
    }
  };
  
  // Fungsi untuk melakukan DELETE request
  export const deleteData = async (url:string) => {
    try {
      const response = await axiosInstance.delete(url);
      return response.data;
    } catch (error) {
      console.error('Error deleting data:', error);
      throw error;
    }
  };

export default axiosInstance;
