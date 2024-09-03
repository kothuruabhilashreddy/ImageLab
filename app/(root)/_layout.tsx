import { Stack } from 'expo-router';

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="albums" options={{ headerShown: false }} />
      <Stack.Screen name="gallery" options={{headerShown: false}} />
    </Stack>
  );
}

export default Layout;