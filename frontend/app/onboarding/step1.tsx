import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; // Use appropriate icons

// Define types for OptionButton props
interface OptionButtonProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

// Custom Button Component with types
const OptionButton: React.FC<OptionButtonProps> = ({ label, selected, onPress }) => (
  <TouchableOpacity
    style={[styles.optionButton, selected && styles.optionButtonSelected]}
    onPress={onPress}
  >
    <Text style={[styles.optionButtonText, selected && styles.optionButtonTextSelected]}>
      {label}
    </Text>
  </TouchableOpacity>
);

// Define types for InputRow props
interface InputRowProps {
  label: string;
  value: string | undefined; // Allow undefined or string
  onPress: () => void;
}

// Input Row Component for selections with types
const InputRow: React.FC<InputRowProps> = ({ label, value, onPress }) => (
  <View style={styles.inputGroup}>
    <Text style={styles.label}>{label}</Text>
    <TouchableOpacity style={styles.inputContainer} onPress={onPress}>
      <Text style={styles.inputText}>{value || '선택하기'}</Text>
      <MaterialIcons name="keyboard-arrow-right" size={24} color="#888" />
    </TouchableOpacity>
  </View>
);

const OnboardingStep1 = () => {
  const router = useRouter();
  const [breakupTime, setBreakupTime] = useState('28일 전'); // Mock data
  const [relationshipDuration, setRelationshipDuration] = useState('1년 3개월'); // Mock data
  const [breakupReason, setBreakupReason] = useState(''); // Needs selection
  const [myTendency, setMyTendency] = useState('analytical'); // 'analytical' or 'emotional'
  const [partnerTendency, setPartnerTendency] = useState('emotional'); // 'analytical' or 'emotional'

  const handleNext = () => {
    // TODO: Save data (mock or API call)
    console.log('Onboarding Step 1 Data:', { breakupTime, relationshipDuration, breakupReason, myTendency, partnerTendency });
    router.push('/onboarding/step2');
  };

  const handleSkip = () => {
    // TODO: Handle skip logic (maybe set default values or skip onboarding entirely)
    Alert.alert('건너뛰기', '온보딩을 건너뛰고 메인 화면으로 이동합니다. (구현 예정)');
    // router.replace('/(tabs)'); // Example: Navigate to main app
  };

  // Mock functions for opening selection modals/pickers
  const selectBreakupTime = () => Alert.alert('알림', '이별 시점 선택 기능 구현 예정');
  const selectRelationshipDuration = () => Alert.alert('알림', '관계 기간 선택 기능 구현 예정');
  const selectBreakupReason = () => router.push('/onboarding/step2'); // Go to step 2 to select reason


  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>관계 정보를 입력해주세요</Text>
        <Text style={styles.subtitle}>더 정확한 전략과 메시지 생성을 위해 필요해요</Text>

        {/* Progress Bar Placeholder - implement actual progress bar later */}
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: '33.3%' }]} />
        </View>

        <InputRow label="이별 시점" value={breakupTime} onPress={selectBreakupTime} />
        <InputRow label="관계 기간" value={relationshipDuration} onPress={selectRelationshipDuration} />
        <InputRow label="이별의 주된 원인" value={breakupReason} onPress={selectBreakupReason} />

        <View style={styles.tendencyGroup}>
            <Text style={styles.label}>나의 성향</Text>
            <View style={styles.tendencyButtons}>
                <OptionButton label="분석적" selected={myTendency === 'analytical'} onPress={() => setMyTendency('analytical')} />
                <OptionButton label="감정적" selected={myTendency === 'emotional'} onPress={() => setMyTendency('emotional')} />
            </View>
        </View>

        <View style={styles.tendencyGroup}>
            <Text style={styles.label}>상대방의 성향</Text>
            <View style={styles.tendencyButtons}>
                <OptionButton label="분석적" selected={partnerTendency === 'analytical'} onPress={() => setPartnerTendency('analytical')} />
                <OptionButton label="감정적" selected={partnerTendency === 'emotional'} onPress={() => setPartnerTendency('emotional')} />
            </View>
        </View>

         <View style={styles.infoBanner}>
            <Ionicons name="alert-circle-outline" size={20} color="#FFCC00" style={{ marginRight: 10 }}/>
            <View style={{ flex: 1 }}>
                <Text style={styles.infoBannerTitle}>모든 정보는 개인 맞춤형 전략 수립에만 사용됩니다</Text>
                <Text style={styles.infoBannerSubtitle}>더 많은 정보를 제공할수록 더 정확한 예측이 가능합니다</Text>
            </View>
        </View>

        {/* AI Prediction Banner Placeholder */}
        <View style={styles.aiBanner}>
             <Ionicons name="hardware-chip-outline" size={18} color="#4A90E2" style={{ marginRight: 8 }}/>
            <Text style={styles.aiBannerText}>AI가 상대방의 성향을 예측 중입니다...</Text>
        </View>

      </ScrollView>
      {/* Bottom Navigation Buttons */}
       <View style={styles.bottomNav}>
            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                <Text style={styles.skipButtonText}>건너뛰기</Text>
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
    paddingBottom: 100, // Add padding to prevent overlap with bottomNav
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
    backgroundColor: '#4A90E2', // Blue progress color
    borderRadius: 3,
  },
  inputGroup: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    fontSize: 14,
    color: '#AAA',
    marginBottom: 8,
  },
  inputContainer: {
    width: '100%',
    backgroundColor: '#282828',
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputText: {
      color: '#FFF',
      fontSize: 16,
  },
  tendencyGroup: {
      marginBottom: 20,
      width: '100%',
  },
  tendencyButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
  },
  optionButton: {
      flex: 1,
      backgroundColor: '#282828',
      paddingVertical: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginHorizontal: 5,
  },
  optionButtonSelected: {
      backgroundColor: '#4A90E2',
  },
  optionButtonText: {
      color: '#FFF',
      fontSize: 16,
  },
  optionButtonTextSelected: {
      fontWeight: 'bold',
  },
  infoBanner: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#282828',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    marginTop: 10,
    alignItems: 'center',
  },
   infoBannerTitle: {
      color: '#FFF',
      fontSize: 13,
      fontWeight: 'bold',
      marginBottom: 3,
  },
  infoBannerSubtitle: {
      color: '#AAA',
      fontSize: 12,
  },
  aiBanner: {
      flexDirection: 'row',
      width: '100%',
      backgroundColor: '#282828',
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 15,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20, // Spacing before bottom buttons
  },
  aiBannerText: {
      color: '#AAA',
      fontSize: 13,
  },
  bottomNav: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: Platform.OS === 'ios' ? 30 : 20, // Adjust padding for safe area
      paddingHorizontal: 20,
      backgroundColor: '#121212', // Match background
      borderTopWidth: 1,
      borderTopColor: '#282828', // Subtle separator
  },
  skipButton: {
      backgroundColor: '#282828',
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 10,
      alignItems: 'center',
      flex: 1, // Take half width
      marginRight: 10,
  },
   skipButtonText: {
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
       flex: 1, // Take half width
       marginLeft: 10,
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OnboardingStep1; 