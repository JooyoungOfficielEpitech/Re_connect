import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Mock data - in real app, load this from storage/context
const initialData = {
  partnerName: '김민지', // Example data
  relationshipStatus: '헤어진 연인',
  goal: '재회',
};

const RelationshipSettingsScreen = () => {
  const router = useRouter();
  const [partnerName, setPartnerName] = useState(initialData.partnerName);
  const [relationshipStatus, setRelationshipStatus] = useState(initialData.relationshipStatus);
  const [goal, setGoal] = useState(initialData.goal);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    console.log('Saving relationship info:', { partnerName, relationshipStatus, goal });
    // --- Mock Save Logic --- 
    // Replace with actual API call or storage update
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      Alert.alert('저장 완료', '관계 정보가 업데이트되었습니다.');
      // Optionally navigate back or stay on the screen
      // router.back(); 
    } catch (error) {
      console.error('Failed to save relationship info:', error);
      Alert.alert('저장 실패', '정보 저장 중 오류가 발생했습니다.');
    } finally {
      setIsSaving(false);
    }
    // --- End Mock Save Logic ---
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>관계 정보 수정</Text>
        <Text style={styles.description}>온보딩 시 입력했던 관계 정보를 수정할 수 있습니다.</Text>

        {/* Form Fields */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>상대방 이름</Text>
          <TextInput
            style={styles.input}
            value={partnerName}
            onChangeText={setPartnerName}
            placeholder="상대방의 이름 또는 닉네임"
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>관계 상태</Text>
          {/* In a real app, this might be a Picker or custom selector */}
          <TextInput
            style={styles.input}
            value={relationshipStatus}
            onChangeText={setRelationshipStatus}
            placeholder="예: 헤어진 연인, 친구, 동료"
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>관계 목표</Text>
          {/* In a real app, this might be a Picker or custom selector */}
          <TextInput
            style={styles.input}
            value={goal}
            onChangeText={setGoal}
            placeholder="예: 재회, 관계 개선, 단순 연락"
            placeholderTextColor="#666"
          />
        </View>

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
  formGroup: {
    marginBottom: 20,
  },
  label: {
    color: '#A0A0A0',
    fontSize: 14,
    marginBottom: 8,
    marginLeft: 5, 
  },
  input: {
    backgroundColor: '#1C1C1E',
    color: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#3A3A3C', // Subtle border
  },
  saveButton: {
    backgroundColor: '#4A90E2', // Blue button
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20, 
  },
   saveButtonDisabled: {
    backgroundColor: '#888', // Gray out when disabled
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RelationshipSettingsScreen; 