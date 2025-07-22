// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD4ZBPPXOVu0MRNIu-zfBq-O6pCRbVBe20',
  authDomain: 'shopping-app-1-a75fd.firebaseapp.com',
  projectId: 'shopping-app-1-a75fd',
  storageBucket: 'shopping-app-1-a75fd.firebasestorage.app',
  messagingSenderId: '1045390072379',
  appId: '1:1045390072379:web:2e816f39c77f835f421a1e',
  measurementId: 'G-MVCPC6KY5Z'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
