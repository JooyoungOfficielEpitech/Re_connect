import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '../../constants/Colors';
import { CustomButton } from '../../components/CustomButton';

export default function GuideStep3Screen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.title}>앱 가이드</Text>
        <Text style={styles.pageIndicator}>3/3</Text>
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
          
          <Text style={styles.mainTitle}>성공적인 재결합</Text>
          
          <Text style={styles.description}>
            단계별 가이드와 AI의 조언을 통해{'\n'}
            건강한 관계 회복을 도와드립니다
          </Text>

          <View style={styles.stepList}>
            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>상황 분석</Text>
                <Text style={styles.stepDescription}>이별 원인과 현재 상황을 분석</Text>
              </View>
            </View>
            
            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>전략 수립</Text>
                <Text style={styles.stepDescription}>맞춤형 재결합 전략 제시</Text>
              </View>
            </View>
            
            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>실행 및 피드백</Text>
                <Text style={styles.stepDescription}>AI 조언과 함께 단계별 실행</Text>
              </View>
            </View>
            
            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>4</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>관계 회복</Text>
                <Text style={styles.stepDescription}>건강한 관계로의 회복</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Link href="/login" asChild>
          <CustomButton title="시작하기" style={styles.button} />
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
  stepList: {
    gap: 20,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    padding: 16,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.light.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark.background,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
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
}); 