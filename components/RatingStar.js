// - Displays a star icon and rating value.
// - Used in ProductCard and ProductDetailScreen.
import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function RatingStar({ rating }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Ionicons name="star" size={15} color="#fbbf24" />
      <Text style={{ fontSize: 14, marginLeft: 2 }}>{rating}</Text>
    </View>
  );
}
