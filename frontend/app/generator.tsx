import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Platform,
  Alert,
  TextInput,
  ActivityIndicator,
  StatusBar,
  FlatList
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { messageApi, RecommendedGoal, GeneratedMessage } from '../services/api';

// Define types for InputRow props (assuming from previous steps)
interface InputRowProps {
  label: string;
  value: string | undefined;
  onPress?: () => void; // Make onPress optional if sometimes disabled
}

// Shared InputRow component with types
const InputRow: React.FC<InputRowProps> = ({ label, value, onPress }) => (
  <View style={styles.inputGroup}>
    <Text style={styles.label}>{label}</Text>
    <TouchableOpacity style={styles.inputContainer} onPress={onPress} disabled={!onPress}>
      <Text style={styles.inputText}>{value || '선택하기'}</Text>
      {onPress && <MaterialIcons name="keyboard-arrow-right" size={24} color="#888" />}
    </TouchableOpacity>
  </View>
);

// Define types for OptionButton props (assuming from previous steps)
interface OptionButtonProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

// Shared OptionButton component with types
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

// Define types for Checkbox props (assuming from previous steps)
interface CheckboxProps {
  label: string;
  value: boolean;
  onValueChange: (newValue: boolean) => void;
}

// Shared Checkbox component with types
const Checkbox: React.FC<CheckboxProps> = ({ label, value, onValueChange }) => (
  <View style={styles.checkboxContainer}>
    <TouchableOpacity onPress={() => onValueChange(!value)} style={styles.checkboxBase}>
      {value && <Ionicons name="checkmark" size={20} color="#4A90E2" />}
    </TouchableOpacity>
    <Text style={styles.checkboxLabel}>{label}</Text>
  </View>
);

// 추천 목표 항목 컴포넌트
interface RecommendedGoalItemProps {
  goal: RecommendedGoal;
}

const RecommendedGoalItem: React.FC<RecommendedGoalItemProps> = ({ goal }) => (
  <View style={styles.goalItem}>
    <View style={styles.goalItemContent}>
      <Text style={styles.goalItemTitle}>{goal.name}</Text>
      <Text style={styles.goalItemDescription}>{goal.description}</Text>
      <Text style={styles.goalItemReason}>{goal.reason}</Text>
    </View>
  </View>
);

