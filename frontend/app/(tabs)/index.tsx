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
       {/* Custom Header */}
        <View style={styles.header}>
            <Text style={styles.headerTitle}>Re:connect</Text>
            <Link href="/profile" asChild>
              <TouchableOpacity>
                  <Ionicons name="person-circle-outline" size={32} color="#A0A0A0" />
              </TouchableOpacity>
            </Link>
        </View>

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
            onPress={() => alert('전략적 접촉 타이밍 (구현 예정)')}
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
            onPress={() => alert('관계 복구 미션 (구현 예정)')}
          />
        </View>

        {/* Progress Section */}
        <View style={styles.progressSection}>
           <Text style={styles.sectionLabel}>복구 진행 상태</Text>
           <View style={styles.progressBarBackground}>
               <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
           </View>
           <View style={styles.progressLabels}>
               <Text style={styles.progressText}>{`${Math.round(progress * 100)}% 완료`}</Text>
               <TouchableOpacity onPress={() => alert('상세 보기 (구현 예정)')}>
                   <Text style={styles.progressLink}>상세 보기</Text>
               </TouchableOpacity>
           </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212', // Dark background
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 10, // Adjust for Android status bar
    paddingBottom: 10,
    backgroundColor: '#121212',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A90E2', // Blue title
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
  progressSection: {
    backgroundColor: '#282828',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#444',
    borderRadius: 4,
    overflow: 'hidden',
    width: '100%',
    marginTop: 8,
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4A90E2', // Blue progress color
    borderRadius: 4,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
  },
  progressLink: {
    fontSize: 14,
    color: '#4A90E2', // Blue link color
  },
});
