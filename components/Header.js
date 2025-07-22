// - Top bar for both screens.
// - Shows logo (SVG), favourites, cart (with badge), and theme toggle.
// - Navigation to Favourites/Cart to be updated
import React from 'react';
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useShop } from '../context/ShopContext';
import Svg, { Path } from 'react-native-svg';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function Header({ activeScreen }) {
  // Get theme colors and toggle function from context
  const { theme, toggleTheme } = useTheme();
  // Get favourites and cart state from context
  const { favourites, cart } = useShop();
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 8,
        backgroundColor: theme.background
      }}
    >
      {/* Left: Logo */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Home');
        }}
        accessibilityRole="button"
        activeOpacity={0.7}
      >
        <Text
          style={{
            color: theme.primary,
            fontSize: 28,
            fontWeight: 'bold',
            letterSpacing: 1.5
          }}
        >
          yoKi
        </Text>
      </TouchableOpacity>
      {/* Right side: Favourites, Cart, Theme toggle */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {/* Favourites icon */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Wishlist')}
          accessibilityRole="button"
          style={{ marginRight: 18 }}
        >
          <Ionicons
            name="heart"
            size={24}
            color={activeScreen === 'Wishlist' ? theme.primary : theme.text}
            style={{ opacity: activeScreen === 'Wishlist' ? 1 : 0.7 }}
          />
          {/* Badge for number of favourites */}
          {favourites.length > 0 && (
            <View
              style={{
                position: 'absolute',
                top: -4,
                right: -8,
                backgroundColor: theme.primary,
                borderRadius: 8,
                paddingHorizontal: 4
              }}
            >
              <Text style={{ color: '#fff', fontSize: 12 }}>
                {favourites.length}
              </Text>
            </View>
          )}
        </TouchableOpacity>
        {/* Cart icon */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Cart')}
          accessibilityRole="button"
          style={{ marginRight: 18 }}
        >
          <Feather
            name="shopping-cart"
            size={24}
            color={activeScreen === 'Cart' ? theme.primary : theme.text}
            style={{ opacity: activeScreen === 'Cart' ? 1 : 0.7 }}
          />
          {/* Badge for number of items in cart */}
          {cart.length > 0 && (
            <View
              style={{
                position: 'absolute',
                top: -4,
                right: -8,
                backgroundColor: theme.secondary,
                borderRadius: 8,
                paddingHorizontal: 4
              }}
            >
              <Text style={{ color: '#fff', fontSize: 12 }}>{cart.length}</Text>
            </View>
          )}
        </TouchableOpacity>
        {/* Theme toggle */}
        <TouchableOpacity
          onPress={toggleTheme}
          accessibilityRole="button"
          style={{ marginRight: 0 }}
        >
          <Feather
            name="moon"
            size={22}
            color={theme.mode === 'dark' ? theme.primary : theme.text}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
