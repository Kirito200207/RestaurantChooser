import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';

const PeopleScreen = () => {
  const [people, setPeople] = useState([]);
  const [newPerson, setNewPerson] = useState('');

  
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

  const addPerson = () => {
    if (!newPerson.trim()) {
      Alert.alert('Validation Error', 'Name cannot be empty!');
      return;
    }

    const updatedPeople = [...people, newPerson.trim()];
    setPeople(updatedPeople);
    savePeople(updatedPeople);
    setNewPerson('');
  };

  const removePerson = (index) => {
    const updatedPeople = people.filter((_, i) => i !== index);
    setPeople(updatedPeople);
    savePeople(updatedPeople);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>People Management</Text>

      {/* Input Section */}
      <CustomTextInput
        label="Full Name"
        placeholder="John Doe"
        value={newPerson}
        onChangeText={setNewPerson}
        maxLength={30}
      />

      <CustomButton
        text="Add Person"
        onPress={addPerson}
        width="90%"
        disabled={!newPerson.trim()}
      />

      {/* People List */}
      <FlatList
        data={people}
        keyExtractor={(_, index) => `person-${index}`}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item, index }) => (
          <View style={styles.listItem}>
            <Text style={styles.personName}>{item}</Text>
            <TouchableOpacity
              onPress={() => removePerson(index)}
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