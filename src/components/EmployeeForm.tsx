import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { createEmployee, updateEmployee, getEmployee } from '../services/employeeService';
import { Employee } from '../types/Employee';

interface EmployeeFormProps {
  employeeId?: number; // Optional prop for updating an existing employee
  onSuccess?: () => void; // Optional callback for when the form submits successfully
}

// Define a type for the errors state to accommodate both string and boolean values
type ErrorsState = {
  employeeName: string | boolean;
  employeeAddress: boolean;
  employeePhNumber: boolean;
};

const EmployeeForm: React.FC<EmployeeFormProps> = ({ employeeId, onSuccess }) => {
  const [employee, setEmployee] = useState<Employee>({
    employeeId: employeeId ?? 0, // Set to 0 or use a default value
    employeeName: '',
    employeeAddress: '',
    employeePhNumber: '',
  });

  const [errors, setErrors] = useState<ErrorsState>({
    employeeName: false,
    employeeAddress: false,
    employeePhNumber: false,
  });

  useEffect(() => {
    if (employeeId) {
      const fetchEmployee = async () => {
        try {
          const data = await getEmployee(employeeId);
          setEmployee(data);
        } catch (error) {
          console.error(`Error fetching employee with id ${employeeId}:`, error);
        }
      };
      fetchEmployee();
    }
  }, [employeeId]);

  const handleChange = (name: keyof Employee, value: string) => {
    setEmployee({ ...employee, [name]: value });
    setErrors({ ...errors, [name]: false }); // Reset error for the field being changed
  };

  const handleSubmit = async () => {
    const newErrors: ErrorsState = {
      employeeName: false,
      employeeAddress: employee.employeeAddress.trim() === '',
      employeePhNumber: employee.employeePhNumber.trim() === '',
    };

    if (employee.employeeName.trim() === '') {
      newErrors.employeeName = 'Name is required';
    } else if (/\d/.test(employee.employeeName)) {
      newErrors.employeeName = 'Name should not contain numbers';
    }

    if (Object.values(newErrors).some((error) => error !== false)) {
      setErrors(newErrors);
      Alert.alert('Please fix the errors in the form');
      return;
    }

    try {
      if (employeeId) {
        await updateEmployee(employeeId, employee);
        Alert.alert('Employee updated');
      } else {
        await createEmployee(employee);
        Alert.alert('Employee created');
      }
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error submitting form:', error);
      Alert.alert('Error submitting form');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={[styles.input, errors.employeeName ? styles.errorInput : null]}
        value={employee.employeeName}
        onChangeText={(text) => handleChange('employeeName', text)}
      />
      {typeof errors.employeeName === 'string' && <Text style={styles.errorText}>{errors.employeeName}</Text>}

      <Text style={styles.label}>Address:</Text>
      <TextInput
        style={[styles.input, errors.employeeAddress ? styles.errorInput : null]}
        value={employee.employeeAddress}
        onChangeText={(text) => handleChange('employeeAddress', text)}
      />
      {errors.employeeAddress && <Text style={styles.errorText}>Address is required</Text>}

      <Text style={styles.label}>Phone Number:</Text>
      <TextInput
        style={[styles.input, errors.employeePhNumber ? styles.errorInput : null]}
        value={employee.employeePhNumber}
        onChangeText={(text) => handleChange('employeePhNumber', text)}
        keyboardType="phone-pad"
      />
      {errors.employeePhNumber && <Text style={styles.errorText}>Phone Number is required</Text>}

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'black',
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
    color: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    fontSize: 18,
    color: 'white',
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default EmployeeForm;
