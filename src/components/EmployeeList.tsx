import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import { getAllEmployees, deleteEmployee } from '../services/employeeService';

interface Employee {
  employeeId: number;
  employeeName: string;
  employeeAddress: string;
  employeePhNumber: string;
}

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getAllEmployees();
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (employeeId: number) => {
    try {
      await deleteEmployee(employeeId);
      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee.employeeId !== employeeId)
      );
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {employees.map((item) => (
        <View key={item.employeeId} style={styles.itemContainer}>
          <Text style={styles.name}>{item.employeeName}</Text>
          <Text style={styles.name}>"hello"</Text>
          <Text style={styles.address}>{item.employeeAddress}</Text>
          <Text style={styles.phone}>{item.employeePhNumber}</Text>
          <Button title="Delete" onPress={() => handleDelete(item.employeeId)} />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black', // Set background color to black
  },
  itemContainer: {
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#ffffff', // White background for better contrast
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2, // For Android shadow
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  address: {
    fontSize: 16,
    color: 'black',
  },
  phone: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default EmployeeList;
