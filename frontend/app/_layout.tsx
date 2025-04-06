import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, usePathname } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
// Import AuthProvider and useAuth from context
import { AuthProvider, useAuth } from '@/context/AuthContext'; 

// Remove the mock useAuth hook here
// const useAuth = () => { ... };

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Pass authLoading state as an argument
const useProtectedRoute = (isAuthenticated: boolean, loaded: boolean, authLoading: boolean) => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!loaded || authLoading) { 
      return;
    }

    const isAuthScreen = pathname === '/login' || pathname === '/signup';
    const isOnboardingScreen = pathname.startsWith('/onboarding');
    const isGeneratorScreen = pathname === '/generator';
    const isReportScreen = pathname === '/report';
    
    // 보호된 경로 정의를 더 명확하게 수정
    const isProtectedRoute = !isAuthScreen && 
                           !isOnboardingScreen && 
                           !isGeneratorScreen && 
                           !isReportScreen &&
                           !pathname.startsWith('/settings');

    // 인증되지 않은 사용자가 보호된 경로에 접근할 때만 로그인으로 리다이렉트
    if (!isAuthenticated && isProtectedRoute) {
      router.replace('/login');
    }
    
    // 인증된 사용자가 인증 화면에 접근할 때만 대시보드로 리다이렉트
    if (isAuthenticated && isAuthScreen) {
      router.replace('/(tabs)');
    }

  }, [isAuthenticated, pathname, router, loaded, authLoading]);
};

// Wrap the RootLayoutNav with AuthProvider
export default function RootLayout() {
    return (
        <AuthProvider>
            <RootLayoutNav />
        </AuthProvider>
    );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  // Use the real useAuth hook from context
  const { isAuthenticated, isLoading: authLoading } = useAuth(); 
  const [loaded, fontError] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Pass authLoading to the hook
  useProtectedRoute(isAuthenticated, loaded && !fontError, authLoading); 

  useEffect(() => {
    if (loaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [loaded, fontError]);

  // Handle font loading errors
   if (fontError) {
    console.error("Font loading error:", fontError);
    // Optionally render an error message or fallback UI
    return null; // Or some error component
  }

  // Return null while assets or auth state are loading
  if (!loaded || authLoading) { 
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack initialRouteName="login">
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="guide" options={{ headerShown: false }} />
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
        <Stack.Screen
          name="generator"
          options={{
            title: '설득 메시지 생성기',
            headerShown: false
          }}
        />
        <Stack.Screen
          name="report"
          options={{
            title: '반응 예측 리포트',
            headerShown: false
          }}
        />
        <Stack.Screen
          name="profile"
          options={{
            title: '프로필 및 설정',
            headerShown: true,
            headerStyle: { backgroundColor: '#000000' },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: { fontWeight: 'bold' },
            headerBackTitle: '',
          }}
        />
        <Stack.Screen
          name="settings/onboarding"
          options={{
            title: '온보딩 설정',
            headerShown: true,
            headerStyle: { backgroundColor: '#000000' },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: { fontWeight: 'bold' },
            headerBackTitle: '',
          }}
        />
        <Stack.Screen
          name="settings/relationship"
          options={{
            title: '관계 정보 수정',
            headerShown: true,
            headerStyle: { backgroundColor: '#000000' },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: { fontWeight: 'bold' },
            headerBackTitle: '',
          }}
        />
        <Stack.Screen
          name="settings/strategy"
          options={{
            title: '전략 스타일 설정',
            headerShown: true,
            headerStyle: { backgroundColor: '#000000' },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: { fontWeight: 'bold' },
            headerBackTitle: '',
          }}
        />
        <Stack.Screen
          name="timing"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="mission"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="progress-details"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}
