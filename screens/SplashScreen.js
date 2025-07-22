import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Easing
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const { width } = Dimensions.get('window');

export default function SplashScreen() {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { user, authLoading } = useAuth();
  const splashAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(splashAnim, {
        toValue: 1.12,
        duration: 320,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true
      }),
      Animated.spring(splashAnim, {
        toValue: 1,
        friction: 4,
        tension: 80,
        useNativeDriver: true
      })
    ]).start();
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: false
    }).start();
    const timeout = setTimeout(() => {
      if (authLoading) return;
      if (user) {
        navigation.replace('Home');
      } else {
        navigation.replace('Login');
      }
    }, 2000);
    return () => clearTimeout(timeout);
  }, [user, authLoading]);

  const barWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width * 0.4]
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Animated.View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          transform: [
            {
              scale: splashAnim
            }
          ]
        }}
      >
        <Text style={[styles.title, { color: theme.primary }]}>yoKi</Text>
      </Animated.View>
      <View style={{ height: 32 }} />
      <View style={styles.barContainer}>
        <Animated.View
          style={[
            styles.bar,
            {
              backgroundColor: theme.primary,
              width: barWidth
            }
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 54,
    fontWeight: 'bold',
    letterSpacing: 2,
    textShadowColor: '#0008',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8
  },
  barContainer: {
    width: width * 0.4,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e5e7eb',
    overflow: 'hidden',
    alignSelf: 'center'
  },
  bar: {
    height: 8,
    borderRadius: 4
  }
});
