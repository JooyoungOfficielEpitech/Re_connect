import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Platform,
  StatusBar,
  Dimensions
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BarChart } from 'react-native-chart-kit';

// Get screen width for chart sizing
const screenWidth = Dimensions.get('window').width;

// Mock data
const successRate = 0.62;
const rateChange = '+7%';
const mainEmotions = [
    { name: '그리움', value: 63 },
    { name: '무관심', value: 27 },
    { name: '기쁨', value: 10 },
];
const simulationMessage = '오랜만이야. 잘 지내?';
const positiveResponse = { rate: 65, text: '"응, 잘 지내. 요즘 어떻게 지내?"' };
const neutralResponse = { rate: 25, text: '"그래. 잘 지내고 있어."' };
const optimalTime = '오늘 저녁 8시 ~ 10시 (82%)';

// Format data for BarChart
const barChartData = {
  labels: mainEmotions.map(e => e.name),
  datasets: [
    {
      data: mainEmotions.map(e => e.value),
    },
  ],
};

const ReportScreen = () => {
  const router = useRouter();

  const refreshReport = () => alert('리포트 새로고침 (구현 예정)');
  const sendMessage = () => alert('메시지 전송 (구현 예정)');

  // Chart configuration for BarChart in dark theme
  const chartConfig = {
    backgroundColor: '#282828',
    backgroundGradientFrom: '#282828',
    backgroundGradientTo: '#282828',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(74, 144, 226, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(170, 170, 170, ${opacity})`,
    style: {
      borderRadius: 10,
    },
    propsForBackgroundLines: {
      strokeDasharray: '',
      stroke: 'rgba(170, 170, 170, 0.2)',
      strokeWidth: 0.5
    },
    propsForLabels: {
        fontSize: 11,
    },
    barPercentage: 0.6,
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      {/* Explicit Header with Back Button */}
      <View style={styles.explicitHeader}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={{flex:1}} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>

        {/* Success Rate Section */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>전체 성공 확률</Text>
          <Text style={styles.successRateText}>{`${Math.round(successRate * 100)}%`}</Text>
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBar, { width: `${successRate * 100}%` }]} />
          </View>
          <Text style={styles.rateChangeText}>지난 주 대비 {rateChange}</Text>
        </View>

        {/* Emotion State Section with Bar Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>주요 감정 상태 (%)</Text>
          <View style={styles.barChartContainer}>
            <BarChart
              style={styles.chartStyle}
              data={barChartData}
              width={screenWidth - 60}
              height={180}
              chartConfig={chartConfig}
              verticalLabelRotation={0}
              fromZero={true}
              showValuesOnTopOfBars={true}
              yAxisSuffix="%"
              yAxisLabel=""
            />
          </View>
        </View>

        {/* Message Simulation Section */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>메시지 반응 시뮬레이션</Text>
          <View style={styles.messageSimInputContainer}>
            <Text style={styles.messageSimInputText}>{simulationMessage}</Text>
             <TouchableOpacity onPress={sendMessage}>
                <Text style={styles.sendLink}>전송</Text>
             </TouchableOpacity>
          </View>
          <View style={[styles.responseContainer, styles.positiveResponse]}>
             <Text style={styles.responseRate}>긍정적 응답 ({positiveResponse.rate}%)</Text>
             <Text style={styles.responseText}>{positiveResponse.text}</Text>
          </View>
           <View style={[styles.responseContainer, styles.neutralResponse]}>
             <Text style={styles.responseRate}>중립적 응답 ({neutralResponse.rate}%)</Text>
             <Text style={styles.responseText}>{neutralResponse.text}</Text>
          </View>
        </View>

         {/* Optimal Contact Time Section */}
         <View style={styles.section}>
            <Text style={styles.sectionLabel}>최적 연락 시간</Text>
            <Text style={styles.optimalTimeText}>{optimalTime}</Text>
         </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
  },
   customHeader: { // Header within the screen content
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#121212', // Match background
  },
  customHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  container: {
    padding: 20,
    backgroundColor: '#121212',
    paddingBottom: 40,
  },
  section: {
    backgroundColor: '#282828',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 13,
    color: '#AAA',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  successRateText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  progressBarBackground: { // Reused style
    height: 8,
    backgroundColor: '#444',
    borderRadius: 4,
    overflow: 'hidden',
    width: '100%',
    marginBottom: 5,
  },
  progressBar: { // Reused style
    height: '100%',
    backgroundColor: '#4A90E2',
    borderRadius: 4,
  },
  rateChangeText: {
    fontSize: 13,
    color: '#AAA', // Could be green/red based on value
  },
  barChartContainer: {
      alignItems: 'center',
      marginTop: 10,
  },
  chartStyle: {
      borderRadius: 10,
  },
  messageSimInputContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#333',
      borderRadius: 10,
      paddingVertical: 12,
      paddingHorizontal: 15,
      marginBottom: 15,
  },
  messageSimInputText: {
      color: '#FFF',
      fontSize: 15,
      flex: 1,
      marginRight: 10,
  },
  sendLink: {
      color: '#4A90E2',
      fontSize: 15,
      fontWeight: 'bold',
  },
  responseContainer: {
      borderRadius: 15,
      padding: 12,
      marginBottom: 10,
  },
  positiveResponse: {
      backgroundColor: '#1F3A5A',
  },
  neutralResponse: {
      backgroundColor: '#333',
  },
  responseRate: {
      fontSize: 13,
      fontWeight: 'bold',
      color: '#FFF',
      marginBottom: 4,
  },
  responseText: {
      fontSize: 14,
      color: '#DDD',
  },
  optimalTimeText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#FFF',
      marginTop: 5,
  },
  explicitHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  backButton: {
    padding: 5,
  },
});

export default ReportScreen; 