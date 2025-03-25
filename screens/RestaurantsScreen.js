// ... existing code ...

import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Picker } from '@react-native-picker/picker';
import { ScrollView, Platform } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';



// ... existing code ...

// ... existing code ...

// Modify the existing RestaurantsScreen to work with navigation
const RestaurantsScreen = ({ navigation }) => {
  const [restaurants, setRestaurants] = React.useState([]);
  
  // Load restaurants from AsyncStorage when component mounts
  React.useEffect(() => {
    const loadRestaurants = async () => {
      try {
        const storedData = await AsyncStorage.getItem('restaurants');
        if (storedData) {
          setRestaurants(JSON.parse(storedData));
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load restaurant data');
      }
    };
    
    loadRestaurants();
  }, []);
  
  // Function to remove a restaurant
  const handleRemove = async (id) => {
    try {
      const updatedRestaurants = restaurants.filter(restaurant => restaurant.id !== id);
      setRestaurants(updatedRestaurants);
      await AsyncStorage.setItem('restaurants', JSON.stringify(updatedRestaurants));
    } catch (error) {
      Alert.alert('Error', 'Failed to delete restaurant');
    }
  };

  // Update the handleAdd function to navigate to the AddScreen
  const handleAdd = () => {
    navigation.navigate('AddScreen');
  };

  // ... rest of the component remains the same ...

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Restaurant Management</Text>

      <CustomButton
        text="Add Restaurant"
        onPress={handleAdd}
        width="90%"
        buttonStyle={styles.addButton}
      />

      {/* 餐厅列表 */}
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.nameText}>{item.name}</Text>
            <TouchableOpacity
              onPress={() => handleRemove(item.id)}
              style={styles.deleteButton}
            >
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

// Add Screen component
class AddScreen extends React.Component {
  constructor(inProps) {
    super(inProps);
    this.state = { 
      name: "", 
      cuisine: "", 
      price: "", 
      rating: "", 
      phone: "", 
      address: "", 
      webSite: "", 
      delivery: "", 
      key: `r_${new Date().getTime()}` 
    };
  }

  // Function to save the restaurant data
  saveRestaurant = async () => {
    try {
      // Get existing restaurants
      const storedData = await AsyncStorage.getItem('restaurants');
      let restaurants = [];
      if (storedData) {
        restaurants = JSON.parse(storedData);
      }
      
      // Create new restaurant object
      const newRestaurant = {
        id: this.state.key,
        name: this.state.name,
        cuisine: this.state.cuisine,
        price: this.state.price,
        rating: this.state.rating,
        phone: this.state.phone,
        address: this.state.address,
        webSite: this.state.webSite,
        delivery: this.state.delivery
      };
      
      // Add to list and save
      restaurants.push(newRestaurant);
      await AsyncStorage.setItem('restaurants', JSON.stringify(restaurants));
      
      // Navigate back to list
      this.props.navigation.navigate('ListScreen');
    } catch (error) {
      Alert.alert('Error', 'Failed to save restaurant data');
    }
  };

  render() {
    return (
      <ScrollView style={styles.addScreenContainer}>
        <View style={styles.addScreenInnerContainer}>
          <View style={styles.addScreenFormContainer}>
            <CustomTextInput 
              label="Name" 
              maxLength={20} 
              value={this.state.name}
              onChangeText={(text) => this.setState({name: text})}
            />
            
            <Text style={styles.fieldLabel}>Cuisine</Text>
            <View style={styles.pickerContainer}>
              <Picker
                style={styles.picker}
                prompt="Cuisine"
                selectedValue={this.state.cuisine}
                onValueChange={(itemValue) => this.setState({ cuisine: itemValue })}
              >
                <Picker.Item label="" value="" />
                <Picker.Item label="Algerian" value="Algerian" />
                <Picker.Item label="American" value="American" />
                <Picker.Item label="Italian" value="Italian" />
                <Picker.Item label="Chinese" value="Chinese" />
                <Picker.Item label="Japanese" value="Japanese" />
                <Picker.Item label="Mexican" value="Mexican" />
                <Picker.Item label="Indian" value="Indian" />
                <Picker.Item label="French" value="French" />
                <Picker.Item label="Other" value="Other" />
              </Picker>
            </View>
            
            <Text style={styles.fieldLabel}>Price</Text>
            <View style={styles.pickerContainer}>
              <Picker
                style={styles.picker}
                selectedValue={this.state.price}
                prompt="Price"
                onValueChange={(itemValue) => this.setState({ price: itemValue })}
              >
                <Picker.Item label="" value="" />
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="4" value="4" />
                <Picker.Item label="5" value="5" />
              </Picker>
            </View>
            
            <Text style={styles.fieldLabel}>Rating</Text>
            <View style={styles.pickerContainer}>
              <Picker
                style={styles.picker}
                selectedValue={this.state.rating}
                prompt="Rating"
                onValueChange={(itemValue) => this.setState({ rating: itemValue })}
              >
                <Picker.Item label="" value="" />
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="4" value="4" />
                <Picker.Item label="5" value="5" />
              </Picker>
            </View>
            
            <CustomTextInput 
              label="Phone Number"
              maxLength={20}
              value={this.state.phone}
              onChangeText={(text) => this.setState({phone: text})}
            />
            
            <CustomTextInput 
              label="Address"
              maxLength={50}
              value={this.state.address}
              onChangeText={(text) => this.setState({address: text})}
            />
            
            <CustomTextInput 
              label="Web Site"
              maxLength={50}
              value={this.state.webSite}
              onChangeText={(text) => this.setState({webSite: text})}
            />
            
            <Text style={styles.fieldLabel}>Delivery?</Text>
            <View style={styles.pickerContainer}>
              <Picker
                style={styles.picker}
                prompt="Delivery?"
                selectedValue={this.state.delivery}
                onValueChange={(itemValue) => this.setState({ delivery: itemValue })}
              >
                <Picker.Item label="" value="" />
                <Picker.Item label="Yes" value="Yes" />
                <Picker.Item label="No" value="No" />
              </Picker>
            </View>
          </View>
          
          <View style={styles.addScreenButtonsContainer}>
            <CustomButton
              text="Cancel"
              onPress={() => this.props.navigation.navigate('ListScreen')}
              width="44%"
            />
            <CustomButton
              text="Save"
              onPress={this.saveRestaurant}
              width="44%"
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

// Add these additional styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  addButton: {
    marginBottom: 20,
  },
  listContainer: {
    padding: 16,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: 'white',
  },
  nameText: {
    fontSize: 18,
    fontWeight: '500',
  },
  deleteButton: {
    backgroundColor: '#ff3b30',
    padding: 8,
    borderRadius: 5,
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
  
  addScreenContainer: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
  },
  addScreenInnerContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
    width: "100%"
  },
  addScreenFormContainer: {
    width: "96%"
  },
  addScreenButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  fieldLabel: {
    marginLeft: 10,
    marginTop: 5,
    fontWeight: '500',
    color: '#4A4A4A',
  },
  pickerContainer: {
    ...Platform.select({
      ios: {},
      android: { 
        width: "96%", 
        borderRadius: 8, 
        borderColor: "#c0c0c0",
        borderWidth: 2, 
        marginLeft: 10, 
        marginBottom: 20, 
        marginTop: 4 
      }
    })
  },
  picker: {
    ...Platform.select({
      ios: { 
        width: "96%", 
        borderRadius: 8, 
        borderColor: "#c0c0c0",
        borderWidth: 2, 
        marginLeft: 10, 
        marginBottom: 20, 
        marginTop: 4 
      },
      android: {}
    })
  },
});

// Create a stack navigator
const Stack = createStackNavigator();

// Restaurant app navigator
const RestaurantNavigator = () => {
  return (
    <Stack.Navigator 
      initialRouteName="ListScreen"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="ListScreen" component={RestaurantsScreen} />
      <Stack.Screen name="AddScreen" component={AddScreen} />
    </Stack.Navigator>
  );
};

// Export the navigator instead of just the RestaurantsScreen
export default RestaurantNavigator;