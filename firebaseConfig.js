// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from 'firebase/app';
import { Platform } from 'react-native';

const firebaseConfig = {
  apiKey: 'AIzaSyD4ZBPPXOVu0MRNIu-zfBq-O6pCRbVBe20',
  authDomain: 'shopping-app-1-a75fd.firebaseapp.com',
  projectId: 'shopping-app-1-a75fd',
  storageBucket: 'shopping-app-1-a75fd.firebasestorage.app',
  messagingSenderId: '1045390072379',
  appId: '1:1045390072379:web:2e816f39c77f835f421a1e',
  measurementId: 'G-MVCPC6KY5Z'
};

let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

let auth;
if (Platform.OS !== 'web') {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
} else {
  const { getAuth } = require('firebase/auth');
  auth = getAuth(app);
}

export { app, auth };
