import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, usePathname } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Mock authentication state (replace with actual auth logic later)
const useAuth = () => {
  // Replace this with your actual authentication state logic
  // For now, assume the user is not authenticated
  return { isAuthenticated: false };
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Custom hook to handle navigation based on auth state
const useProtectedRoute = (isAuthenticated: boolean) => {
  const pathname = usePathname(); // Get the current route path
  const router = useRouter();

  useEffect(() => {
    const isAuthScreen = pathname === '/login' || pathname === '/signup';
    const isOnboardingScreen = pathname.startsWith('/onboarding'); // Check if it's an onboarding screen

    if (isAuthenticated && (isAuthScreen || isOnboardingScreen)) {
      // Redirect authenticated users away from auth/onboarding screens to the main app
      router.replace('/(tabs)'); 
    }
    // Redirect unauthenticated users to login ONLY IF they are NOT on auth screens AND NOT on onboarding screens
    if (!isAuthenticated && !isAuthScreen && !isOnboardingScreen && pathname !== '/') { 
        router.replace('/login'); 
    }

  }, [isAuthenticated, pathname, router]);
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { isAuthenticated } = useAuth(); // Get auth state
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useProtectedRoute(isAuthenticated); // Apply protected route logic

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack initialRouteName="login">
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen 
          name="signup" 
          options={{ 
            title: '회원가입',
            headerShown: true,
            headerStyle: { backgroundColor: '#121212' },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: { fontWeight: 'bold' },
            headerBackTitle: '',
          }} 
        />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
