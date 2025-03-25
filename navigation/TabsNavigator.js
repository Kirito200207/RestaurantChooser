import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useLocalSearchParams } from 'expo-router';

const Tab = createMaterialTopTabNavigator();

export default function TabsNavigator() {
  const { screen } = useLocalSearchParams();

  return (
    <Tab.Navigator
      initialRouteName={screen || 'Restaurants'}
      screenOptions={{
        tabBarLabelStyle: { fontSize: 16, fontWeight: 'bold' },
        tabBarStyle: { backgroundColor: '#6200ea' },
        tabBarIndicatorStyle: { backgroundColor: 'white', height: 3 },
      }}
    >
      <Tab.Screen 
        name="Restaurants" 
        getComponent={() => require('../screens/RestaurantsScreen').default}
      />
      <Tab.Screen 
        name="People" 
        getComponent={() => require('../screens/PeopleScreen').default}
      />
    </Tab.Navigator>
  );
}