// - Rounded search bar with shadow and placeholder.
// - Used on HomeScreen for product search/filter.
import React from "react";
import { View, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

export default function SearchBar({ value, onChange }) {
  const { theme } = useTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: theme.input,
        borderRadius: 24,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginHorizontal: 20,
        marginTop: 8,
        marginBottom: 12,
        shadowColor: theme.text,
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 2
      }}
    >
      <Feather name="search" size={20} color={theme.placeholder} />
      <TextInput
        style={{
          flex: 1,
          marginLeft: 8,
          color: theme.text,
          fontSize: 16
        }}
        placeholder="Search product"
        placeholderTextColor={theme.placeholder}
        value={value}
        onChangeText={onChange}
        accessibilityRole="search"
        returnKeyType="search"
      />
    </View>
  );
}
