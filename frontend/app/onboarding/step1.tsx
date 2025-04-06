import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  Platform,
  Modal
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; // Use appropriate icons
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'; // Import DateTimePicker
import { Picker } from '@react-native-picker/picker'; // Import Picker

// Define types for OptionButton props
interface OptionButtonProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

// Custom Button Component with types
const OptionButton: React.FC<OptionButtonProps> = ({ label, selected, onPress }) => (
  <TouchableOpacity
    style={[styles.optionButton, selected && styles.optionButtonSelected]}
    onPress={onPress}
  >
    <Text style={[styles.optionButtonText, selected && styles.optionButtonTextSelected]}>
      {label}
    </Text>
  </TouchableOpacity>
);

// Define types for InputRow props
interface InputRowProps {
  label: string;
  value: string | undefined; // Allow undefined or string
  onPress: () => void;
}

// Input Row Component for selections with types
const InputRow: React.FC<InputRowProps> = ({ label, value, onPress }) => (
  <View style={styles.inputGroup}>
    <Text style={styles.label}>{label}</Text>
    <TouchableOpacity style={styles.inputContainer} onPress={onPress}>
      <Text style={styles.inputText}>{value || '선택하기'}</Text>
      <MaterialIcons name="keyboard-arrow-right" size={24} color="#888" />
    </TouchableOpacity>
  </View>
);

