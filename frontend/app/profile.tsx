import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
  Alert, // Added Alert
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; // For icons
import { useAuth } from '@/context/AuthContext'; // Import useAuth for logout
import { Link, router } from 'expo-router';

const ProfileScreen = () => {
  const { logout } = useAuth();

  // Settings data without href for now
  const otherSettings = [
    { id: 'notifications', title: '알림 설정', icon: 'notifications-outline' as const },
    { id: 'data', title: '데이터 및 개인정보', icon: 'lock-closed-outline' as const },
  ];

  const handleNotImplemented = (settingTitle: string) => {
      console.log(`${settingTitle} screen not implemented yet.`);
      Alert.alert('구현 예정', `${settingTitle} 화면은 아직 구현되지 않았습니다.`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>JK</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.name}>김준호</Text>
            <Text style={styles.membership}>기본 멤버십</Text>
          </View>
          <TouchableOpacity style={styles.editButton} onPress={() => console.log('Edit Profile Pressed')}>
            <Text style={styles.editButtonText}>프로필 수정</Text>
          </TouchableOpacity>
        </View>

        {/* Premium Features Section */}
        <View style={styles.premiumSection}>
          <Text style={styles.sectionTitle}>프리미엄 구독</Text>
          <View style={styles.premiumCard}>
            <Text style={styles.premiumCardTitle}>고급 설득 플랜 생성</Text>
            <View style={styles.premiumFeatures}>
              <Text style={styles.premiumFeatureText}>• 고급 설득 플랜 생성</Text>
              <Text style={styles.premiumFeatureText}>• 감정 분석 보고서</Text>
              <Text style={styles.premiumFeatureText}>• 관계 복구 리포트 PDF</Text>
            </View>
            <TouchableOpacity style={styles.subscribeButton}>
              <Text style={styles.subscribeButtonText}>구독하기</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Settings Section */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>설정</Text>
          <Link href="/settings/onboarding" asChild>
            <TouchableOpacity style={styles.settingItem}>
              <Ionicons name="settings-outline" size={22} color="#A0A0A0" style={styles.settingIcon} />
              <Text style={styles.settingText}>온보딩 설정</Text>
              <Ionicons name="chevron-forward-outline" size={22} color="#A0A0A0" />
            </TouchableOpacity>
          </Link>
          <Link href="/settings/relationship" asChild>
            <TouchableOpacity style={styles.settingItem}>
              <Ionicons name="people-outline" size={22} color="#A0A0A0" style={styles.settingIcon} />
              <Text style={styles.settingText}>관계 정보 수정</Text>
              <Ionicons name="chevron-forward-outline" size={22} color="#A0A0A0" />
            </TouchableOpacity>
          </Link>
          <Link href="/settings/strategy" asChild>
            <TouchableOpacity style={styles.settingItem}>
              <Ionicons name="bulb-outline" size={22} color="#A0A0A0" style={styles.settingIcon} />
              <Text style={styles.settingText}>전략 스타일 설정</Text>
              <Ionicons name="chevron-forward-outline" size={22} color="#A0A0A0" />
            </TouchableOpacity>
          </Link>
          <TouchableOpacity style={styles.settingItem}>
            <Ionicons name="notifications-outline" size={22} color="#A0A0A0" style={styles.settingIcon} />
            <Text style={styles.settingText}>알림 설정</Text>
            <Ionicons name="chevron-forward-outline" size={22} color="#A0A0A0" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <Ionicons name="lock-closed-outline" size={22} color="#A0A0A0" style={styles.settingIcon} />
            <Text style={styles.settingText}>데이터 및 개인정보</Text>
            <Ionicons name="chevron-forward-outline" size={22} color="#A0A0A0" />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={() => {
            logout();
          }}
        >
          <Text style={styles.logoutButtonText}>로그아웃</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000000', // Match dark background
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  contentContainer: {
    padding: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#1C1C1E', // Slightly lighter card background
    padding: 15,
    borderRadius: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4A90E2', // Blue color from image
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  membership: {
    color: '#A0A0A0', // Lighter gray
    fontSize: 14,
  },
  editButton: {
    backgroundColor: '#4A90E2', // Blue button
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 5, // Align with card padding
  },
  card: {
    backgroundColor: '#1C1C1E',
    borderRadius: 10,
    padding: 15,
  },
  settingsCard: {
    backgroundColor: '#1C1C1E',
    borderRadius: 10,
    overflow: 'hidden', // Ensures separator doesn't overflow rounded corners
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardText: {
    color: '#A0A0A0',
    fontSize: 14,
    marginBottom: 5,
    marginLeft: 5,
  },
  subscribeButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 15,
    alignSelf: 'flex-end', // Position button to the right
    paddingHorizontal: 20,
  },
  subscribeButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  settingIcon: {
    marginRight: 15,
  },
  settingText: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#3A3A3C', // Darker separator line
    marginLeft: 55, // Indent separator to align with text
  },
  logoutButton: {
    backgroundColor: '#330000', // Dark red background
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10, // Space before logout
    borderWidth: 1,
    borderColor: '#D13636', // Red border
  },
  logoutButtonText: {
    color: '#FF4D4D', // Brighter red text
    fontSize: 16,
    fontWeight: 'bold',
  },
  settingsSection: {
    marginBottom: 30,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  menuText: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
  },
  premiumSection: {
    marginBottom: 30,
  },
  premiumCard: {
    backgroundColor: '#1C1C1E',
    borderRadius: 10,
    padding: 15,
  },
  premiumCardTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  premiumFeatures: {
    marginBottom: 10,
  },
  premiumFeatureText: {
    color: '#A0A0A0',
    fontSize: 14,
    marginBottom: 5,
    marginLeft: 5,
  },
});

export default ProfileScreen; 