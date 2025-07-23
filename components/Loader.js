import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default Loader = ({ size = 'large', style }) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.background
        },
        style
      ]}
    >
      <ActivityIndicator size={size} color={theme.primary} />
    </View>
  );
};
