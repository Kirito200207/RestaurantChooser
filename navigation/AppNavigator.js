import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabsNavigator from './TabsNavigator';
import AddScreen from '../screens/AddScreen';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="MainTabs"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        gestureEnabled: true,
      }}
    >
      <Stack.Screen
        name="MainTabs"
        component={TabsNavigator}
        options={{
          animationTypeForReplace: 'pop',
          statusBarColor: '#6200ea',
          statusBarTranslucent: false,
        }}
      />

      <Stack.Screen
        name="AddScreen"
        component={AddScreen}
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
          headerShown: true,
          headerTitle: 'Add Restaurant',
          headerStyle: {
            backgroundColor: '#6200ea',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
};