import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '../../constants/Colors';
import { CustomButton } from '../../components/CustomButton';

export default function GuideStep2Screen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.title}>앱 가이드</Text>
        <Text style={styles.pageIndicator}>2/3</Text>
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
          
          <Text style={styles.mainTitle}>데이터 기반 전략</Text>
          
          <Text style={styles.description}>
            수천 건의 성공 사례를 분석하여{'\n'}
            가장 효과적인 접근 방법을 제시합니다
          </Text>

          <View style={styles.strategyList}>
            <View style={styles.strategyItem}>
              <Text style={styles.strategyTitle}>감정 분석</Text>
              <Text style={styles.strategyDescription}>
                상대방의 현재 감정 상태를 파악하고{'\n'}
                최적의 대화 방법을 제안합니다
              </Text>
            </View>
            
            <View style={styles.strategyItem}>
              <Text style={styles.strategyTitle}>시점 분석</Text>
              <Text style={styles.strategyDescription}>
                재결합 성공률이 가장 높은{'\n'}
                시점과 방법을 알려드립니다
              </Text>
            </View>
            
            <View style={styles.strategyItem}>
              <Text style={styles.strategyTitle}>맞춤형 가이드</Text>
              <Text style={styles.strategyDescription}>
                이별 원인과 상황에 따른{'\n'}
                맞춤형 솔루션을 제공합니다
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Link href="/guide/step3" asChild>
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
  strategyList: {
    gap: 24,
  },
  strategyItem: {
    backgroundColor: Colors.dark.card,
    borderRadius: 16,
    padding: 20,
  },
  strategyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 8,
  },
  strategyDescription: {
    fontSize: 14,
    color: Colors.dark.text,
    lineHeight: 20,
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