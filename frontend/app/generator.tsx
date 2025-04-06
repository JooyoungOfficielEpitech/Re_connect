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
  ActivityIndicator
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
      <ScrollView contentContainerStyle={styles.container}>

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
    backgroundColor: '#121212',
  },
  container: {
    padding: 20,
    backgroundColor: '#121212',
    paddingBottom: 40,
  },
  section: {
    marginBottom: 25,
  },
  inputGroup: { // Reusing from onboarding
    marginBottom: 20,
    width: '100%',
  },
  label: {
    fontSize: 14,
    color: '#AAA',
    marginBottom: 10,
  },
  inputContainer: { // Reusing from onboarding
    width: '100%',
    backgroundColor: '#282828',
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputText: { // Reusing from onboarding
      color: '#FFF',
      fontSize: 16,
  },
  buttonGroup: {
      flexDirection: 'row',
      justifyContent: 'space-between', // Adjust as needed, maybe 'flex-start' and add margin
  },
  optionButton: { // Reusing from onboarding
      // flex: 1, // Adjust width/flex as needed for 3 buttons
      paddingHorizontal: 15, // Adjust padding
      backgroundColor: '#282828',
      paddingVertical: 12, // Slightly smaller vertical padding
      borderRadius: 20, // More rounded
      alignItems: 'center',
      marginHorizontal: 4,
  },
  optionButtonSelected: { // Reusing from onboarding
      backgroundColor: '#4A90E2',
  },
  optionButtonText: { // Reusing from onboarding
      color: '#FFF',
      fontSize: 14, // Slightly smaller text
  },
  optionButtonTextSelected: { // Reusing from onboarding
      fontWeight: 'bold',
  },
   checkboxContainer: { // Reusing from signup
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10, // Reduced margin
    width: '100%',
  },
  checkboxBase: { // Reusing from signup
    width: 22, // Slightly smaller
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#4A90E2',
    backgroundColor: '#282828',
    marginRight: 10,
  },
  checkboxLabel: { // Reusing from signup
    color: '#FFF',
    fontSize: 14,
    flex: 1,
  },
   messageOutputContainer: {
       backgroundColor: '#282828',
       borderRadius: 10,
       padding: 15,
       minHeight: 100, // Ensure some height
       marginBottom: 10,
   },
   messageOutput: {
       color: '#FFF',
       fontSize: 15,
       lineHeight: 22,
       textAlignVertical: 'top', // For Android multiline
   },
    predictionText: {
        fontSize: 14,
        color: '#AAA',
        marginBottom: 5,
    },
    warningContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    warningText: {
        fontSize: 13,
        color: '#FFA500',
        flex: 1, // Allow text wrapping
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
        backgroundColor: '#282828',
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