const OnboardingStep1 = () => {
  const router = useRouter();
  // Use Date object for breakup date state, default to today
  const [breakupDate, setBreakupDate] = useState(new Date());
  // State to store the formatted string difference
  const [breakupTimeText, setBreakupTimeText] = useState('오늘');
  const [relationshipDuration, setRelationshipDuration] = useState('1년 3개월'); // State for display string
  const [myTendency, setMyTendency] = useState('analytical'); // 'analytical' or 'emotional'
  const [partnerTendency, setPartnerTendency] = useState('emotional'); // 'analytical' or 'emotional'
  const [showDatePicker, setShowDatePicker] = useState(false); // State for date picker visibility
  const [showDurationModal, setShowDurationModal] = useState(false); // State for duration modal visibility
  const [selectedYears, setSelectedYears] = useState(1); // Default selected years in picker
  const [selectedMonths, setSelectedMonths] = useState(3); // Default selected months in picker

  const calculateDateDifference = (selectedDate: Date): string => {
      const today = new Date();
      // Reset time part for accurate date difference calculation
      today.setHours(0, 0, 0, 0);
      const comparisonDate = new Date(selectedDate); // Create a copy to avoid modifying the state directly
      comparisonDate.setHours(0, 0, 0, 0);


      const diffTime = today.getTime() - comparisonDate.getTime();
      if (diffTime < 0) return '미래?'; // Handle future dates if necessary
      if (diffTime < 1000 * 60 * 60 * 24) return '오늘'; // Less than a day difference


      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) return '어제';
      if (diffDays <= 30) return `${diffDays}일 전`;

      const diffMonths = Math.floor(diffDays / 30.44); // Use average days in month
      if (diffMonths === 0) return `${diffDays}일 전`; // Handle cases slightly over 30 days but less than a full average month

      if (diffMonths < 12) return `${diffMonths}개월 전`;

      const diffYears = Math.floor(diffMonths / 12);
      const remainingMonths = diffMonths % 12;
      if (remainingMonths === 0) return `${diffYears}년 전`;

      return `${diffYears}년 ${remainingMonths}개월 전`;
  };


  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    // setShowDatePicker(Platform.OS === 'ios'); // Keep picker open on iOS? Let's hide it after selection/dismiss

    const currentDate = selectedDate || breakupDate; // Use selected date if available

    // Always hide picker after interaction on both platforms
    setShowDatePicker(false);

    if (event.type === 'set' && selectedDate) { // Only process if a date was explicitly set
        setBreakupDate(currentDate);
        setBreakupTimeText(calculateDateDifference(currentDate));
    }
    // Handle 'dismissed' or if selectedDate is undefined if needed, but hiding is main action now
  };

  const formatDuration = (years: number, months: number): string => {
      if (years === 0 && months === 0) return '기간 선택';
      let durationString = '';
      if (years > 0) durationString += `${years}년 `;
      if (months > 0) durationString += `${months}개월`;
      return durationString.trim();
  };

  const openDurationModal = () => {
      // Initialize picker state based on current display string if needed, or keep defaults
      // This example keeps the default picker state (1 year 3 months) when opening
      setShowDurationModal(true);
  };

   const handleDurationConfirm = () => {
        setRelationshipDuration(formatDuration(selectedYears, selectedMonths));
        setShowDurationModal(false);
    };

  const handleNext = () => {
    // TODO: Save data (mock or API call)
    console.log('Onboarding Step 1 Data:', { breakupTime: breakupTimeText, relationshipDuration, myTendency, partnerTendency });
    router.push('/onboarding/step2');
  };

  const handleSkip = () => {
    Alert.alert('건너뛰기', '온보딩을 건너뛰고 메인 화면으로 이동합니다.');
    // TODO: Set default onboarding data if necessary before navigating
    router.replace('/(tabs)'); // Navigate to main app
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>관계 정보를 입력해주세요</Text>
        <Text style={styles.subtitle}>더 정확한 전략과 메시지 생성을 위해 필요해요</Text>

        {/* Progress Bar Placeholder - implement actual progress bar later */}
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: '33.3%' }]} />
        </View>

        {/* Pass the formatted text and trigger the date picker */}
        <InputRow label="이별 시점" value={breakupTimeText} onPress={() => setShowDatePicker(true)} />
        {/* Open the modal on press */}
        <InputRow label="관계 기간" value={relationshipDuration} onPress={openDurationModal} />

        <View style={styles.tendencyGroup}>
            <Text style={styles.label}>나의 성향</Text>
            <View style={styles.tendencyButtons}>
                <OptionButton label="분석적" selected={myTendency === 'analytical'} onPress={() => setMyTendency('analytical')} />
                <OptionButton label="감정적" selected={myTendency === 'emotional'} onPress={() => setMyTendency('emotional')} />
            </View>
        </View>

        <View style={styles.tendencyGroup}>
            <Text style={styles.label}>상대방의 성향</Text>
            <View style={styles.tendencyButtons}>
                <OptionButton label="분석적" selected={partnerTendency === 'analytical'} onPress={() => setPartnerTendency('analytical')} />
                <OptionButton label="감정적" selected={partnerTendency === 'emotional'} onPress={() => setPartnerTendency('emotional')} />
            </View>
        </View>

         <View style={styles.infoBanner}>
            <Ionicons name="alert-circle-outline" size={20} color="#FFCC00" style={{ marginRight: 10 }}/>
            <View style={{ flex: 1 }}>
                <Text style={styles.infoBannerTitle}>모든 정보는 개인 맞춤형 전략 수립에만 사용됩니다</Text>
                <Text style={styles.infoBannerSubtitle}>더 많은 정보를 제공할수록 더 정확한 예측이 가능합니다</Text>
            </View>
        </View>

        {/* AI Prediction Banner Placeholder */}
        <View style={styles.aiBanner}>
             <Ionicons name="hardware-chip-outline" size={18} color="#4A90E2" style={{ marginRight: 8 }}/>
            <Text style={styles.aiBannerText}>AI가 상대방의 성향을 예측 중입니다...</Text>
        </View>

         {/* Conditionally render the DateTimePicker */}
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={breakupDate}
            mode={'date'}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'} // Spinner for iOS, default for Android
            onChange={onChangeDate}
            maximumDate={new Date()} // Prevent selecting future dates
            // locale="ko-KR" // Locale might cause issues depending on setup, test carefully
          />
        )}
      </ScrollView>

       {/* Duration Picker Modal */}
        <Modal
            animationType="slide"
            transparent={true}
            visible={showDurationModal}
            onRequestClose={() => {
                setShowDurationModal(!showDurationModal);
            }}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>관계 기간 선택</Text>
                    <View style={styles.pickerContainer}>
                        {/* Years Picker */}
                        <Picker
                            // Pass selectedValue as string
                            selectedValue={String(selectedYears)}
                            style={styles.picker}
                            itemStyle={styles.pickerItem} // Style for individual items
                            // Convert itemValue back to number for state update
                            onValueChange={(itemValue) => setSelectedYears(Number(itemValue))}
                        >
                            {[...Array(21).keys()].map(year => ( // 0 to 20 years
                                // Pass value as string
                                <Picker.Item key={year} label={`${year}년`} value={String(year)} />
                            ))}
                        </Picker>
                        {/* Months Picker */}
                         <Picker
                            // Pass selectedValue as string
                            selectedValue={String(selectedMonths)}
                            style={styles.picker}
                            itemStyle={styles.pickerItem}
                            // Convert itemValue back to number for state update
                            onValueChange={(itemValue) => setSelectedMonths(Number(itemValue))}
                        >
                             {[...Array(12).keys()].map(month => ( // 0 to 11 months
                                // Pass value as string
                                <Picker.Item key={month} label={`${month}개월`} value={String(month)} />
                            ))}
                        </Picker>
                    </View>
                    <View style={styles.modalButtonContainer}>
                        <TouchableOpacity
                            style={[styles.modalButton, styles.modalCancelButton]}
                            onPress={() => setShowDurationModal(false)}
                        >
                            <Text style={styles.modalButtonText}>취소</Text>
                        </TouchableOpacity>
                         <TouchableOpacity
                            style={[styles.modalButton, styles.modalConfirmButton]}
                            onPress={handleDurationConfirm}
                        >
                            <Text style={styles.modalButtonText}>확인</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>

      {/* Bottom Navigation Buttons */}
       <View style={styles.bottomNav}>
            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                <Text style={styles.skipButtonText}>건너뛰기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <Text style={styles.nextButtonText}>다음</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#121212',
    paddingBottom: 100, // Add padding to prevent overlap with bottomNav
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#AAA',
    marginBottom: 25,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#444',
    borderRadius: 3,
    overflow: 'hidden',
    width: '100%',
    marginBottom: 30,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4A90E2', // Blue progress color
    borderRadius: 3,
  },
  inputGroup: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    fontSize: 14,
    color: '#AAA',
    marginBottom: 8,
  },
  inputContainer: {
    width: '100%',
    backgroundColor: '#282828',
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputText: {
      color: '#FFF',
      fontSize: 16,
  },
  tendencyGroup: {
      marginBottom: 20,
      width: '100%',
  },
  tendencyButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
  },
  optionButton: {
      flex: 1,
      backgroundColor: '#282828',
      paddingVertical: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginHorizontal: 5,
  },
  optionButtonSelected: {
      backgroundColor: '#4A90E2',
  },
  optionButtonText: {
      color: '#FFF',
      fontSize: 16,
  },
  optionButtonTextSelected: {
      fontWeight: 'bold',
  },
  infoBanner: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#282828',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    marginTop: 10,
    alignItems: 'center',
  },
   infoBannerTitle: {
      color: '#FFF',
      fontSize: 13,
      fontWeight: 'bold',
      marginBottom: 3,
  },
  infoBannerSubtitle: {
      color: '#AAA',
      fontSize: 12,
  },
  aiBanner: {
      flexDirection: 'row',
      width: '100%',
      backgroundColor: '#282828',
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 15,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20, // Spacing before bottom buttons
  },
  aiBannerText: {
      color: '#AAA',
      fontSize: 13,
  },
  bottomNav: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: Platform.OS === 'ios' ? 30 : 20, // Adjust padding for safe area
      paddingHorizontal: 20,
      backgroundColor: '#121212', // Match background
      borderTopWidth: 1,
      borderTopColor: '#282828', // Subtle separator
  },
  skipButton: {
      backgroundColor: '#282828',
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 10,
      alignItems: 'center',
      flex: 1, // Take half width
      marginRight: 10,
  },
   skipButtonText: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: 'bold',
  },
  nextButton: {
      backgroundColor: '#4A90E2',
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 10,
      alignItems: 'center',
       flex: 1, // Take half width
       marginLeft: 10,
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dimmed background
  },
  modalContent: {
      width: '85%',
      backgroundColor: '#282828', // Dark background for modal
      borderRadius: 15,
      padding: 20,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
  },
  modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#FFF',
      marginBottom: 20,
  },
  pickerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      marginBottom: 20,
      // Note: Picker styling might be limited and platform-dependent
  },
  picker: {
      flex: 1, // Take half width
      // Height might be needed depending on platform
      height: Platform.OS === 'ios' ? 180 : 50, // Adjust height as needed
      color: Platform.OS === 'ios' ? '#FFF' : '#000', // iOS text color directly, Android needs itemStyle
      // backgroundColor: '#333', // Background for picker itself might not work well cross-platform
  },
   pickerItem: {
      // Styling individual items, especially color on Android
       color: '#FFF', // Try setting color here for Android items
       fontSize: 18, // Adjust font size if needed
       height: Platform.OS === 'ios' ? 180 : 50, // Match picker height if possible
   },
  modalButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: 10,
  },
  modalButton: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 10,
      alignItems: 'center',
      marginHorizontal: 5,
  },
  modalCancelButton: {
       backgroundColor: '#444', // Darker grey for cancel
  },
  modalConfirmButton: {
       backgroundColor: '#4A90E2', // Blue for confirm
  },
  modalButtonText: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: 'bold',
  },
});

export default OnboardingStep1; 