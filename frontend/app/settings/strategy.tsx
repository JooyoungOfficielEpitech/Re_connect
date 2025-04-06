import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Mock data - in real app, load/save this from storage/context
const strategyOptions = [
  { id: 'direct', title: '직접적 소통', description: '명확하고 솔직하게 핵심을 전달합니다.' },
  { id: 'empathetic', title: '공감적 접근', description: '상대방의 감정을 우선적으로 고려합니다.' },
  { id: 'analytical', title: '분석적 설득', description: '논리와 데이터를 기반으로 설득합니다.' },
  { id: 'cautious', title: '신중한 접근', description: '상황을 조심스럽게 살피며 접근합니다.' },
];

const StrategySettingsScreen = () => {
  const router = useRouter();
  // Assume 'empathetic' is the current default/saved style
  const [selectedStrategy, setSelectedStrategy] = useState<string>('empathetic'); 
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    console.log('Saving strategy style:', selectedStrategy);
    // --- Mock Save Logic --- 
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      Alert.alert('저장 완료', `선호하는 전략 스타일이 '${strategyOptions.find(opt => opt.id === selectedStrategy)?.title}'(으)로 저장되었습니다.`);
      // router.back();
    } catch (error) {
      console.error('Failed to save strategy style:', error);
      Alert.alert('저장 실패', '설정 저장 중 오류가 발생했습니다.');
    } finally {
      setIsSaving(false);
    }
    // --- End Mock Save Logic ---
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>전략 스타일 설정</Text>
        <Text style={styles.description}>AI가 메시지를 생성할 때 참고할 선호하는 소통 방식을 선택하세요.</Text>

        {/* Strategy Options */}
        {strategyOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[styles.optionButton, selectedStrategy === option.id && styles.optionButtonSelected]}
            onPress={() => setSelectedStrategy(option.id)}
          >
            <View style={styles.optionTextContainer}>
                <Text style={[styles.optionTitle, selectedStrategy === option.id && styles.optionTitleSelected]}>
                    {option.title}
                </Text>
                <Text style={[styles.optionDescription, selectedStrategy === option.id && styles.optionDescriptionSelected]}>
                    {option.description}
                </Text>
            </View>
            {selectedStrategy === option.id && (
              <Ionicons name="checkmark-circle" size={24} color="#4A90E2" />
            )}
          </TouchableOpacity>
        ))}

        {/* Save Button */}
        <TouchableOpacity 
          style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}
          onPress={handleSave} 
          disabled={isSaving}
        >
          <Text style={styles.saveButtonText}>{isSaving ? '저장 중...' : '저장하기'}</Text>
        </TouchableOpacity>

      </ScrollView>
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
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    color: '#A0A0A0',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 30,
  },
  optionButton: {
    backgroundColor: '#1C1C1E',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3A3A3C',
  },
  optionButtonSelected: {
    borderColor: '#4A90E2', // Highlight selected option
    backgroundColor: '#1a2a3a', // Slightly different background when selected
  },
  optionTextContainer: {
      flex: 1, 
      marginRight: 10, // Space before checkmark
  },
  optionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  optionTitleSelected: {
      color: '#6aa6e9', // Lighter blue for selected title
  },
  optionDescription: {
    color: '#A0A0A0',
    fontSize: 13,
  },
  optionDescriptionSelected: {
      color: '#DDD', // Lighter gray for selected description
  },
  saveButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10, // Adjusted margin
  },
  saveButtonDisabled: {
    backgroundColor: '#888',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default StrategySettingsScreen; 