import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Platform,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Define types for RadioButton props
interface RadioButtonProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

// Custom Radio Button Component
const RadioButton: React.FC<RadioButtonProps> = ({ label, selected, onPress }) => (
  <TouchableOpacity
    style={[styles.radioButton, selected && styles.radioButtonSelected]}
    onPress={onPress}
  >
    <View style={[styles.radioOuterCircle, selected && styles.radioOuterCircleSelected]}>
      {selected && <View style={styles.radioInnerCircle} />}
    </View>
    <Text style={[styles.radioButtonText, selected && styles.radioButtonTextSelected]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const OnboardingStep2 = () => {
  const router = useRouter();
  const [reason, setReason] = useState<string | null>(null); // State to hold selected reason

  const reasons = [
    '의사소통 문제',
    '가치관 차이',
    '외부 요인 (거리, 환경)',
    '신뢰 상실',
    '기타'
  ];

  const handleNext = () => {
    if (!reason) {
        Alert.alert('선택 필요', '이별의 주된 원인을 선택해주세요.');
        return;
    }
    // TODO: Save data (mock or API call)
    console.log('Onboarding Step 2 Data:', { reason });
    router.push('/onboarding/step3');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>이별 원인을 알려주세요</Text>
        <Text style={styles.subtitle}>더 정확한 분석을 위해 관계 패턴 정보가 필요해요</Text>

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: '66.6%' }]} />
        </View>

        <Text style={styles.sectionTitle}>주요 이별 원인</Text>
        {reasons.map((item) => (
          <RadioButton
            key={item}
            label={item}
            selected={reason === item}
            onPress={() => setReason(item)}
          />
        ))}

        <View style={styles.infoBanner}>
           <Ionicons name="alert-circle-outline" size={20} color="#FFA500" style={{ marginRight: 10 }}/>
            <View style={{ flex: 1 }}>
                <Text style={styles.infoBannerTitle}>원인 분석은 전략 수립의 핵심입니다</Text>
                <Text style={styles.infoBannerSubtitle}>정확한 입력이 재결합 가능성을 높입니다</Text>
            </View>
        </View>

      </ScrollView>
      {/* Bottom Navigation Buttons */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>이전</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>다음</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#121212',
    paddingBottom: 100, // Prevent overlap with bottomNav
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#AAA',
    marginBottom: 25,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#444',
    borderRadius: 3,
    overflow: 'hidden',
    width: '100%',
    marginBottom: 30,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4A90E2',
    borderRadius: 3,
  },
  sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#FFF',
      marginBottom: 15,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#282828',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    width: '100%',
  },
  radioButtonSelected: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
  },
  radioOuterCircle: {
    height: 22,
    width: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#888',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioOuterCircleSelected: {
      borderColor: '#FFF',
  },
  radioInnerCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#FFF',
  },
  radioButtonText: {
    fontSize: 16,
    color: '#FFF',
  },
  radioButtonTextSelected: {
      fontWeight: 'bold',
  },
   infoBanner: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#282828',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    marginTop: 20,
    alignItems: 'center',
  },
   infoBannerTitle: {
      color: '#FFA500', // Orange color for emphasis
      fontSize: 13,
      fontWeight: 'bold',
      marginBottom: 3,
  },
  infoBannerSubtitle: {
      color: '#AAA',
      fontSize: 12,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Platform.OS === 'ios' ? 30 : 20,
    paddingHorizontal: 20,
    backgroundColor: '#121212',
    borderTopWidth: 1,
    borderTopColor: '#282828',
  },
  backButton: {
    backgroundColor: '#282828',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  backButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OnboardingStep2; 