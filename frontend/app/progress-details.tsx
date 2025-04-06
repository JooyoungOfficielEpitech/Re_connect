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
  Dimensions
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LineChart } from 'react-native-chart-kit'; // Import LineChart

// Mock Data
const overallProgress = 0.42; // 42%
const progressChange = 0.12; // +12%

const journeySteps = ['첫 연락', '응답 받음', '대화 지속', '직접 만남', '관계 회복'];
const currentStepIndex = 2; // '대화 지속'
const nextStepAction = '직접 만남 제안하기';

const emotionTrendData = {
  labels: ['4주전', '3주전', '2주전', '1주전', '오늘'], // Simplified labels
  datasets: [
    {
      data: [30, 45, 28, 55, 70],
      color: (opacity = 1) => `rgba(74, 144, 226, ${opacity})`, // Blue line
      strokeWidth: 3,
    },
     {
        data: [70], // Dummy value for label positioning
        withDots: false, // Hide dot for this dataset
      }
  ],
  legend: ['+14%'], // Custom legend
};

const strategyEffectiveness = [
  { strategy: '감성적 메시지', score: 0.80 },
  { strategy: '논리적 대화', score: 0.35 },
  { strategy: '공통 추억 언급', score: 0.70 },
  { strategy: '근황 공유', score: 0.60 },
];

const screenWidth = Dimensions.get('window').width;

