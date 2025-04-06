import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { Colors } from '@/constants/Colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: 'none' }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '대시보드',
        }}
      />
    </Tabs>
  );
}
