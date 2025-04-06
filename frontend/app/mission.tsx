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
  ProgressBarAndroid, // Example for progress bar, might need a cross-platform lib
  ActivityIndicator,
  Alert
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Mock Mission Data
const currentMission = {
  id: 'm1',
  title: '공통 관심사 언급하기',
  difficulty: '쉬움',
  description: '과거에 함께 즐겼던 취미나 관심사를 자연스럽게 대화에 포함시키세요',
  successRate: 0.76, // 76%
  aiAnalysis: '상대방은 음악 관련 대화에 78% 긍정적 반응을 보였습니다',
  tips: [
    '직접적인 과거 회상보다는 현재형으로 언급하세요',
    '가벼운 대화로 시작하고 상대방의 반응을 살피세요',
    '질문 형태로 던져 대화를 이어갈 기회를 만드세요',
  ],
  dueDate: '내일 18:30',
};

const MissionScreen = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('current'); // 'current' or 'completed'
  const [isLoading, setIsLoading] = useState(false);
  const missionProgress = 0.33; // Example: 1/3
  const totalMissions = 3; 
  const currentMissionIndex = 1;

  const handleEditMission = () => {
    Alert.alert('미션 수정', '미션 수정 기능은 아직 구현되지 않았습니다.');
  };

  const handleCompleteMission = async () => {
    setIsLoading(true);
    Alert.alert(
      '미션 완료 확인',
      `'${currentMission.title}' 미션을 완료하시겠습니까?`,
      [
        { text: '취소', style: 'cancel', onPress: () => setIsLoading(false) },
        {
          text: '확인', 
          onPress: async () => {
            console.log('Completing mission...');
            // Mock API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            Alert.alert('미션 완료', '다음 미션으로 이동합니다.');
            // TODO: Load next mission or navigate elsewhere
            setIsLoading(false);
          }
        },
      ],
      { cancelable: false }
    );
  };

  const goToNextMission = () => {
       Alert.alert('다음 미션', '다음 미션 보기 기능은 아직 구현되지 않았습니다.');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Explicit Header with Back Button */} 
      <View style={styles.explicitHeader}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#FFFFFF" />
        </TouchableOpacity>
         <View style={{flex:1}} /> 
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.screenTitle}>관계 복구 미션</Text>
        <Text style={styles.screenDescription}>상대방과의 심리적 간격을 좁히기 위한 전략적 미션</Text>

        {/* Tab Control */}
        <View style={styles.tabControlContainer}>
            <TouchableOpacity 
                style={[styles.tabButton, activeTab === 'current' && styles.tabButtonActive]} 
                onPress={() => setActiveTab('current')}
            >
                <Text style={[styles.tabButtonText, activeTab === 'current' && styles.tabButtonTextActive]}>현재 미션</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.tabButton, activeTab === 'completed' && styles.tabButtonActive]} 
                onPress={() => setActiveTab('completed')}
            >
                <Text style={[styles.tabButtonText, activeTab === 'completed' && styles.tabButtonTextActive]}>완료된 미션</Text>
            </TouchableOpacity>
        </View>

        {/* Mission Card (Only shows if activeTab is 'current') */} 
        {activeTab === 'current' && (
            <View style={styles.missionCard}>
                <View style={styles.missionHeader}>
                    <Text style={styles.missionTitle}>{currentMission.title}</Text>
                    <View style={styles.difficultyBadge}>
                        <Text style={styles.difficultyText}>{currentMission.difficulty}</Text>
                    </View>
                </View>
                <Text style={styles.missionDescription}>{currentMission.description}</Text>

                {/* Progress Bar - Needs a cross-platform solution or conditional rendering */}
                <View style={styles.progressBarContainer}>
                     <View style={styles.progressBarTrack}> 
                          <View style={[styles.progressBarFill, { width: `${currentMission.successRate * 100}%` }]} />
                     </View>
                     <Text style={styles.progressText}>{`${Math.round(currentMission.successRate * 100)}%`}</Text>
                </View>
                 <Text style={styles.progressLabel}>예상 성공률</Text>
                
                {/* AI Analysis */}
                <View style={styles.aiAnalysisContainer}>
                    <Text style={styles.aiAnalysisTitle}>AI 분석</Text>
                    <Text style={styles.aiAnalysisText}>{currentMission.aiAnalysis}</Text>
                </View>

                {/* Mission Tips */}
                <Text style={styles.tipsTitle}>미션 팁</Text>
                {currentMission.tips.map((tip, index) => (
                    <View key={index} style={styles.tipItem}>
                       <Text style={styles.bulletPoint}>•</Text>
                       <Text style={styles.tipText}>{tip}</Text>
                    </View>
                ))}

                {/* Due Date & Next Mission */}
                <View style={styles.dueDateContainer}>
                    <Ionicons name="time-outline" size={16} color="#A0A0A0" style={{ marginRight: 5 }}/>
                    <Text style={styles.dueDateText}>수행 기한: {currentMission.dueDate}</Text>
                    <TouchableOpacity onPress={goToNextMission} style={{marginLeft: 'auto'}}>
                        <Text style={styles.nextMissionLink}>다음 미션</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )}

        {/* Placeholder for Completed Missions */} 
        {activeTab === 'completed' && (
            <View style={styles.placeholderContainer}>
                <Text style={styles.placeholderText}>완료된 미션 목록이 여기에 표시됩니다.</Text>
            </View>
        )}

      </ScrollView>

       {/* Bottom Buttons Container */}
      <View style={styles.bottomActionContainer}>
         {/* Conditional Buttons based on activeTab? Or always show? Assuming always show for now */} 
          <TouchableOpacity style={styles.bottomButtonGray} onPress={handleEditMission} disabled={isLoading || activeTab !== 'current'}>
            <Text style={styles.bottomButtonGrayText}>미션 수정</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomButtonBlue} onPress={handleCompleteMission} disabled={isLoading || activeTab !== 'current'}>
            {isLoading ? <ActivityIndicator color="#FFF"/> : <Text style={styles.bottomButtonBlueText}>미션 완료</Text>} 
          </TouchableOpacity>
      </View>

       {/* Mission Progress Footer */}
       <View style={styles.progressFooter}>
            <Text style={styles.progressFooterText}>미션 진행률</Text>
            <View style={styles.progressFooterBarContainer}>
                <View style={[styles.progressFooterBarFill, {width: `${missionProgress * 100}%`}]} />
            </View>
            <Text style={styles.progressFooterCount}>{`${currentMissionIndex}/${totalMissions}`}</Text>
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
  explicitHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#000000', 
  },
  backButton: { 
    padding: 5, 
  },
  contentContainer: {
    padding: 20,
    paddingTop: 0,
    backgroundColor: '#000000',
    paddingBottom: 120, // More padding for bottom buttons and progress footer
  },
  screenTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  screenDescription: {
    color: '#A0A0A0',
    fontSize: 16,
    marginBottom: 25,
  },
  tabControlContainer: {
    flexDirection: 'row',
    backgroundColor: '#1C1C1E', // Background for the tab control
    borderRadius: 20,
    padding: 4,
    marginBottom: 25,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 18,
    alignItems: 'center',
  },
  tabButtonActive: {
    backgroundColor: '#4A90E2', // Blue for active tab
  },
  tabButtonText: {
    color: '#A0A0A0',
    fontSize: 14,
    fontWeight: 'bold',
  },
  tabButtonTextActive: {
    color: '#FFFFFF',
  },
  missionCard: {
    backgroundColor: '#1C1C1E',
    borderRadius: 10,
    padding: 20,
  },
  missionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  missionTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1, // Allow title to take space
    marginRight: 10,
  },
  difficultyBadge: {
    backgroundColor: '#2E7D32', // Green badge for '쉬움'
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  missionDescription: {
    color: '#E0E0E0',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 20,
  },
  progressBarContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
  },
  progressBarTrack: {
      flex: 1,
      height: 8,
      backgroundColor: '#444',
      borderRadius: 4,
      marginRight: 10,
      overflow: 'hidden',
  },
  progressBarFill: {
      height: '100%',
      backgroundColor: '#4A90E2',
      borderRadius: 4,
  },
  progressText: {
      color: '#4A90E2',
      fontSize: 14,
      fontWeight: 'bold',
  },
   progressLabel: {
      color: '#A0A0A0',
      fontSize: 12,
      alignSelf: 'flex-end',
      marginBottom: 15,
  },
  aiAnalysisContainer: {
    backgroundColor: '#2C2C2E', // Slightly different background for emphasis
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  aiAnalysisTitle: {
    color: '#4A90E2',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  aiAnalysisText: {
    color: '#E0E0E0',
    fontSize: 14,
    lineHeight: 20,
  },
  tipsTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tipItem: {
      flexDirection: 'row',
      marginBottom: 8,
      alignItems: 'flex-start',
  },
  bulletPoint: {
      color: '#4A90E2',
      fontSize: 16,
      marginRight: 8,
      lineHeight: 20, // Match tipText line height
  },
  tipText: {
    color: '#E0E0E0',
    fontSize: 14,
    lineHeight: 20,
    flex: 1, // Allow text wrapping
  },
  dueDateContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 20,
      paddingTop: 15,
      borderTopWidth: 1,
      borderTopColor: '#3A3A3C',
  },
  dueDateText: {
      color: '#A0A0A0',
      fontSize: 13,
  },
  nextMissionLink: {
      color: '#4A90E2',
      fontSize: 13,
      fontWeight: 'bold',
  },
  placeholderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  placeholderText: {
    color: '#A0A0A0',
    fontSize: 16,
  },
  bottomActionContainer: {
    position: 'absolute',
    bottom: 60, // Adjust to be above the progress footer
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'transparent', // Make container transparent
  },
  bottomButtonGray: {
    flex: 1,
    backgroundColor: '#333333',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 10,
    minHeight: 50,
    justifyContent: 'center',
  },
  bottomButtonGrayText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomButtonBlue: {
    flex: 1,
    backgroundColor: '#4A90E2',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginLeft: 10,
     minHeight: 50,
     justifyContent: 'center',
  },
  bottomButtonBlueText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressFooter: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 10,
      paddingBottom: Platform.OS === 'ios' ? 25 : 10, 
      backgroundColor: '#1C1C1E',
      borderTopWidth: 1,
      borderTopColor: '#3A3A3C',
  },
  progressFooterText: {
      color: '#A0A0A0',
      fontSize: 12,
      marginRight: 10,
  },
  progressFooterBarContainer: {
      flex: 1,
      height: 6,
      backgroundColor: '#444',
      borderRadius: 3,
      overflow: 'hidden',
      marginRight: 10,
  },
  progressFooterBarFill: {
      height: '100%',
      backgroundColor: '#4A90E2',
      borderRadius: 3,
  },
  progressFooterCount: {
      color: '#FFFFFF',
      fontSize: 12,
      fontWeight: 'bold',
  },
});

export default MissionScreen; 