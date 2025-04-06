import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// In a real app, you might use context or storage to manage onboarding status

const OnboardingSettingsScreen = () => {
  const router = useRouter();

  const replayOnboarding = () => {
    // Logic to reset onboarding status and navigate
    console.log('Replaying onboarding...');
    // Example: Reset some state/storage indicating onboarding is complete
    // Then navigate to the first onboarding screen
    // router.replace('/onboarding/step1'); // Or whichever is the first step
    Alert.alert(
      '온보딩 다시보기',
      '온보딩 과정을 다시 시작하시겠습니까? 앱이 재시작될 수 있습니다.',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '확인', onPress: () => {
             console.log('Confirmed replay');
             // Implement actual replay logic (e.g., state reset + navigation)
             // For now, just navigate back or show confirmation
             alert('온보딩 다시보기 기능 구현 예정');
           }
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>온보딩 설정</Text>
        <Text style={styles.description}>앱의 초기 설정 과정을 다시 진행할 수 있습니다.</Text>

        <TouchableOpacity style={styles.settingItem} onPress={replayOnboarding}>
          <Ionicons name="refresh-outline" size={22} color="#A0A0A0" style={styles.settingIcon} />
          <Text style={styles.settingText}>온보딩 다시보기</Text>
          <Ionicons name="chevron-forward-outline" size={22} color="#A0A0A0" />
        </TouchableOpacity>

        {/* Add other onboarding related settings here if needed */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000000',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center', // Center title for settings screen
  },
  description: {
    color: '#A0A0A0',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 30,
  },
  settingItem: {
    backgroundColor: '#1C1C1E',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 15, // Space between items if more are added
  },
  settingIcon: {
    marginRight: 15,
  },
  settingText: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default OnboardingSettingsScreen; 