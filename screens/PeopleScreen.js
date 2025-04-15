import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';

const PeopleScreen = () => {
  const [people, setPeople] = useState([]);
  const [newPersonName, setNewPersonName] = useState('');
  const [errors, setErrors] = useState({});

  // Add name validation function
  const validateName = (name) => {
    if (!name.trim()) {
      return "Name is required";
    }
    if (name.length < 2) {
      return "Name must be at least 2 characters";
    }
    if (!/^[a-zA-Z\s'-]+$/.test(name)) {
      return "Name can only contain letters, spaces, hyphens and apostrophes";
    }
    return null;
  };

  // Add input change handler
  const handleNameChange = (text) => {
    setNewPersonName(text);
    
    // 添加实时名称验证
    const nameError = validateName(text);
    setErrors(prev => ({
      ...prev,
      name: nameError
    }));
  };

  const addPerson = () => {
    // Validate name before adding
    const nameError = validateName(newPersonName);
    if (nameError) {
      setErrors({ name: nameError });
      Alert.alert('Validation Error', nameError);
      return;
    }

    const newPerson = {
      id: Date.now().toString(),
      name: newPersonName.trim()
    };
    const updatedPeople = [...people, newPerson];
    setPeople(updatedPeople);
    savePeople(updatedPeople);
    setNewPersonName('');
    setErrors({});
  };

  useEffect(() => {
    loadPeople();
  }, []);

  const loadPeople = async () => {
    try {
      const storedPeople = await AsyncStorage.getItem('people');
      if (storedPeople) setPeople(JSON.parse(storedPeople));
    } catch (error) {
      Alert.alert('Error', 'Failed to load people data');
    }
  };

  const savePeople = async (updatedPeople) => {
    try {
      await AsyncStorage.setItem('people', JSON.stringify(updatedPeople));
    } catch (error) {
      Alert.alert('Error', 'Failed to save people data');
    }
  };

  const removePerson = (personId) => {
    const updatedPeople = people.filter(person => person.id !== personId);
    setPeople(updatedPeople);
    savePeople(updatedPeople);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>People Management</Text>

      <CustomTextInput
        label="Full Name *"
        placeholder="Enter full name"
        value={newPersonName}
        onChangeText={handleNameChange}
        maxLength={30}
        error={errors.name}
        onBlur={() => {
          const nameError = validateName(newPersonName);
          setErrors(prev => ({
            ...prev,
            name: nameError
          }));
        }}
      />

      <CustomButton
        text="Add Person"
        onPress={addPerson}
        width="90%"
        disabled={!newPersonName.trim()}
      />

      {/* People List */}
      <FlatList
        data={people}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.personName}>{item.name}</Text>
            <TouchableOpacity
              onPress={() => removePerson(item.id)}
              style={styles.deleteButton}
            >
              <Text style={styles.deleteText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  listContainer: {
    marginTop: 15,
    paddingHorizontal: 10,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },
  personName: {
    fontSize: 16,
    color: '#444',
  },
  deleteButton: {
    padding: 8,
    borderRadius: 5,
    backgroundColor: '#ffe6e6',
  },
  deleteText: {
    color: '#ff4444',
    fontWeight: '500',
  },
});

export default PeopleScreen;