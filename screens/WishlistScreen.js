// - Shows all products the user has added to their wishlist (favorites).
// - Each item is clickable and has a 'Buy Now' CTA.
// - Animated entry and empty state.
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useShop } from '../context/ShopContext';
import { productImages } from '../components/productImages';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import productsData from '../data/products.json';

export default function WishlistScreen() {
  const { theme } = useTheme();
  const { favourites, addToCart } = useShop();
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true
    }).start();
  }, [favourites]);

  const products = productsData.filter((p) => favourites.includes(p.id));

  if (products.length === 0) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: theme.background
        }}
      >
        <Header activeScreen="Wishlist" />
        <View style={[styles.center, { flex: 1 }]}>
          <Animated.View style={{ opacity: fadeAnim }}>
            <Text
              style={{
                color: theme.text,
                fontSize: 20,
                marginBottom: 12,
                textAlign: 'center'
              }}
            >
              Your wishlist is empty!
            </Text>
            <Text
              style={{
                color: theme.placeholder,
                fontSize: 16,
                textAlign: 'center'
              }}
            >
              Tap the heart icon on a product to add it here.
            </Text>
          </Animated.View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background
      }}
    >
      <Header activeScreen="Wishlist" />
      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.card,
                { backgroundColor: theme.card, borderColor: theme.border }
              ]}
              activeOpacity={0.85}
              onPress={() =>
                navigation.navigate('ProductDetail', { product: item })
              }
            >
              <Image
                source={
                  productImages[item.image.split('/').pop()] ||
                  require('../assets/images/nike-air-jordan.png')
                }
                style={styles.image}
                resizeMode="cover"
              />
              <View style={{ flex: 1, marginLeft: 16 }}>
                <Text
                  style={{
                    color: theme.text,
                    fontWeight: 'bold',
                    fontSize: 16
                  }}
                  numberOfLines={1}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    color: theme.primary,
                    fontWeight: 'bold',
                    fontSize: 15,
                    marginVertical: 4
                  }}
                >
                  $ {item.price}
                </Text>
                {/* Buy Now CTA: adds to cart */}
                <TouchableOpacity
                  style={[styles.buyBtn, { backgroundColor: theme.primary }]}
                  onPress={() => {
                    // Ensure required params are set to default before adding to cart
                    // This ensures that when a user adds a product from the wishlist,
                    // it always has valid size/color (or other required options) set to the first available value.
                    const options = {};
                    if (item.sizes && item.sizes.length > 0)
                      options.size = item.sizes[0]; // Default to first size
                    if (item.colors && item.colors.length > 0)
                      options.color = item.colors[0]; // Default to first color
                    addToCart(item.id, options); // Add to cart with defaults
                  }}
                >
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                    Buy Now
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        />
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 1
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 12
  },
  buyBtn: {
    marginTop: 8,
    alignSelf: 'flex-start',
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 8
  }
});
