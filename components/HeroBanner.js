// - Full-width image carousel with dot indicators & tagline overlay.
// - Uses local images from assets/images/ for banners.
import React, { useRef, useState } from 'react';
import {
  View,
  FlatList,
  Image,
  Dimensions,
  Text,
  TouchableOpacity
} from 'react-native';
import { useTheme } from '../context/ThemeContext';

const { width } = Dimensions.get('window');

// Use local images for banners
const banners = [
  {
    image: require('../assets/images/unleash-your-style.jpeg'),
    tagline: ''
  },
  {
    image: require('../assets/images/run-the-future.jpeg'),
    tagline: ''
  },
  {
    image: require('../assets/images/classic-comfort.jpeg'),
    tagline: ''
  }
];

export default function HeroBanner() {
  const { theme } = useTheme();
  const [index, setIndex] = useState(0);
  const flatRef = useRef(); // Ref for FlatList

  const onScroll = (e) => {
    const x = e.nativeEvent.contentOffset.x;
    setIndex(Math.round(x / width));
  };

  return (
    <View style={{ marginBottom: 16 }}>
      <FlatList
        ref={flatRef}
        data={banners}
        keyExtractor={(_, i) => i.toString()}
        horizontal
        pagingEnabled // snap to each image
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        renderItem={({ item }) => (
          <View style={{ width, alignItems: 'center' }}>
            {/* Banner image */}
            <Image
              source={item.image}
              style={{
                width: width - 40,
                height: 180,
                borderRadius: 18,
                marginHorizontal: 20,
                resizeMode: 'cover'
              }}
            />
            {/* <TouchableOpacity
              style={{
                position: "absolute",
                bottom: 24,
                left: 40,
                backgroundColor: theme.mode === "light"
                  ? "rgba(243, 244, 246, 0.85)"
                  : "rgba(39, 39, 42, 0.85)",
                borderRadius: 12,
                paddingHorizontal: 10,
                paddingVertical: 2,
              }}
              onPress={() => {
                console.log("Tagline button pressed!");
              }}
              activeOpacity={0.7}
            >
              <Text
                style={{
                  color: theme.primary,
                  fontSize: 20,
                  fontWeight: "bold",
                  textShadowColor: theme.background,
                  textShadowRadius: 8,
                }}
              >
                {item.tagline}
              </Text>
            </TouchableOpacity> */}
          </View>
        )}
      />
      <View
        style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8 }}
      >
        {banners.map((_, i) => (
          <View
            key={i}
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: i === index ? theme.primary : theme.border,
              marginHorizontal: 4
            }}
          />
        ))}
      </View>
    </View>
  );
}
