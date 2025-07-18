// - Pill-style scrollable category tabs
// - Highlights active category
import React from "react";
import { ScrollView, TouchableOpacity, Text, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

const categories = ["All", "Running", "Sneakers", "Casual"];

export default function CategoryTabs({ active, onChange }) {
  const { theme } = useTheme();

  return (
    <ScrollView
      horizontal // allow horizontal scrolling
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 16,
        marginBottom: 8 
      }}
      bounces={false}
      overScrollMode="never"
    >
      <View style={{ flexDirection: "row" }}>
        {categories.map((cat) => {
          const isActive = active === cat;
          return (
            <TouchableOpacity
              key={cat}
              onPress={() => onChange(cat)} // call parent to change category
              accessibilityRole="button"
              style={{
                backgroundColor: isActive ? theme.primary : theme.card,
                borderRadius: 20,
                paddingHorizontal: 18,
                height: 38,
                paddingVertical: 0,
                marginRight: 12,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text
                style={{
                  color: isActive ? "#fff" : theme.text,
                  fontWeight: isActive ? "bold" : "600",
                  fontSize: 15,
                  lineHeight: 38,
                  textAlignVertical: "center"
                }}
                numberOfLines={1}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}