const MessageGeneratorScreen = () => {
  const router = useRouter();
  const [messagePurpose, setMessagePurpose] = useState(''); // 메시지 목적
  const [toneStyle, setToneStyle] = useState('logical'); // logical, emotional, curious
  const [recommendedGoals, setRecommendedGoals] = useState<RecommendedGoal[]>([]);
  const [generatedMessage, setGeneratedMessage] = useState(''); // 생성된 메시지
  const [prediction, setPrediction] = useState(''); // 긍정적 반응 예측
  const [warning, setWarning] = useState<string | null>(null); // 경고 메시지
  const [isGenerating, setIsGenerating] = useState(false); // 메시지 생성 중 상태
  const [isLoadingGoals, setIsLoadingGoals] = useState(true); // 목표 로딩 중 상태

  // 추천 목표 목록 가져오기
  useEffect(() => {
    const fetchRecommendedGoals = async () => {
      try {
        setIsLoadingGoals(true);
        const goalsData = await messageApi.getRecommendedGoals();
        setRecommendedGoals(goalsData);
      } catch (error) {
        console.error('추천 목표를 가져오는 중 오류 발생:', error);
        Alert.alert('오류', '추천 목표를 가져오는 중 문제가 발생했습니다.');
      } finally {
        setIsLoadingGoals(false);
      }
    };

    fetchRecommendedGoals();
  }, []);

  const selectMessageType = () => alert('메시지 유형 선택 (구현 예정)');

  const handleGenerate = async () => {
    if (!messagePurpose || !toneStyle) {
      Alert.alert('입력 오류', '메시지 목적을 입력해주세요.');
      return;
    }
    
    setIsGenerating(true);
    try {
      const result = await messageApi.generateMessage({
        purpose: messagePurpose,
        tone_style: toneStyle
      });
      
      setGeneratedMessage(result.message);
      setPrediction(`${result.positive_reaction}%`);
      setWarning(result.warning);
    } catch (error) {
      console.error('메시지 생성 중 오류 발생:', error);
      Alert.alert('오류', '메시지 생성 중 문제가 발생했습니다.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = () => {
    alert('메시지 저장 (구현 예정)');
    // TODO: Implement save logic
  };

  const goToScenarioAnalysis = () => alert('시나리오 분석 (구현 예정)');

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Explicit Header with Back Button */}
      <View style={styles.explicitHeader}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#FFFFFF" />
        </TouchableOpacity>
         <View style={{flex:1}} /> 
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.screenTitle}>설득 메시지 생성기</Text>
        <Text style={styles.screenDescription}>AI의 도움을 받아 효과적인 메시지를 작성해보세요.</Text>

        <View style={styles.section}>
          <Text style={styles.label}>메시지 목적</Text>
          <TextInput
            style={styles.messagePurposeInput}
            placeholder="메시지의 목적을 입력하세요 (최대 300자)"
            placeholderTextColor="#666"
            value={messagePurpose}
            onChangeText={setMessagePurpose}
            multiline
            maxLength={300}
            textAlignVertical="top"
          />
          <Text style={styles.characterCount}>
            {messagePurpose.length}/300
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>말투 스타일</Text>
          <View style={styles.buttonGroup}>
             <OptionButton label="논리적" selected={toneStyle === 'logical'} onPress={() => setToneStyle('logical')} />
             <OptionButton label="감성적" selected={toneStyle === 'emotional'} onPress={() => setToneStyle('emotional')} />
             <OptionButton label="호기심 유발" selected={toneStyle === 'curious'} onPress={() => setToneStyle('curious')} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>추천 목표</Text>
          <Text style={styles.sectionDescription}>당신의 데이터를 분석한 결과, 다음과 같은 목표가 추천됩니다.</Text>
          {isLoadingGoals ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#4A90E2" />
              <Text style={styles.loadingText}>추천 목표를 불러오는 중...</Text>
            </View>
          ) : (
            <FlatList
              data={recommendedGoals}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <RecommendedGoalItem goal={item} />
              )}
              scrollEnabled={false}
              style={styles.goalsList}
            />
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>생성된 메시지</Text>
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{generatedMessage}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>예측 결과</Text>
          <View style={styles.predictionContainer}>
            <View style={styles.predictionItem}>
              <Text style={styles.predictionLabel}>긍정적 반응</Text>
              <Text style={styles.predictionValue}>{prediction}</Text>
            </View>
          </View>
          {warning && (
            <View style={styles.warningContainer}>
              <Ionicons name="warning" size={20} color="#FF9500" />
              <Text style={styles.warningText}>{warning}</Text>
            </View>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.generateButton]}
            onPress={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <Text style={styles.buttonText}>메시지 생성하기</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.saveButton]}
            onPress={handleSave}
          >
            <Text style={styles.buttonText}>저장하기</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.analysisButton}
          onPress={goToScenarioAnalysis}
        >
          <Text style={styles.analysisButtonText}>시나리오 분석하기</Text>
          <MaterialIcons name="arrow-forward" size={20} color="#4A90E2" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000000', // Black background
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
  contentContainer: {
    padding: 20,
    paddingTop: 0, // Ensure no top padding here
    backgroundColor: '#000000', // Match SafeArea background
    paddingBottom: 40,
  },
  screenTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  screenDescription: {
    color: '#A0A0A0',
    fontSize: 16,
    marginBottom: 30,
  },
  section: {
    marginBottom: 25,
  },
  inputGroup: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    fontSize: 14,
    color: '#AAA',
    marginBottom: 10,
  },
  inputContainer: {
    width: '100%',
    backgroundColor: '#1C1C1E', // Darker card background
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
  buttonGroup: {
      flexDirection: 'row',
      justifyContent: 'space-between',
  },
  optionButton: {
      paddingHorizontal: 15,
      backgroundColor: '#282828', // Slightly lighter than card background
      paddingVertical: 12,
      borderRadius: 20,
      alignItems: 'center',
      marginHorizontal: 4,
      borderWidth: 1,
      borderColor: '#444', // Subtle border for non-selected
  },
  optionButtonSelected: {
      backgroundColor: '#4A90E2',
      borderColor: '#4A90E2',
  },
  optionButtonText: {
      color: '#FFF',
      fontSize: 14,
  },
  optionButtonTextSelected: {
      fontWeight: 'bold',
  },
   checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
    backgroundColor: '#1C1C1E', // Background for the row
    padding: 15,
    borderRadius: 10,
  },
  checkboxBase: {
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#4A90E2',
    backgroundColor: 'transparent', // Make base transparent
    marginRight: 12, // Increased margin
  },
  checkboxLabel: {
    color: '#FFF',
    fontSize: 15, // Slightly larger
    flex: 1,
  },
   messageContainer: {
       backgroundColor: '#1C1C1E', // Darker card background
       borderRadius: 10,
       padding: 15,
       minHeight: 120, // Increased height
       marginBottom: 10,
   },
   messageText: {
       color: '#FFF',
       fontSize: 15,
       lineHeight: 22,
       textAlignVertical: 'top',
   },
    predictionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        backgroundColor: '#1C1C1E',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    predictionItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    predictionLabel: {
        fontSize: 14,
        color: '#AAA',
        marginRight: 5,
    },
    predictionValue: {
        fontSize: 14,
        color: '#4A90E2',
        fontWeight: 'bold',
    },
    warningContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#332d1a',
        padding: 10,
        borderRadius: 8,
    },
    warningText: {
        fontSize: 13,
        color: '#FFA500',
        marginLeft: 8,
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#444',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginRight: 10,
        minHeight: 50,
    },
    generateButton: {
        backgroundColor: '#4A90E2',
    },
    saveButton: {
        backgroundColor: '#4A90E2',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    analysisButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#1C1C1E', // Darker card background
        borderRadius: 10,
        padding: 15,
        marginTop: 10,
    },
    analysisButtonText: {
        fontSize: 14,
        color: '#FFF',
        fontWeight: 'bold',
    },
    goalsList: {
        marginTop: 10,
    },
    loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    loadingText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#AAA',
    },
    goalItem: {
        backgroundColor: '#1C1C1E',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
    },
    goalItemContent: {
        flex: 1,
    },
    goalItemTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFF',
        marginBottom: 4,
    },
    goalItemDescription: {
        fontSize: 14,
        color: '#AAA',
        marginBottom: 8,
    },
    goalItemReason: {
        fontSize: 14,
        color: '#AAA',
        marginTop: 8,
        fontStyle: 'italic',
    },
    sectionDescription: {
        fontSize: 14,
        color: '#AAA',
        marginBottom: 15,
    },
    messagePurposeInput: {
        backgroundColor: '#1C1C1E',
        borderRadius: 10,
        padding: 15,
        color: '#FFF',
        fontSize: 16,
        minHeight: 100,
        textAlignVertical: 'top',
    },
    characterCount: {
        color: '#666',
        fontSize: 12,
        textAlign: 'right',
        marginTop: 5,
    },
});

export default MessageGeneratorScreen; 