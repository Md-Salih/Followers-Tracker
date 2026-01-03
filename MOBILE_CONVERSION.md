# 📱 Mobile App Conversion Guide

## Overview

This guide explains how to convert the Instagram Followers Tracker web application into native iOS and Android mobile apps using React Native.

---

## Table of Contents
1. [Project Structure](#project-structure)
2. [Setup React Native](#setup-react-native)
3. [Code Sharing Strategy](#code-sharing-strategy)
4. [Platform-Specific Implementations](#platform-specific-implementations)
5. [Navigation Setup](#navigation-setup)
6. [Native Features](#native-features)
7. [Build and Release](#build-and-release)

---

## Project Structure

### Reorganized Structure
```
instagram-followers-tracker/
├── shared/                  # Shared code (100% reusable)
│   ├── api/                # API client
│   ├── hooks/              # Custom React hooks
│   ├── stores/             # State management (Zustand)
│   ├── utils/              # Utility functions
│   ├── types/              # TypeScript types
│   └── constants/          # Constants and config
├── web/                    # Web-specific (Next.js)
│   ├── pages/
│   ├── components/
│   └── styles/
├── mobile/                 # Mobile-specific (React Native)
│   ├── src/
│   │   ├── screens/        # Mobile screens
│   │   ├── components/     # Mobile components
│   │   ├── navigation/     # React Navigation
│   │   └── native/         # Native modules
│   ├── android/
│   ├── ios/
│   └── app.json
└── backend/                # Shared backend
```

---

## Setup React Native

### 1. Create React Native Project

```bash
# Install React Native CLI
npm install -g react-native-cli

# Create new project
npx react-native init InstaTrackerMobile --template react-native-template-typescript

cd InstaTrackerMobile
```

### 2. Install Dependencies

```bash
# Core dependencies
npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context
npm install @tanstack/react-query zustand
npm install axios date-fns

# UI components
npm install react-native-vector-icons
npm install react-native-reanimated react-native-gesture-handler
npm install @shopify/flash-list

# Native features
npm install @react-native-async-storage/async-storage
npm install react-native-push-notification
npm install react-native-biometrics
npm install react-native-keychain

# Charts
npm install victory-native react-native-svg

# Dev dependencies
npm install --save-dev @types/react-native-vector-icons
```

### 3. Link Native Dependencies

```bash
# iOS
cd ios && pod install && cd ..

# Run on iOS
npx react-native run-ios

# Run on Android
npx react-native run-android
```

---

## Code Sharing Strategy

### Extract Shared Logic

#### 1. API Client (`shared/api/client.ts`)

```typescript
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://api.yourapp.com/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Request interceptor
apiClient.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem('auth_token');
      // Navigate to login
    }
    return Promise.reject(error);
  }
);
```

#### 2. Hooks (`shared/hooks/useFollowers.ts`)

```typescript
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiClient } from '../api/client';

export function useFollowers(options = {}) {
  return useQuery({
    queryKey: ['followers', options],
    queryFn: async () => {
      const { data } = await apiClient.get('/followers', { params: options });
      return data;
    },
  });
}

export function useSyncFollowers() {
  return useMutation({
    mutationFn: async () => {
      const { data } = await apiClient.post('/followers/sync');
      return data;
    },
  });
}
```

#### 3. State Management (`shared/stores/userStore.ts`)

```typescript
import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserState {
  user: any | null;
  isAuthenticated: boolean;
  setUser: (user: any) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: true }),
  logout: async () => {
    await AsyncStorage.removeItem('auth_token');
    set({ user: null, isAuthenticated: false });
  },
}));
```

---

## Platform-Specific Implementations

### Navigation Setup (`mobile/src/navigation/RootNavigator.tsx`)

```typescript
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

// Screens
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import FollowersScreen from '../screens/FollowersScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Dashboard') iconName = 'home';
          else if (route.name === 'Followers') iconName = 'people';
          else if (route.name === 'Analytics') iconName = 'stats-chart';
          else if (route.name === 'Profile') iconName = 'person';
          
          return <Icon name={`${iconName}${focused ? '' : '-outline'}`} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#8B5CF6',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Followers" component={FollowersScreen} />
      <Tab.Screen name="Analytics" component={AnalyticsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export function RootNavigator() {
  const { isAuthenticated } = useUserStore();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <Stack.Screen name="Main" component={MainTabs} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

### Example Screen (`mobile/src/screens/FollowersScreen.tsx`)

```typescript
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useFollowers, useSyncFollowers } from '../../../shared/hooks/useFollowers';

export default function FollowersScreen() {
  const [filter, setFilter] = useState('all');
  const { data, isLoading, refetch } = useFollowers({ filter });
  const syncMutation = useSyncFollowers();

  const handleSync = () => {
    syncMutation.mutate(undefined, {
      onSuccess: () => refetch(),
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Followers</Text>
        <TouchableOpacity onPress={handleSync} style={styles.syncButton}>
          <Text style={styles.syncText}>Sync</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filters}>
        {['all', 'recent', 'mutual', 'ghost'].map((f) => (
          <TouchableOpacity
            key={f}
            onPress={() => setFilter(f)}
            style={[styles.filterButton, filter === f && styles.activeFilter]}
          >
            <Text style={styles.filterText}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlashList
        data={data?.followers || []}
        renderItem={({ item }) => (
          <View style={styles.followerItem}>
            <Text style={styles.username}>{item.username}</Text>
            <Text style={styles.engagementScore}>
              Score: {item.engagementScore}
            </Text>
          </View>
        )}
        estimatedItemSize={80}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  syncButton: {
    backgroundColor: '#8B5CF6',
    padding: 8,
    borderRadius: 8,
  },
  syncText: {
    color: '#fff',
    fontWeight: '600',
  },
  filters: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
  },
  filterButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
  },
  activeFilter: {
    backgroundColor: '#8B5CF6',
  },
  filterText: {
    color: '#000',
  },
  followerItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
  },
  engagementScore: {
    fontSize: 14,
    color: '#6b7280',
  },
});
```

---

## Native Features

### 1. Instagram OAuth (Deep Linking)

#### Configure Deep Links

**iOS (ios/InstaTrackerMobile/Info.plist):**
```xml
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>instatracker</string>
    </array>
  </dict>
</array>
```

**Android (android/app/src/main/AndroidManifest.xml):**
```xml
<intent-filter>
  <action android:name="android.intent.action.VIEW" />
  <category android:name="android.intent.category.DEFAULT" />
  <category android:name="android.intent.category.BROWSABLE" />
  <data android:scheme="instatracker" />
</intent-filter>
```

#### Handle OAuth (`mobile/src/auth/InstagramAuth.ts`)

```typescript
import { Linking } from 'react-native';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';

export async function loginWithInstagram() {
  const authUrl = 'https://api.instagram.com/oauth/authorize?...';
  
  if (await InAppBrowser.isAvailable()) {
    const result = await InAppBrowser.openAuth(authUrl, 'instatracker://callback');
    
    if (result.type === 'success' && result.url) {
      const code = new URL(result.url).searchParams.get('code');
      // Exchange code for token
      return exchangeCodeForToken(code);
    }
  }
}
```

### 2. Push Notifications

```typescript
import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: true,
});

export function sendLocalNotification(title, message) {
  PushNotification.localNotification({
    title,
    message,
    playSound: true,
    soundName: 'default',
  });
}
```

### 3. Biometric Authentication

```typescript
import ReactNativeBiometrics from 'react-native-biometrics';

export async function authenticateWithBiometrics() {
  const { available } = await ReactNativeBiometrics.isSensorAvailable();
  
  if (available) {
    const { success } = await ReactNativeBiometrics.simplePrompt({
      promptMessage: 'Authenticate to continue',
    });
    return success;
  }
  
  return false;
}
```

---

## Build and Release

### iOS Build

```bash
# 1. Install dependencies
cd ios && pod install && cd ..

# 2. Open Xcode
open ios/InstaTrackerMobile.xcworkspace

# 3. Configure signing
# - Select project in Xcode
# - Choose team
# - Select provisioning profile

# 4. Archive and upload to App Store Connect
```

### Android Build

```bash
# 1. Generate release keystore
keytool -genkeypair -v -keystore android/app/release.keystore -alias release -keyalg RSA -keysize 2048 -validity 10000

# 2. Build release APK
cd android
./gradlew assembleRelease

# 3. Build App Bundle (for Play Store)
./gradlew bundleRelease

# Output: android/app/build/outputs/bundle/release/app-release.aab
```

---

## Testing

### Unit Tests

```bash
npm test
```

### E2E Tests (Detox)

```bash
npm install --save-dev detox
detox test --configuration ios.sim.debug
```

---

## Performance Optimization

1. **Use FlashList instead of FlatList**
2. **Lazy load images**
3. **Memoize expensive computations**
4. **Use React.memo for components**
5. **Optimize bundle size with Hermes**

---

## Conversion Checklist

- [ ] Extract shared code to `shared/` directory
- [ ] Set up React Native project
- [ ] Implement navigation with React Navigation
- [ ] Convert UI components to React Native
- [ ] Set up deep linking for OAuth
- [ ] Implement push notifications
- [ ] Add biometric authentication
- [ ] Configure app icons and splash screens
- [ ] Test on iOS and Android devices
- [ ] Set up CI/CD for mobile builds
- [ ] Submit to App Store and Google Play

---

**Estimated Timeline:** 6-8 weeks for full conversion
