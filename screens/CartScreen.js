// - Shopping cart screen with theme-aware, attractive UI.
// - Each product is shown in a colored block row with image, name, price, and quantity controls.
// - Cart summary and checkout CTA at the bottom.
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
import {
  SafeAreaView,
  useSafeAreaInsets
} from 'react-native-safe-area-context';
import Header from '../components/Header';
import productsData from '../data/products.json';
import { useNavigation } from '@react-navigation/native';

export default function CartScreen() {
  const { theme } = useTheme();
  const { cart, addToCart, removeFromCart } = useShop();
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  const products = cart
    .map((item) => {
      const product = productsData.find((p) => p.id === item.productId);
      return product ? { ...product, ...item, _product: product } : null;
    })
    .filter(Boolean);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true
    }).start();
  }, [cart]);

  const totalItems = products.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (products.length === 0) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: theme.background
        }}
      >
        <Header activeScreen="Cart" />
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
              Your cart is empty!
            </Text>
            <Text
              style={{
                color: theme.placeholder,
                fontSize: 16,
                textAlign: 'center'
              }}
            >
              Add products to your cart to see them here.
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
      <Header activeScreen="Cart" />
      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        <Text
          style={{
            fontSize: 26,
            fontWeight: 'bold',
            color: theme.text,
            margin: 24,
            marginBottom: 8
          }}
        >
          Shopping{' '}
          <Text style={{ fontWeight: 'normal', color: theme.text }}>Cart</Text>
        </Text>
        <FlatList
          data={products}
          keyExtractor={(_, idx) => String(idx)}
          contentContainerStyle={{ paddingHorizontal: 0, paddingBottom: 120 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.row, { backgroundColor: theme.card }]}
              activeOpacity={0.85}
              onPress={() =>
                navigation.navigate('ProductDetail', { product: item })
              }
            >
              <View
                style={[
                  styles.accent,
                  {
                    backgroundColor: theme.primary,
                    padding: 0,
                    margin: 0,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }
                ]}
              >
                <Image
                  source={
                    productImages[item.image.split('/').pop()] ||
                    require('../assets/images/nike-air-jordan.png')
                  }
                  style={{ width: 100, height: 110, paddingLeft: 2 }}
                  resizeMode="cover"
                />
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 16
                }}
              >
                <View style={{ flex: 1, justifyContent: 'center' }}>
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
                  {/* Show only selected options (size, color, ...future params) dynamically */}
                  {Object.entries(getCartOptions(item)).map(([key, value]) => (
                    // For each key-value pair in the cart item that is NOT a standard product field,
                    // display it as a selected option under the product price. This ensures only user-selected
                    // parameters (like size, color, or any future options) are shown, making the cart display scalable.
                    <Text
                      key={key}
                      style={{ color: theme.text, fontSize: 13, marginTop: 2 }}
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                    </Text>
                  ))}
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingRight: 10
                  }}
                >
                  <TouchableOpacity
                    style={[
                      styles.qtyBtn,
                      { backgroundColor: theme.background, marginBottom: 4 }
                    ]}
                    onPress={() =>
                      addToCart(item.productId, getCartOptions(item))
                    }
                  >
                    <Text
                      style={{
                        color: theme.text,
                        fontWeight: 'bold',
                        fontSize: 18
                      }}
                    >
                      +
                    </Text>
                  </TouchableOpacity>
                  <Text
                    style={{
                      color: theme.text,
                      fontWeight: 'bold',
                      marginVertical: 2,
                      fontSize: 16
                    }}
                  >
                    {item.quantity}
                  </Text>
                  <TouchableOpacity
                    style={[
                      styles.qtyBtn,
                      { backgroundColor: theme.background, marginTop: 4 }
                    ]}
                    onPress={() =>
                      removeFromCart(item.productId, getCartOptions(item))
                    }
                  >
                    <Text
                      style={{
                        color: theme.text,
                        fontWeight: 'bold',
                        fontSize: 18
                      }}
                    >
                      -
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        />
        <View style={[styles.summary, { backgroundColor: theme.background }]}>
          <Text style={{ color: theme.text, fontSize: 15 }}>
            {totalItems} items
          </Text>
          <Text style={{ color: theme.text, fontSize: 18, fontWeight: 'bold' }}>
            ${totalPrice}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.checkoutBtn, { backgroundColor: theme.primary }]}
          onPress={() => {
            /* Proceed to checkout */
          }}
          activeOpacity={0.85}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>
            Proceed to checkout
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    marginHorizontal: 16,
    padding: 0,
    overflow: 'hidden',
    minHeight: 100
  },
  accent: {
    width: 90,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginBottom: 8
  },
  qtyControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2
  },
  qtyBtn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#eee'
  },
  summary: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 64,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12
  },
  checkoutBtn: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 12,
    borderRadius: 32,
    alignItems: 'center',
    paddingVertical: 16,
    elevation: 2
  }
});

function getCartOptions(item) {
  const product = item._product || {};
  const productKeys = Object.keys(product);
  return Object.fromEntries(
    Object.entries(item).filter(
      ([key]) =>
        !productKeys.includes(key) && key !== 'quantity' && key !== '_product'
    )
  );
}
