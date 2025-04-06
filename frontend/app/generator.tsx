import React, { useState } from 'react';
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
  StatusBar
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

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

const MessageGeneratorScreen = () => {
  const router = useRouter();
  const [messageType, setMessageType] = useState('첫 연락 (이별 후 28일)'); // Mock data
  const [toneStyle, setToneStyle] = useState('logical'); // logical, emotional, curious
  const [goalLightConversation, setGoalLightConversation] = useState(true);
  const [goalRecallMemory, setGoalRecallMemory] = useState(false);
  const [generatedMessage, setGeneratedMessage] = useState('안녕 오랜만이야. 지난번에 네가 추천해줬던 그 책 드디어 읽어봤는데...'); // Mock generated message
  const [prediction, setPrediction] = useState('68%'); // Mock prediction
  const [warning, setWarning] = useState<string | null>('약간의 감정적 자극이 있을 수 있음'); // Allow string or null
  const [isGenerating, setIsGenerating] = useState(false); // State for generation loading

  const selectMessageType = () => alert('메시지 유형 선택 (구현 예정)');

  const handleGenerate = async () => {
    if (!messageType || !toneStyle || !goalLightConversation || !goalRecallMemory) {
      Alert.alert('입력 오류', '모든 필드를 입력해주세요.');
      return;
    }
    setIsGenerating(true);
    console.log('Generating message with:', { messageType, toneStyle, goalLightConversation, goalRecallMemory });
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Mock new message generation (replace with actual API response)
    setGeneratedMessage(generatedMessage + ' (재생성됨)');
    setPrediction(`${Math.floor(Math.random() * 30) + 50}%`); // Random prediction
    setWarning(Math.random() > 0.5 ? '주의: 상대방이 부담을 느낄 수 있음' : null); // Set to string or null
    setIsGenerating(false);
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

        <InputRow label="메시지 유형" value={messageType} onPress={selectMessageType} />

        <View style={styles.section}>
          <Text style={styles.label}>말투 스타일</Text>
          <View style={styles.buttonGroup}>
             <OptionButton label="논리적" selected={toneStyle === 'logical'} onPress={() => setToneStyle('logical')} />
             <OptionButton label="감성적" selected={toneStyle === 'emotional'} onPress={() => setToneStyle('emotional')} />
             <OptionButton label="호기심 유발" selected={toneStyle === 'curious'} onPress={() => setToneStyle('curious')} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>메시지 목표</Text>
           <Checkbox label="가벼운 대화로 시작" value={goalLightConversation} onValueChange={setGoalLightConversation} />
           <Checkbox label="과거 추억 상기시키기" value={goalRecallMemory} onValueChange={setGoalRecallMemory} />
        </View>

        <View style={styles.section}>
           <Text style={styles.label}>생성된 메시지</Text>
           <View style={styles.messageOutputContainer}>
               <TextInput
                   style={styles.messageOutput}
                   value={generatedMessage}
                   onChangeText={setGeneratedMessage} // Allow editing for now
                   multiline
                   editable={!isGenerating} // Disable editing while generating
               />
           </View>
            <Text style={styles.predictionText}>
                설득 성공 예측률: <Text style={{ color: '#4A90E2', fontWeight: 'bold' }}>{prediction}</Text>
            </Text>
            {warning && (
                <View style={styles.warningContainer}>
                    <Ionicons name="alert-circle-outline" size={16} color="#FFA500" style={{ marginRight: 5 }}/>
                    <Text style={styles.warningText}>{warning}</Text>
                </View>
            )}
        </View>

        <View style={styles.actionButtonsContainer}>
            <TouchableOpacity style={styles.regenerateButton} onPress={handleGenerate} disabled={isGenerating}>
                {isGenerating ? <ActivityIndicator color="#FFF" /> : <Text style={styles.buttonText}>재생성</Text>}
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={isGenerating}>
                <Text style={styles.buttonText}>메시지 저장</Text>
            </TouchableOpacity>
        </View>

         <TouchableOpacity style={styles.nextStepContainer} onPress={goToScenarioAnalysis}>
             <Text style={styles.nextStepText}>다음: 이 메시지 이후 시나리오 분석</Text>
             <MaterialIcons name="keyboard-arrow-right" size={24} color="#888" />
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
   messageOutputContainer: {
       backgroundColor: '#1C1C1E', // Darker card background
       borderRadius: 10,
       padding: 15,
       minHeight: 120, // Increased height
       marginBottom: 10,
   },
   messageOutput: {
       color: '#FFF',
       fontSize: 15,
       lineHeight: 22,
       textAlignVertical: 'top',
   },
    predictionText: {
        fontSize: 14,
        color: '#AAA',
        marginBottom: 5,
        marginTop: 10, // Added margin top
    },
    warningContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        backgroundColor: '#332d1a', // Dark yellow background for warning
        padding: 10,
        borderRadius: 8,
    },
    warningText: {
        fontSize: 13,
        color: '#FFA500',
        flex: 1,
    },
    actionButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 20,
    },
    regenerateButton: {
        backgroundColor: '#444',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginRight: 10,
        minHeight: 50,
    },
    saveButton: {
        backgroundColor: '#4A90E2',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginLeft: 10,
        minHeight: 50,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    nextStepContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#1C1C1E', // Darker card background
        borderRadius: 10,
        padding: 15,
        marginTop: 10,
    },
    nextStepText: {
        fontSize: 14,
        color: '#FFF',
        fontWeight: 'bold',
    },
});

export default MessageGeneratorScreen; 