import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '../../constants/Colors';
import { CustomButton } from '../../components/CustomButton';

export default function GuideScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.title}>앱 가이드</Text>
        <Text style={styles.pageIndicator}>1/3</Text>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.imageContainer}>
            <Image 
              source={require('../../assets/images/icon.png')} 
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          
          <Text style={styles.mainTitle}>기계적 연애 알고리즘</Text>
          
          <Text style={styles.description}>
            Re:connect는 심리학과 통계 데이터를 기반으로{'\n'}
            이별 후 재결합 성공률을 높이는 앱입니다.
          </Text>

          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <View style={styles.bullet} />
              <Text style={styles.featureText}>AI 기반 메시지 작성 제안</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.bullet} />
              <Text style={styles.featureText}>전략적 접촉 타이밍 분석</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.bullet} />
              <Text style={styles.featureText}>상대방 반응 예측 및 대응 전략</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.bullet} />
              <Text style={styles.featureText}>단계별 관계 복구 플랜 제공</Text>
            </View>
          </View>

          <View style={styles.warning}>
            <Text style={styles.warningIcon}>⚠️</Text>
            <Text style={styles.warningText}>모든 데이터는 안전하게 보호됩니다</Text>
            <Text style={styles.warningSubtext}>AI가 분석하는 정보는 철저히 암호화되어 저장됩니다</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Link href="/guide/step2" asChild>
          <CustomButton title="다음" style={styles.button} />
        </Link>
        <Link href="/login" asChild>
          <CustomButton 
            title="건너뛰기" 
            variant="secondary"
            style={styles.skipButton} 
          />
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.light.blue,
  },
  pageIndicator: {
    fontSize: 16,
    color: Colors.dark.text,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  content: {
    paddingHorizontal: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  image: {
    width: 120,
    height: 120,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.light.text,
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: Colors.dark.text,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  featureList: {
    gap: 16,
    marginBottom: 40,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.light.blue,
  },
  featureText: {
    fontSize: 16,
    color: Colors.light.text,
  },
  warning: {
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  warningIcon: {
    fontSize: 20,
    marginBottom: 8,
  },
  warningText: {
    fontSize: 14,
    color: Colors.light.text,
    marginBottom: 4,
  },
  warningSubtext: {
    fontSize: 12,
    color: Colors.dark.text,
  },
  footer: {
    padding: 20,
    gap: 12,
    backgroundColor: Colors.dark.background,
  },
  button: {
    width: '100%',
  },
  skipButton: {
    width: '100%',
  },
}); 