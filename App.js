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
import SplashScreen from './screens/SplashScreen';
import { Feather } from '@expo/vector-icons';
import { View, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
        initialRouteName="Splash"
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        <Stack.Screen name="Wishlist" component={WishlistScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function ThemeFAB() {
  // Floating Action Button for theme toggle
  const { theme, toggleTheme } = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <TouchableOpacity
      onPress={toggleTheme}
      activeOpacity={0.85}
      style={{
        position: 'absolute',
        bottom: (insets.bottom || 0) + 32,
        right: (insets.right || 0) + 24,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: theme.primary,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6,
        shadowColor: '#000',
        shadowOpacity: 0.18,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        zIndex: 100
      }}
    >
      <Feather
        name={theme.mode === 'dark' ? 'sun' : 'moon'}
        size={28}
        color={'#fff'}
      />
    </TouchableOpacity>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <ShopProvider>
          <View style={{ flex: 1 }}>
            {/* Main app navigation */}
            <ThemedNavigation />
            {/* Floating theme toggle button (FAB) */}
            <ThemeFAB />
          </View>
        </ShopProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
