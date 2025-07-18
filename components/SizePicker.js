// - Renders selectable size buttons for a product.
// - Highlights selected size, updates context on press.
// - Used in ProductDetailScreen.
import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useShop } from "../context/ShopContext";

export default function SizePicker({ productId, sizes }) {
  const { theme } = useTheme();
  const { selections, setSelection } = useShop();
  const selected = selections[productId]?.size;

  return (
    <View style={{ flexDirection: "row", gap: 8, marginVertical: 8 }}>
      {sizes.map(size => {
        const isActive = selected === size;
        return (
          <TouchableOpacity
            key={size}
            onPress={() => setSelection(productId, { size })}
            accessibilityRole="button"
            style={{
              backgroundColor: isActive ? theme.primary : theme.card,
              borderRadius: 8,
              paddingHorizontal: 14,
              paddingVertical: 8,
              marginRight: 8
            }}
          >
            <Text
              style={{
                color: isActive ? "#fff" : theme.text,
                fontWeight: isActive ? "bold" : "600",
                fontSize: 15
              }}
            >
              {size}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
