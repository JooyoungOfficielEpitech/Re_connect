import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// In a real app, you might use context or storage to manage onboarding status

const OnboardingSettingsScreen = () => {
  const router = useRouter();

  const handleRestartOnboarding = () => {
    router.navigate('/onboarding/step1');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>온보딩 설정</Text>
        <Text style={styles.description}>
          앱의 초기 설정 과정을 다시 진행할 수 있습니다.
        </Text>

        <TouchableOpacity 
          style={styles.button} 
          onPress={handleRestartOnboarding}
        >
          <Ionicons name="refresh-outline" size={20} color="#FFFFFF" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>온보딩 다시보기</Text>
        </TouchableOpacity>

        <View style={styles.infoBox}>
          <Ionicons name="information-circle-outline" size={20} color="#666666" style={styles.infoIcon} />
          <Text style={styles.infoText}>
            온보딩을 다시 진행하면 관계 정보, 성향 분석 등의 설정을 새로 입력할 수 있습니다.
          </Text>
        </View>
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
    backgroundColor: '#000000',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#A0A0A0',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#4A90E2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#1C1C1E',
    padding: 16,
    borderRadius: 10,
    alignItems: 'flex-start',
  },
  infoIcon: {
    marginRight: 10,
    marginTop: 2,
  },
  infoText: {
    flex: 1,
    color: '#A0A0A0',
    fontSize: 14,
    lineHeight: 20,
  },
});

export default OnboardingSettingsScreen; 