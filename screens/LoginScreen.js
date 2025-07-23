import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Animated
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function LoginScreen({ navigation }) {
  const { signIn, authLoading } = useAuth();
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Splash drop animation
  const dropAnim = useRef(new Animated.Value(-120)).current;
  useEffect(() => {
    Animated.spring(dropAnim, {
      toValue: 0,
      friction: 7,
      tension: 60,
      useNativeDriver: true
    }).start();
  }, []);

  const handleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await signIn(email, password);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        padding: 24,
        backgroundColor: theme.background
      }}
    >
      <Animated.View
        style={{
          alignItems: 'center',
          marginBottom: 8,
          transform: [{ translateY: dropAnim }]
        }}
      >
        <Text
          style={{
            fontSize: 54,
            fontWeight: 'bold',
            color: theme.primary,
            marginBottom: 4,
            marginTop: -32,
            letterSpacing: 2,
            textShadowColor: '#0008',
            textShadowOffset: { width: 2, height: 2 },
            textShadowRadius: 8
          }}
        >
          yoKi
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: theme.text,
            opacity: 0.7,
            marginBottom: 16,
            textAlign: 'center'
          }}
        >
          Welcome back! Log in to continue your shopping journey.
        </Text>
      </Animated.View>
      <Text
        style={{
          fontSize: 32,
          fontWeight: 'bold',
          marginBottom: 24,
          color: theme.text
        }}
      >
        Login
      </Text>
      <TextInput
        placeholder="Email"
        placeholderTextColor={theme.placeholder}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{
          borderWidth: 1,
          borderColor: theme.border,
          color: theme.text,
          backgroundColor: theme.input,
          borderRadius: 8,
          marginBottom: 16,
          padding: 12
        }}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor={theme.placeholder}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          borderWidth: 1,
          borderColor: theme.border,
          color: theme.text,
          backgroundColor: theme.input,
          borderRadius: 8,
          marginBottom: 16,
          padding: 12
        }}
      />
      {error ? (
        <Text style={{ color: theme.primary, marginBottom: 12 }}>{error}</Text>
      ) : null}
      <TouchableOpacity
        onPress={handleLogin}
        style={{
          backgroundColor: theme.primary,
          padding: 16,
          borderRadius: 8,
          alignItems: 'center',
          marginBottom: 12
        }}
        disabled={loading || authLoading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Login</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.replace('Signup')}>
        <Text style={{ color: theme.primary, textAlign: 'center' }}>
          Don't have an account? Sign up
        </Text>
      </TouchableOpacity>
    </View>
  );
}
