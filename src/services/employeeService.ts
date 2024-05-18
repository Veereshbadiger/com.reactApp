import axios from 'axios';
// import { Employee } from "../types/Employee"

const API_URL = 'http://10.0.2.2:8080/employee';

export const getAllEmployees = async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching employees:', error);
      throw error;
    }
  };
  
  export const getEmployee = async (employeeId: number) => {
    try {
      const response = await axios.get(`${API_URL}/${employeeId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching employee with id ${employeeId}:`, error);
      throw error;
    }
  };
  
  export const createEmployee = async (employee: Employee) => {
    try {
      const response = await axios.post(API_URL, employee);
      return response.data;
    } catch (error) {
      console.error('Error creating employee:', error);
      throw error;
    }
  };
  
  export const updateEmployee = async (id: Employee, employee: Employee) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, employee);
      return response.data;
    } catch (error) {
      console.error(`Error updating employee with id ${id}:`, error);
      throw error;
    }
  };
  
  export const deleteEmployee = async (employeeId: number) => {
    try {
      await axios.delete(`${API_URL}/${employeeId}`);
    } catch (error) {
      console.error(`Error deleting employee with id ${employeeId}:`, error);
      throw error;
    }
  };