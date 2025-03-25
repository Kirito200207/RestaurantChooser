// app/_layout.tsx
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from '../../navigation/AppNavigator';

export default function Layout() {
  // Expo Router 会自动注入 NavigationContainer
  // 所以这里不需要再次包裹
  return <AppNavigator />;
}