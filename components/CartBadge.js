// - badge with the cart item count
// - Used in Header 
// - Can be reused
import React from "react";
import { View, Text } from "react-native";

export default function CartBadge({ count, color = "#e11d48" }) {
  if (!count) return null;
  return (
    <View
      style={{
        position: "absolute",
        top: -4,
        right: -8,
        backgroundColor: color,
        borderRadius: 8,
        paddingHorizontal: 4,
        minWidth: 16,
        alignItems: "center"
      }}
    >
      <Text style={{ color: "#fff", fontSize: 12, fontWeight: "bold" }}>{count}</Text>
    </View>
  );
}
