// - Entry point for the app: wraps navigation in ThemeProvider and ShopProvider.
// - Uses SafeAreaProvider to ensure SafeAreaView works correctly on all devices.
// - Sets up React Navigation (Stack) for Home and ProductDetail screens.
// - Applies theme to navigation container.
import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { ShopProvider } from './context/ShopContext';
import HomeScreen from './screens/HomeScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import WishlistScreen from './screens/WishlistScreen';
import CartScreen from './screens/CartScreen';

const Stack = createNativeStackNavigator();

// Custom navigation theme based on app theme
function ThemedNavigation() {
  const { theme } = useTheme();
  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: theme.background,
          card: theme.card,
          text: theme.text,
          border: theme.border,
          primary: theme.primary
        }
      }}
    >
      <StatusBar style={theme.mode === 'dark' ? 'light' : 'dark'} />
      <Stack.Navigator
        screenOptions={{ headerShown: false, animation: 'fade' }}
        initialRouteName="Home"
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        <Stack.Screen name="Wishlist" component={WishlistScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <ShopProvider>
          <ThemedNavigation />
        </ShopProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
