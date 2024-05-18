import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { getAllEmployees, deleteEmployee } from '../services/employeeService';

interface Employee {
  employeeId: number;
  employeeName: string;
  employeeAddress: string;
  employeePhNumber: string;
}

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]); // Typing the state with Employee[]

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
    <FlatList
      data={employees}
      keyExtractor={(item) => item.employeeId.toString()}
      renderItem={({ item }) => (
        <View>
          <Text>{item.employeeName}</Text>
          <Text>{item.employeeAddress}</Text>
          <Text>{item.employeePhNumber}</Text>
          <Button title="Delete" onPress={() => handleDelete(item.employeeId)} />
        </View>
      )}
    />
  );
};

export default EmployeeList;
