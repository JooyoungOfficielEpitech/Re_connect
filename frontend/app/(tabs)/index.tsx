import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Platform,
  StatusBar
} from 'react-native';
import { useRouter, Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

// Mock progress value
const progress = 0.3; // 30%

// Reusable Card Component
interface CardProps {
  iconName: keyof typeof Ionicons.glyphMap; // Use Ionicons names
  title: string;
  subtitle: string;
  onPress?: () => void; // Optional press handler
}

const DashboardCard: React.FC<CardProps> = ({ iconName, title, subtitle, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress} disabled={!onPress}>
    <View style={styles.cardIconCircle}>
      <Ionicons name={iconName} size={28} color="#FFF" />
    </View>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardSubtitle}>{subtitle}</Text>
  </TouchableOpacity>
);

export default function HomeScreen() {
  const router = useRouter();

  // Mock handlers for card presses (using alert for now)
  // const goToTiming = () => router.push('/timing');
  // const goToGenerator = () => router.push('/generator');
  // const goToReport = () => router.push('/report');
  // const goToMission = () => router.push('/mission');
  // const goToProgressDetails = () => router.push('/progress-details');
  const showInfo = () => alert('앱 정보 표시 (구현 예정)');

  return (
    <SafeAreaView style={styles.safeArea}>
       <StatusBar barStyle="light-content" />
       <ScrollView contentContainerStyle={styles.container}>
        {/* Current Status Section */}
        <View style={styles.statusSection}>
          <Text style={styles.sectionLabel}>현재 상태</Text>
          <Text style={styles.statusTitle}>오늘은 말 걸면 안 되는 날이에요</Text>
          <Text style={styles.statusSubtitle}>다음 접촉 최적 시간: 내일 18:30</Text>
        </View>

        {/* Feature Cards Grid */}
        <View style={styles.cardGrid}>
          <DashboardCard
            iconName="time-outline"
            title="전략적 접촉 타이밍"
            subtitle="안전한 연락 시간 제안"
            onPress={() => router.push('/timing')}
          />
          <DashboardCard
            iconName="chatbubble-ellipses-outline"
            title="설득 메시지 생성기"
            subtitle="AI 기반 메시지 작성"
            onPress={() => router.push('/generator')}
          />
          <DashboardCard
            iconName="stats-chart-outline"
            title="반응 예측 리포트"
            subtitle="성공 확률 분석"
            onPress={() => router.push('/report')}
          />
          <DashboardCard
            iconName="extension-puzzle-outline"
            title="관계 복구 미션"
            subtitle="오늘의 행동 과제"
            onPress={() => router.push('/mission')}
          />
        </View>

        {/* Progress Section */}
        <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <Text style={styles.sectionTitle}>복구 진행 상태</Text>
            <TouchableOpacity onPress={() => router.push('/progress-details')}>
              <Text style={styles.detailLink}>상세 보기</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${30}%` }]} />
          </View>
          <Text style={styles.progressText}>30% 완료</Text>
        </View>

        <TouchableOpacity 
          style={styles.guideButton}
          onPress={() => router.push('/guide')}
        >
          <View style={styles.guideContent}>
            <View style={styles.guideIconContainer}>
              <Ionicons name="help-circle-outline" size={24} color={Colors.light.blue} />
            </View>
            <View style={styles.guideTextContainer}>
              <Text style={styles.guideTitle}>앱 사용 가이드</Text>
              <Text style={styles.guideDescription}>Re:connect의 기능을 자세히 알아보세요</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={Colors.dark.text} />
          </View>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212', // Dark background
  },
  container: {
    padding: 20,
    paddingBottom: 40, // Extra padding at bottom
  },
  statusSection: {
    backgroundColor: '#282828',
    borderRadius: 10,
    padding: 15,
    marginBottom: 25,
  },
  sectionLabel: {
    fontSize: 13,
    color: '#AAA',
    marginBottom: 5,
    textTransform: 'uppercase', // Optional: makes label stand out
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  statusSubtitle: {
    fontSize: 14,
    color: '#AAA',
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  card: {
    backgroundColor: '#282828',
    borderRadius: 10,
    padding: 15,
    width: '48%', // Slightly less than half for spacing
    marginBottom: 15,
    alignItems: 'center', // Center content
  },
  cardIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Semi-transparent white circle
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#AAA',
    textAlign: 'center',
  },
  progressContainer: {
    backgroundColor: '#282828',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  detailLink: {
    fontSize: 14,
    color: '#4A90E2', // Blue link color
  },
  progressBar: {
    height: 8,
    backgroundColor: '#444',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4A90E2', // Blue progress color
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
  },
  guideButton: {
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 20,
    padding: 16,
  },
  guideContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  guideIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(74, 122, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  guideTextContainer: {
    flex: 1,
  },
  guideTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 4,
  },
  guideDescription: {
    fontSize: 14,
    color: Colors.dark.text,
  },
});
