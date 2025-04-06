import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Platform,
  Alert,
  ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Define types for StrategyOption props
interface StrategyOptionProps {
  title: string;
  description: string;
  selected: boolean;
  onPress: () => void;
}

// Custom Strategy Option Component
const StrategyOption: React.FC<StrategyOptionProps> = ({ title, description, selected, onPress }) => (
  <TouchableOpacity
    style={[styles.strategyOption, selected && styles.strategyOptionSelected]}
    onPress={onPress}
  >
    <Text style={[styles.strategyTitle, selected && styles.strategyTitleSelected]}>{title}</Text>
    <Text style={[styles.strategyDescription, selected && styles.strategyDescriptionSelected]}>{description}</Text>
  </TouchableOpacity>
);

const OnboardingStep3 = () => {
  const router = useRouter();
  const [strategy, setStrategy] = useState<string | null>('balanced'); // Default selection
  const [isProcessing, setIsProcessing] = useState(false); // State for mock processing

  const strategies = {
    analytical: {
      title: '냉정한 분석형',
      description: '감정을 배제하고 통계와 패턴 기반으로 재결합 가능성을 높이는 전략 추천'
    },
    balanced: {
      title: '균형 잡힌 실용형',
      description: '감정과 논리를 균형있게 활용하는 현실적인 접근법 추천'
    },
    emotional: {
      title: '감성 소통형',
      description: '상대방의 감정을 이해하고 공감하는 감성적 연결에 초점을 맞춘 전략'
    }
  };

  const handleComplete = async () => {
    if (!strategy) {
      Alert.alert('선택 필요', '전략 스타일을 선택해주세요.');
      return;
    }
    setIsProcessing(true);
    // TODO: Save data (mock or API call)
    console.log('Onboarding Step 3 Data:', { strategy });
    
    // Simulate API call/processing delay
    await new Promise(resolve => setTimeout(resolve, 1500)); 
    
    setIsProcessing(false);
    Alert.alert('온보딩 완료', 'Re:connect 사용 준비가 완료되었습니다!');
    router.replace('/(tabs)'); // Navigate to the main app screen
  };

  const handleBack = () => {
    if (isProcessing) return; // Prevent going back while processing
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>전략 스타일을 선택하세요</Text>
        <Text style={styles.subtitle}>AI가 당신의 상황에 맞는 전략을 설계합니다</Text>

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: '100%' }]} />
        </View>

        <Text style={styles.sectionTitle}>접근 방식</Text>
        {Object.entries(strategies).map(([key, value]) => (
          <StrategyOption
            key={key}
            title={value.title}
            description={value.description}
            selected={strategy === key}
            onPress={() => setStrategy(key)}
          />
        ))}

        {/* AI Processing Banner Placeholder */}
         {isProcessing && (
            <View style={styles.aiBanner}>
                <ActivityIndicator size="small" color="#4A90E2" style={{ marginRight: 8 }} />
                <Text style={styles.aiBannerText}>AI가 데이터를 분석하는 중입니다...</Text>
            </View>
        )}

      </ScrollView>
      {/* Bottom Navigation Buttons */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack} disabled={isProcessing}>
          <Text style={styles.backButtonText}>이전</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.completeButton} onPress={handleComplete} disabled={isProcessing}>
          {isProcessing ? (
              <ActivityIndicator color="#FFF" />
          ) : (
              <Text style={styles.completeButtonText}>완료</Text>
          )}
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
    paddingBottom: 100,
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
  strategyOption: {
    backgroundColor: '#282828',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    width: '100%',
    borderWidth: 2,
    borderColor: 'transparent', // Default no border
  },
  strategyOptionSelected: {
    borderColor: '#4A90E2', // Blue border when selected
    backgroundColor: '#4A90E2', // Blue background when selected
  },
  strategyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  strategyTitleSelected: {},
  strategyDescription: {
    fontSize: 13,
    color: '#AAA',
  },
  strategyDescriptionSelected: {
      color: '#FFF',
  },
  aiBanner: {
      flexDirection: 'row',
      width: '100%',
      backgroundColor: '#282828',
      borderRadius: 10,
      paddingVertical: 12,
      paddingHorizontal: 15,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20, // Spacing before bottom buttons
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
  completeButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginLeft: 10,
    minHeight: 50, // Ensure button height consistency with ActivityIndicator
  },
  completeButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OnboardingStep3; 