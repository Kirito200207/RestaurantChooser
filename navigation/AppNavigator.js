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
      {/* 主标签页导航（全屏模式） */}
      <Stack.Screen
        name="MainTabs"
        component={TabsNavigator}
        options={{
          animationTypeForReplace: 'pop',
          statusBarColor: '#6200ea', // Android状态栏颜色
          statusBarTranslucent: false,
        }}
      />

      {/* 添加餐厅页（模态框样式） */}
      <Stack.Screen
        name="AddScreen"
        component={AddScreen}
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
          gestureEnabled: true,
          cardOverlayEnabled: true,
          cardStyle: { backgroundColor: 'transparent' },
          headerShown: true, // 显示模态框标题栏
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