const ProgressDetailsScreen = () => {
  const router = useRouter();

  const chartConfig = {
    backgroundColor: '#1C1C1E',
    backgroundGradientFrom: '#1C1C1E',
    backgroundGradientTo: '#1C1C1E',
    decimalPlaces: 0, 
    color: (opacity = 1) => `rgba(74, 144, 226, ${opacity})`, // Blue color for axes/labels
    labelColor: (opacity = 1) => `rgba(160, 160, 160, ${opacity})`, // Gray for labels
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '5',
      strokeWidth: '2',
      stroke: '#4A90E2',
    },
    propsForBackgroundLines: {
        strokeDasharray: '', // Solid lines
        stroke: '#3A3A3C', // Darker grid lines
    }
  };

  const handleNextStep = () => {
      alert(`${nextStepAction} 관련 기능 실행 (구현 예정)`);
      // e.g., router.push('/suggest-meeting')
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Explicit Header */} 
      <View style={styles.explicitHeader}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitleText}>복구 상태</Text>
        <View style={{width: 48}} />
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Overall Progress */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitleSmall}>전체 복구 진행률</Text>
          <View style={styles.progressRow}>
            <Text style={styles.progressPercentage}>{`${Math.round(overallProgress * 100)}%`}</Text>
            <View style={styles.progressBarContainerWide}>
              <View style={styles.progressBarTrack}>
                <View style={[styles.progressBarFill, { width: `${overallProgress * 100}%` }]} />
              </View>
              <Text style={styles.progressChangeText}>{`${progressChange > 0 ? '+' : ''}${Math.round(progressChange * 100)}% 지난주 대비`}</Text>
            </View>
          </View>
        </View>

        {/* Recovery Journey Stepper */}
        <View style={styles.sectionCard}>
           <Text style={styles.sectionTitle}>복구 여정</Text>
            <View style={styles.stepperContainer}>
                {journeySteps.map((step, index) => (
                    <View key={step} style={styles.stepItem}>
                         <View style={styles.stepLineContainer}>
                            {index > 0 && <View style={[styles.stepLine, index <= currentStepIndex && styles.stepLineActive]} />} 
                         </View>
                        <View style={[styles.stepCircle, index <= currentStepIndex && styles.stepCircleActive, index === currentStepIndex && styles.stepCircleCurrent]}>
                           {/* Optional: Add inner circle for current step */} 
                           {index === currentStepIndex && <View style={styles.stepInnerCircle}/>}
                        </View>
                         <View style={styles.stepLineContainer}>
                           {index < journeySteps.length - 1 && <View style={[styles.stepLine, index < currentStepIndex && styles.stepLineActive]} />} 
                        </View>
                        <Text style={[styles.stepLabel, index <= currentStepIndex && styles.stepLabelActive]}>{step}</Text>
                    </View>
                ))}
            </View>
            <TouchableOpacity style={styles.nextStepButton} onPress={handleNextStep}>
                <Text style={styles.nextStepButtonText}>다음 단계: {nextStepAction}</Text>
                <MaterialIcons name="chevron-right" size={22} color="#FFF" />
            </TouchableOpacity>
        </View>

        {/* Emotion Trend Chart */}
        <View style={styles.sectionCard}>
           <Text style={styles.sectionTitle}>감정 분석 트렌드</Text>
           {/* Custom Legend/Label inside chart area */}
           <View style={styles.chartLabelContainer}>
               <Text style={styles.chartLabelText}>+14%</Text>
           </View>
           <LineChart
              data={emotionTrendData}
              width={screenWidth - 70} // Adjust width for padding
              height={220}
              chartConfig={chartConfig}
              bezier // Makes the line smooth
              style={styles.chart}
              withInnerLines={true} // Show grid lines
              withOuterLines={false}
              fromZero={true}
              yAxisInterval={1} // optional, defaults to 1
              // Hide default labels and dots for the dummy dataset used for legend
              hidePointsAtIndex={[emotionTrendData.datasets[1].data.length -1]} 
              // Custom rendering might be needed for precise label positioning
            />
            <View style={styles.chartAxisLabels}>
                <Text style={styles.chartAxisLabel}>2주전</Text>
                 <Text style={styles.chartAxisLabel}>오늘</Text>
            </View>
        </View>

        {/* Strategy Effectiveness */}
        <View style={styles.sectionCard}>
           <Text style={styles.sectionTitle}>전략 효과성</Text>
           {strategyEffectiveness.map((item) => (
               <View key={item.strategy} style={styles.strategyRow}>
                   <Text style={styles.strategyLabel}>{item.strategy}</Text>
                   <View style={styles.strategyBarContainer}>
                       <View style={[styles.strategyBar, { width: `${item.score * 100}%` }]} />
                   </View>
                   <Text style={styles.strategyScore}>{`${Math.round(item.score * 100)}%`}</Text>
               </View>
           ))}
        </View>

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
   headerTitleText: {
      flex: 1,
      textAlign: 'center',
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: 'bold',
  },
  contentContainer: {
    padding: 20,
    paddingTop: 0,
    backgroundColor: '#000000',
    paddingBottom: 40,
  },
  sectionCard: {
    backgroundColor: '#1C1C1E',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionTitleSmall: {
    color: '#A0A0A0',
    fontSize: 14,
    marginBottom: 10,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressPercentage: {
    color: '#FFFFFF',
    fontSize: 48, 
    fontWeight: 'bold',
    marginRight: 15,
  },
  progressBarContainerWide: {
    flex: 1,
  },
  progressBarTrack: {
    height: 8,
    backgroundColor: '#444',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 5,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#4A90E2',
    borderRadius: 4,
  },
  progressChangeText: {
    color: '#4CAF50', // Green for positive change
    fontSize: 13,
    fontWeight: 'bold',
  },
  stepperContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start', // Align items to the top for labels
      marginBottom: 20,
      paddingHorizontal: 5, // Add some padding
  },
  stepItem: {
      alignItems: 'center',
      flex: 1, // Allow items to space out
      position: 'relative', 
  },
   stepLineContainer: {
    position: 'absolute',
    top: 12, // Align with center of the circle
    height: 2,
    width: '50%', // Half the width to connect circles
    overflow: 'hidden', // Hide overflowing lines
  },
   stepLine: {
      height: 2,
      backgroundColor: '#444', // Inactive line color
      width: '100%',
  },
   stepLineActive: {
      backgroundColor: '#4A90E2', // Active line color
  },
  stepCircle: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: '#444', // Inactive circle color
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 8,
      zIndex: 1, // Ensure circle is above lines
  },
  stepCircleActive: {
      backgroundColor: '#4A90E2', // Active circle color
  },
  stepCircleCurrent: {
      borderWidth: 3, 
      borderColor: '#6aa6e9', // Lighter blue border for current step
  },
  stepInnerCircle: {
       width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: '#FFF',
  },
  stepLabel: {
      color: '#A0A0A0',
      fontSize: 12,
      textAlign: 'center',
      marginTop: 4,
      paddingHorizontal: 2, // Prevent long labels from overlapping badly
  },
   stepLabelActive: {
      color: '#FFFFFF',
      fontWeight: 'bold',
  },
  nextStepButton: {
      backgroundColor: '#2C2C2E', // Darker button
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 15, 
  },
  nextStepButtonText: {
      color: '#FFFFFF',
      fontSize: 15,
      fontWeight: 'bold',
  },
  chartLabelContainer: {
      position: 'absolute',
      top: 35, // Adjust positioning
      left: 25,
      backgroundColor: '#4A90E2',
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 12,
      zIndex: 10,
  },
  chartLabelText: {
      color: '#FFFFFF',
      fontSize: 12,
      fontWeight: 'bold',
  },
  chart: {
    // marginLeft: -10, // Adjust margin if needed for alignment
  },
   chartAxisLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15, // Approx align with chart edges
    marginTop: -10, // Pull labels up slightly
  },
  chartAxisLabel: {
    color: '#A0A0A0',
    fontSize: 12,
  },
  strategyRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
  },
  strategyLabel: {
      color: '#E0E0E0',
      fontSize: 14,
      width: '35%', // Allocate space for labels
  },
  strategyBarContainer: {
      flex: 1,
      height: 8,
      backgroundColor: '#444',
      borderRadius: 4,
      marginHorizontal: 10,
      overflow: 'hidden',
  },
  strategyBar: {
      height: '100%',
      backgroundColor: '#6aa6e9', // Lighter blue for strategy bars
      borderRadius: 4,
  },
  strategyScore: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: 'bold',
      minWidth: 35, // Ensure space for percentage
      textAlign: 'right',
  },
});

export default ProgressDetailsScreen; 