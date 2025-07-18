// - Renders selectable color swatches for a product.
// - Used in ProductDetailScreen.
import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useShop } from "../context/ShopContext";

export default function ColorSwatches({ productId, colors }) {
  const { theme } = useTheme();
  const { selections, setSelection } = useShop();
  const selected = selections[productId]?.color;

  return (
    <View style={{ flexDirection: "row", gap: 8, marginVertical: 8 }}>
      {colors.map(color => {
        const isActive = selected === color;
        return (
          <TouchableOpacity
            key={color}
            onPress={() => setSelection(productId, { color })}
            accessibilityRole="button"
            style={{
              width: 28,
              height: 28,
              borderRadius: 14,
              backgroundColor: color,
              borderWidth: isActive ? 2 : 1,
              borderColor: isActive ? theme.primary : theme.border,
              marginRight: 8
            }}
          />
        );
      })}
    </View>
  );
}
