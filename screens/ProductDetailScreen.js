// - Shows product details: hero image, like, price, rating, size/color pickers, CTAs, description.
// - Shared-element style fade-in for hero image.
// - All interactions update context and UI instantly.
import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../components/Header';
import SizePicker from '../components/SizePicker';
import ColorSwatches from '../components/ColorSwatches';
import { useTheme } from '../context/ThemeContext';
import { useShop } from '../context/ShopContext';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { productImages } from '../components/productImages';

export default function ProductDetailScreen({ route }) {
  const { product } = route.params;
  const { theme } = useTheme();
  const {
    favourites,
    toggleFavourite,
    cart,
    addToCart,
    selections,
    setSelection
  } = useShop(); // Get shop state/actions
  const isFav = favourites.includes(product.id);
  const inCart = cart.includes(product.id);
  const selected = selections[product.id] || {};
  const insets = useSafeAreaInsets();

  // unsure why ReactNative does not let string Paths like standard react be used in components, so made static list of string paths and used helpers
  // extract filename from product.image (e.g., 'assets/images/nike-air-jordan.png' => 'nike-air-jordan.png')
  const getImageKey = (imagePath) => {
    if (!imagePath) return null;
    const parts = imagePath.split('/');
    return parts[parts.length - 1];
  };
  const imageKey = getImageKey(product.image);

  const requiredParams = [];
  if (product.sizes) requiredParams.push('size');
  if (product.colors) requiredParams.push('color');

  useEffect(() => {
    let changed = false;
    const newSelection = { ...selected };
    if (product.sizes && !selected.size) {
      newSelection.size = product.sizes[0];
      changed = true;
    }
    if (product.colors && !selected.color) {
      newSelection.color = product.colors[0];
      changed = true;
    }
    if (changed) setSelection(product.id, newSelection);
  }, [product.id]);

  const canAddToCart = requiredParams.every((key) => selected[key]);

  const handleAddToCart = () => {
    if (!canAddToCart) return;
    addToCart(product.id, selected);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  // Handle buy now (demo, for now just add to cart)
  const handleBuyNow = () => {
    if (!canAddToCart) return;
    addToCart(product.id, selected);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.background,
        paddingTop: insets.top,
        paddingBottom: insets.bottom
      }}
    >
      {/* App header */}
      <Header />
      <ScrollView
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ alignItems: 'center', marginBottom: 24 }}>
          <View
            style={{
              width: 220,
              height: 180,
              borderRadius: 28,
              backgroundColor: theme.card,
              justifyContent: 'center',
              alignItems: 'center',
              shadowColor: theme.primary,
              shadowOpacity: 0.18,
              shadowRadius: 16,
              elevation: 6,
              overflow: 'hidden'
            }}
          >
            {/* Product image */}
            <Image
              source={
                productImages[imageKey] ||
                require('../assets/images/nike-air-jordan.png')
              }
              style={{
                width: '100%',
                height: '100%'
                // transform: [{ rotate: '8deg' }]
              }}
              resizeMode="cover"
            />
            {/* Like icon */}
            <TouchableOpacity
              onPress={() => toggleFavourite(product.id)}
              accessibilityRole="button"
              style={{ position: 'absolute', right: -36, top: 60 }}
            >
              <Ionicons
                name={isFav ? 'heart' : 'heart-outline'}
                size={32}
                color={theme.background}
                style={{ opacity: 0.9 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* price, old price, rating */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 8
          }}
        >
          <Text
            style={{ fontSize: 28, fontWeight: 'bold', color: theme.primary }}
          >
            ${product.price}
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: theme.text,
              textDecorationLine: 'line-through',
              marginLeft: 12,
              opacity: 0.5
            }}
          >
            ${product.oldPrice}
          </Text>
          <Ionicons
            name="star"
            size={20}
            color={theme.secondary}
            style={{ marginLeft: 16 }}
          />
          <Text style={{ fontSize: 16, color: theme.text, marginLeft: 2 }}>
            {product.rating}
          </Text>
        </View>
        <SizePicker productId={product.id} sizes={product.sizes} />
        <ColorSwatches productId={product.id} colors={product.colors} />
        {/* CTA buttons */}
        <View style={{ flexDirection: 'row', marginVertical: 16 }}>
          <TouchableOpacity
            onPress={handleAddToCart}
            accessibilityRole="button"
            style={{
              flex: 1,
              borderWidth: 2,
              borderColor: theme.primary,
              borderRadius: 12,
              paddingVertical: 14,
              marginRight: 10,
              alignItems: 'center',
              opacity: canAddToCart ? 1 : 0.5
            }}
            disabled={!canAddToCart}
          >
            <Text
              style={{ color: theme.primary, fontWeight: 'bold', fontSize: 16 }}
            >
              {inCart ? 'In Cart' : 'Add to Cart'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleBuyNow}
            accessibilityRole="button"
            style={{
              flex: 1,
              backgroundColor: theme.primary,
              borderRadius: 12,
              paddingVertical: 14,
              alignItems: 'center',
              opacity: canAddToCart ? 1 : 0.5
            }}
            disabled={!canAddToCart}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
              Buy Now
            </Text>
          </TouchableOpacity>
        </View>
        {/* description */}
        <Text
          style={{
            color: theme.text,
            fontSize: 15,
            lineHeight: 22,
            marginBottom: 24
          }}
          numberOfLines={3}
        >
          {product.description}
        </Text>
      </ScrollView>
    </View>
  );
}
