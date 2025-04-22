import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import CustomButton from '../components/CustomButton';
import DataManager from '../constants/DataManager';

const RestaurantsScreen = ({ navigation }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load restaurants from storage when component mounts
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadRestaurants();
    });
    return unsubscribe;
  }, [navigation]);

  const loadRestaurants = async () => {
    setIsLoading(true);
    try {
      const loadedRestaurants = await DataManager.getRestaurants();
      setRestaurants(loadedRestaurants);
    } catch (error) {
      console.error("Failed to load restaurants:", error);
      Alert.alert('Error', 'Failed to load restaurants list.');
      setRestaurants([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Function to remove a restaurant
  const handleRemove = async (id) => {
    try {
      const updatedRestaurants = restaurants.filter(restaurant => restaurant.id !== id);
      setRestaurants(updatedRestaurants);
      await DataManager.saveRestaurants(updatedRestaurants);
    } catch (error) {
      Alert.alert('Error', 'Failed to delete restaurant');
    }
  };

  // Navigate to add screen
  const handleAdd = () => {
    navigation.navigate('AddScreen');
  };

  // Render a restaurant item
  const renderRestaurantItem = ({ item }) => (
    <View style={styles.listItem}>
      <View style={styles.restaurantInfo}>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.detailsText}>
          {item.style} • {item.price} • {item.rating}★ • {item.area}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => handleRemove(item.id)}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6200ea" />
        <Text>Loading restaurants...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Restaurant Management</Text>

      <CustomButton
        text="Add Restaurant"
        onPress={handleAdd}
        width="90%"
        buttonStyle={styles.addButton}
      />

      {restaurants.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No restaurants added yet.</Text>
          <Text style={styles.emptySubtext}>Add some restaurants to get started!</Text>
        </View>
      ) : (
        <FlatList
          data={restaurants}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          renderItem={renderRestaurantItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#6200ea',
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
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
  restaurantInfo: {
    flex: 1,
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  detailsText: {
    fontSize: 14,
    color: '#666',
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

export default RestaurantsScreen;
