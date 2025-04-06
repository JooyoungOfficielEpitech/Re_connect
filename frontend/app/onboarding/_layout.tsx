import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function OnboardingLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#121212' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: 'bold' },
          headerBackTitle: '',
          headerShadowVisible: false, // Remove header shadow/border
        }}
      >
        <Stack.Screen name="step1" options={{ title: '관계 정보 입력 (1/3)' }} />
        <Stack.Screen name="step2" options={{ title: '이별 원인 분석 (2/3)' }} />
        <Stack.Screen name="step3" options={{ title: '전략 스타일 선택 (3/3)' }} />
        {/* Add other screens in the onboarding flow if needed */}
      </Stack>
      <StatusBar style="light" />
    </>
  );
} 