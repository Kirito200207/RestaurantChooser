import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen 
        name="(tabs)" 
        options={{ 
          headerShown: false 
        }} 
      />
      {/* 其他屏幕可以在这里添加 */}
      {/* <Stack.Screen name="details" /> */}
    </Stack>
  );
}