// - Main entry screen: header, search, hero banner, category tabs, product grid.
// - Filters products by category and search.
// - Navigates to ProductDetail on card tap.
import React, { useState, useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import HeroBanner from '../components/HeroBanner';
import CategoryTabs from '../components/CategoryTabs';
import ProductCard from '../components/ProductCard';
import { useTheme } from '../context/ThemeContext';
import productsData from '../data/products.json';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const { theme } = useTheme();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [products, setProducts] = useState([]);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  useEffect(() => {
    setProducts(productsData);
  }, []);

  const filtered = products.filter((p) => {
    const matchCat = category === 'All' || p.category === category;
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

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
      <Header activeScreen="Home" />
      {/* Search bar */}
      <SearchBar value={search} onChange={setSearch} />
      {/* HeroBanner */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 24, paddingHorizontal: 4 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ProductCard product={item} navigation={navigation} />
        )}
        ListHeaderComponent={
          <>
            {search.trim() === '' && <HeroBanner />}
            <View
              style={{
                backgroundColor: theme.background,
                zIndex: 1,
                marginTop: 4
              }}
            >
              <CategoryTabs active={category} onChange={setCategory} />
            </View>
          </>
        }
        ListHeaderComponentStyle={{ marginBottom: 0 }}
        ListEmptyComponent={
          <Text
            style={{ color: theme.text, textAlign: 'center', marginTop: 40 }}
          >
            No products found.
          </Text>
        }
      />
    </View>
  );
}
