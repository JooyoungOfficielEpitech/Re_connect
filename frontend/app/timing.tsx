import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Mock data (replace with actual data later)
const weeklyTiming = [
  { day: '월', date: 15, status: 'passed' },
  { day: '화', date: 16, status: 'avoid' },
  { day: '수', date: 17, status: 'normal' },
  { day: '목', date: 18, status: 'normal' },
  { day: '금', date: 19, status: 'good' },
  { day: '토', date: 20, status: 'good' },
  { day: '일', date: 21, status: 'passed' },
];

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'good': return { backgroundColor: '#2E7D32', textColor: '#FFF' }; // Dark Green
    case 'normal': return { backgroundColor: '#F9A825', textColor: '#000' }; // Dark Yellow
    case 'avoid': return { backgroundColor: '#C62828', textColor: '#FFF' }; // Dark Red
    case 'passed': return { backgroundColor: '#424242', textColor: '#AAA' }; // Dark Gray
    default: return { backgroundColor: '#1C1C1E', textColor: '#FFF' };
  }
};

const TimingScreen = () => {
  const router = useRouter();

  const goToNotificationSettings = () => {
    // Navigate to notification settings or show alert
    alert('알림 설정 화면으로 이동 (구현 예정)');
    // router.push('/settings/notifications');
  };

  const goToMessageComposer = () => {
    // Navigate to message generator/composer
    alert('메시지 작성 화면으로 이동 (구현 예정)');
    // router.push('/generator'); 
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

      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.headerTitle}>전략적 접촉 타이밍</Text>
        <Text style={styles.headerSubtitle}>AI가 분석한 최적의 접촉 시점을 확인하세요</Text>

        {/* Today's Recommendation */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>오늘의 연락 추천</Text>
          <View style={styles.todayRecommendation}>
            <View style={[styles.statusIndicator, { backgroundColor: '#2E7D32' }]} />
            <Text style={styles.recommendationText}>저녁 7-9시: <Text style={{ fontWeight: 'bold', color: '#4CAF50'}}>매우 적합</Text></Text>
          </View>
          <Text style={styles.recommendationDetail}>오늘 상대방이 여유로운 시간대로 예측됩니다.</Text>
          <Text style={styles.recommendationDetail}>추천 주제: 최근 취미 또는 관심사</Text>
        </View>

        {/* Weekly Timing */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>주간 접촉 타이밍</Text>
          <View style={styles.weeklyContainer}>
            {weeklyTiming.map((item) => {
              const style = getStatusStyle(item.status);
              return (
                <View key={item.day} style={styles.dayContainer}>
                  <Text style={styles.dayLabel}>{item.day}</Text>
                  <View style={[styles.dateCircle, { backgroundColor: style.backgroundColor }]}>
                    <Text style={[styles.dateText, { color: style.textColor }]}>{item.date}</Text>
                  </View>
                </View>
              );
            })}
          </View>
          <View style={styles.legendContainer}>
            <View style={styles.legendItem}><View style={[styles.legendIndicator, { backgroundColor: getStatusStyle('good').backgroundColor }]} /><Text style={styles.legendText}>좋음</Text></View>
            <View style={styles.legendItem}><View style={[styles.legendIndicator, { backgroundColor: getStatusStyle('normal').backgroundColor }]} /><Text style={styles.legendText}>보통</Text></View>
            <View style={styles.legendItem}><View style={[styles.legendIndicator, { backgroundColor: getStatusStyle('avoid').backgroundColor }]} /><Text style={styles.legendText}>피하세요</Text></View>
            <View style={styles.legendItem}><View style={[styles.legendIndicator, { backgroundColor: getStatusStyle('passed').backgroundColor }]} /><Text style={styles.legendText}>지남</Text></View>
          </View>
        </View>

        {/* Contact Strategy */} 
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>접촉 전략</Text>
          <View style={[styles.strategyItem, styles.strategyItemBlue]}>
             <View style={styles.strategyBorderBlue}/>
             <View style={styles.strategyContent}>
                <Text style={styles.strategyTitle}>가벼운 접촉</Text>
                <Text style={styles.strategyDesc}>소셜 미디어 좋아요, 스토리 반응</Text>
             </View>
             <Text style={styles.strategyTagBlue}>오늘 적합</Text>
          </View>
          <View style={[styles.strategyItem, styles.strategyItemYellow]}>
             <View style={styles.strategyBorderYellow}/>
             <View style={styles.strategyContent}>
                <Text style={styles.strategyTitle}>직접 메시지</Text>
                <Text style={styles.strategyDesc}>1:1 대화, 질문 또는 근황 공유</Text>
             </View>
             <Text style={styles.strategyTagYellow}>금요일 추천</Text>
          </View>
        </View>

        {/* Special Day */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>특별한 날</Text>
          <Text style={styles.specialDayDate}>다음주 수요일 (4월 24일)</Text>
          <Text style={styles.specialDayEvent}>100일 기념일 - 접촉 최적 시점</Text>
        </View>

      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity style={styles.bottomButtonGray} onPress={goToNotificationSettings}>
          <Text style={styles.bottomButtonGrayText}>알림 설정</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButtonBlue} onPress={goToMessageComposer}>
          <Text style={styles.bottomButtonBlueText}>메시지 작성하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000000', // Black background
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingTop: 0, // Remove top padding as header provides space
    paddingBottom: 100, // Space for bottom buttons
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  headerSubtitle: {
    color: '#A0A0A0',
    fontSize: 16,
    marginBottom: 30,
  },
  sectionCard: {
    backgroundColor: '#1C1C1E',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  todayRecommendation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  recommendationText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  recommendationDetail: {
    color: '#A0A0A0',
    fontSize: 14,
    marginLeft: 18, // Indent details
    lineHeight: 20,
  },
  weeklyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  dayContainer: {
    alignItems: 'center',
  },
  dayLabel: {
    color: '#A0A0A0',
    fontSize: 12,
    marginBottom: 8,
  },
  dateCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap', // Wrap if needed
    marginTop: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 5,
  },
  legendIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  legendText: {
    color: '#A0A0A0',
    fontSize: 12,
  },
  strategyItem: {
      flexDirection: 'row',
      borderRadius: 8,
      marginBottom: 10,
      padding: 15,
      alignItems: 'center',
      overflow: 'hidden', // Keep border inside
  },
  strategyItemBlue: {
      backgroundColor: '#152238', // Dark blue variant
  },
   strategyItemYellow: {
      backgroundColor: '#332d1a', // Dark yellow variant
  },
  strategyBorderBlue: {
      width: 4,
      height: '120%', // Ensure full height coverage
      backgroundColor: '#4A90E2',
      marginRight: 15,
      marginLeft: -15, // Position border at the very edge
  },
  strategyBorderYellow: {
      width: 4,
       height: '120%', // Ensure full height coverage
      backgroundColor: '#F9A825',
      marginRight: 15,
      marginLeft: -15, // Position border at the very edge
  },
  strategyContent: {
      flex: 1,
  },
  strategyTitle: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 4,
  },
  strategyDesc: {
      color: '#A0A0A0',
      fontSize: 13,
  },
  strategyTagBlue: {
      color: '#6aa6e9', // Lighter blue
      fontSize: 13,
      fontWeight: 'bold',
  },
  strategyTagYellow: {
      color: '#fbc02d', // Lighter yellow
      fontSize: 13,
      fontWeight: 'bold',
  },
  specialDayDate: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  specialDayEvent: {
    color: '#4A90E2', // Blue color for event highlight
    fontSize: 14,
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 15,
    paddingBottom: Platform.OS === 'ios' ? 30 : 15, // More padding for iOS home indicator
    backgroundColor: '#121212', // Slightly different from pure black
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
  },
  bottomButtonGray: {
    flex: 1,
    backgroundColor: '#333333',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginRight: 10,
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
    borderRadius: 25, 
    alignItems: 'center',
  },
  bottomButtonBlueText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Add styles for the explicit header and back button
  explicitHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10, // Reduced horizontal padding for back button
    paddingVertical: 10,
    backgroundColor: '#000000', // Match background
  },
  backButton: {
    padding: 5, // Add padding for easier touch
  },
});

export default TimingScreen; 