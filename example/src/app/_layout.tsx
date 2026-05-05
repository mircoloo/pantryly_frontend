import { Stack } from 'expo-router';

import { AuthProvider } from '@/context/auth-context';
import { PantryProvider } from '@/context/pantry-context';

export default function RootLayout() {
  return (
    <AuthProvider>
      <PantryProvider>
        <Stack initialRouteName="login">
          <Stack.Screen
            name="login"
            options={{
              title: 'Login',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="index"
            options={{
              title: 'Scan Product',
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="pantry"
            options={{
              title: 'My Pantry',
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="product/[barcode]"
            options={{
              title: 'Product Details',
              headerShown: true,
            }}
          />
        </Stack>
      </PantryProvider>
    </AuthProvider>
  );
}