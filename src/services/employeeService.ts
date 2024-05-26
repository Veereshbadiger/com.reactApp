import axios from 'axios';
import { Employee } from '../types/Employee';
import apiConfig from '../config/ApiConfig';

const API_URL = apiConfig.host;

// Fetch all employees
export const getAllEmployees = async () => {
  try {
    const response = await axios.get(`${API_URL}/employee`);
    return response.data;
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
};

// Fetch a single employee by ID
export const getEmployee = async (employeeId: number) => {
  try {
    const response = await axios.get(`${API_URL}/employee/${employeeId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching employee with id ${employeeId}:`, error);
    throw error;
  }
};

// Create a new employee
export const createEmployee = async (employee: Employee) => {
  try {
    const response = await axios.post(`${API_URL}/employee`, employee);
    return response.data;
  } catch (error) {
    console.error('Error creating employee:', error);
    throw error;
  }
};

// Update an existing employee
export const updateEmployee = async (employeeId: number, employee: Employee) => {
  try {
    const response = await axios.put(`${API_URL}/employee/${employeeId}`, employee);
    return response.data;
  } catch (error) {
    console.error(`Error updating employee with id ${employeeId}:`, error);
    throw error;
  }
};

// Delete an employee
export const deleteEmployee = async (employeeId: number) => {
  try {
    await axios.delete(`${API_URL}/employee/${employeeId}`);
  } catch (error) {
    console.error(`Error deleting employee with id ${employeeId}:`, error);
    throw error;
  }
};
