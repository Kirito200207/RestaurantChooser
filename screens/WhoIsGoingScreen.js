import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import DataManager from '../constants/DataManager';

const WhoIsGoingScreen = ({ onNext }) => {
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [people, setPeople] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPeople = async () => {
      setIsLoading(true);
      try {
        const storedPeople = await DataManager.getPeople();
        setPeople(storedPeople);
      } catch (error) {
        console.error('Error loading people:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadPeople();
  }, []);

  const togglePerson = (person) => {
    if (selectedPeople.some(p => p.id === person.id)) {
      setSelectedPeople(selectedPeople.filter(p => p.id !== person.id));
    } else {
      setSelectedPeople([...selectedPeople, person]);
    }
  };

  const handleNext = () => {
    if (selectedPeople.length === 0) {
      alert('Please select at least one person');
      return;
    }
    onNext(selectedPeople);
  };

  const renderPersonItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.personItem, selectedPeople.some(p => p.id === item.id) && styles.selectedPersonItem]}
      onPress={() => togglePerson(item)}
    >
      <Text style={[styles.personName, selectedPeople.some(p => p.id === item.id) && styles.selectedPersonName]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6200ea" />
        <Text>Loading people...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Who is going?</Text>

      {people.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No people added yet.</Text>
          <Text style={styles.emptySubtext}>Go to the People tab to add some!</Text>
        </View>
      ) : (
        <FlatList
          data={people}
          renderItem={renderPersonItem}
          keyExtractor={item => item.id}
          style={styles.list}
          contentContainerStyle={styles.listContent}
        />
      )}

      <View style={styles.footer}>
        <Text style={styles.selectedCount}>
          {selectedPeople.length} {selectedPeople.length === 1 ? 'person' : 'people'} selected
        </Text>
        <TouchableOpacity
          style={[styles.nextButton, selectedPeople.length === 0 && styles.disabledButton]}
          onPress={handleNext}
          disabled={selectedPeople.length === 0}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 16,
  },
  personItem: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    elevation: 2,
  },
  selectedPersonItem: {
    backgroundColor: '#ede7f6',
    borderColor: '#6200ea',
  },
  personName: {
    fontSize: 16,
    color: '#333',
  },
  selectedPersonName: {
    fontWeight: 'bold',
    color: '#6200ea',
  },
  footer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedCount: {
    fontSize: 14,
    color: '#666',
  },
  nextButton: {
    backgroundColor: '#6200ea',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: '#d1c4e9',
  },
  nextButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
});

export default WhoIsGoingScreen;