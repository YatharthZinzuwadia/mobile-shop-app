// - Card with image, title, price, rating, and like button.
// - Like toggles fill, image on light-gray BG, subtle shadow.
// - Used in HomeScreen grid, navigates to ProductDetail on press.
import React from 'react';
import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useShop } from '../context/ShopContext';
import { useNavigation } from '@react-navigation/native';
import { productImages } from './productImages';

export default function ProductCard({ product, navigation: navProp }) {
  const { theme } = useTheme();
  const { favourites, toggleFavourite } = useShop();
  const navigation = navProp || useNavigation();
  const isFav = favourites.includes(product.id);

  // 'assets/images/nike-air-jordan.png' => 'nike-air-jordan.png'
  const getImageKey = (imagePath) => {
    if (!imagePath) return null;
    const parts = imagePath.split('/');
    return parts[parts.length - 1];
  };
  const imageKey = getImageKey(product.image);

  return (
    <TouchableOpacity
      style={{
        width: 160,
        height: 210,
        borderRadius: 18,
        backgroundColor: theme.card,
        margin: 8,
        overflow: 'hidden',
        shadowColor: theme.text,
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 2
      }}
      onPress={() => navigation.navigate('ProductDetail', { product })}
      accessibilityRole="button"
      activeOpacity={0.85}
    >
      <View
        style={{
          width: '100%',
          height: 130,
          backgroundColor: theme.input,
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}
        pointerEvents="box-none"
      >
        <Image
          source={
            productImages[imageKey] ||
            require('../assets/images/nike-air-jordan.png')
          }
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />
        <View
          style={{ position: 'absolute', top: 8, right: 8 }}
          pointerEvents="box-none"
        >
          <Pressable
            onPressIn={() => toggleFavourite(product.id)}
            accessibilityRole="button"
            style={{ padding: 4 }}
          >
            <Ionicons
              name={isFav ? 'heart' : 'heart-outline'}
              size={22}
              color={theme.primary}
            />
          </Pressable>
        </View>
      </View>
      <View style={{ flex: 1, padding: 10, justifyContent: 'center' }}>
        <Text
          style={{ fontSize: 14, fontWeight: '600', color: theme.text }}
          numberOfLines={1}
        >
          {product.title}
        </Text>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}
        >
          <Text
            style={{ fontWeight: 'bold', fontSize: 15, color: theme.primary }}
          >
            ${product.price}
          </Text>
          <Ionicons
            name="star"
            size={13}
            color={theme.secondary}
            style={{ marginLeft: 8 }}
          />
          <Text style={{ fontSize: 13, color: theme.text, marginLeft: 2 }}>
            {product.rating}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
