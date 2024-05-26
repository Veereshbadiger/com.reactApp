import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { createEmployee, updateEmployee, getEmployee } from '../services/employeeService';
import { Employee } from '../types/Employee';

interface EmployeeFormProps {
  employeeId?: number; // Optional prop for updating an existing employee
  onSuccess?: () => void; // Optional callback for when the form submits successfully
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ employeeId, onSuccess }) => {
  const [employee, setEmployee] = useState<Employee>({
    employeeId: employeeId ?? 0, // Set to 0 or use a default value
    employeeName: '',
    employeeAddress: '',
    employeePhNumber: '',
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
  };

  const handleSubmit = async () => {
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
        style={styles.input}
        value={employee.employeeName}
        onChangeText={(text) => handleChange('employeeName', text)}
      />
      <Text style={styles.label}>Address:</Text>
      <TextInput
        style={styles.input}
        value={employee.employeeAddress}
        onChangeText={(text) => handleChange('employeeAddress', text)}
      />
      <Text style={styles.label}>Phone Number:</Text>
      <TextInput
        style={styles.input}
        value={employee.employeePhNumber}
        onChangeText={(text) => handleChange('employeePhNumber', text)}
        keyboardType="phone-pad"
      />
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
});

export default EmployeeForm;
