import AsyncStorage from '@react-native-async-storage/async-storage';

const PEOPLE_KEY = 'people';
const RESTAURANTS_KEY = 'restaurants';

class DataManager {
  static async getPeople() {
    try {
      const jsonValue = await AsyncStorage.getItem(PEOPLE_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.error('Error getting people', e);
      return [];
    }
  }

  static async savePeople(people) {
    try {
      const jsonValue = JSON.stringify(people);
      await AsyncStorage.setItem(PEOPLE_KEY, jsonValue);
    } catch (e) {
      console.error('Error saving people', e);
    }
  }

  static async getRestaurants() {
    try {
      const jsonValue = await AsyncStorage.getItem(RESTAURANTS_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.error('Error getting restaurants', e);
      return [];
    }
  }

  static async saveRestaurants(restaurants) {
    try {
      const jsonValue = JSON.stringify(restaurants);
      await AsyncStorage.setItem(RESTAURANTS_KEY, jsonValue);
    } catch (e) {
      console.error('Error saving restaurants', e);
    }
  }
}

export default DataManager;