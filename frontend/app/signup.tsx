import React, { useState, Dispatch, SetStateAction } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  Platform,
  Dimensions
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; // Import icons

// Define types for Checkbox props
interface CheckboxProps {
  label: string;
  value: boolean;
  onValueChange: (newValue: boolean) => void;
  linkText?: string; // Optional
  onLinkPress?: () => void; // Optional
}

// Basic Checkbox Component with types
const Checkbox: React.FC<CheckboxProps> = ({ label, value, onValueChange, linkText, onLinkPress }) => (
  <View style={styles.checkboxContainer}>
    <TouchableOpacity onPress={() => onValueChange(!value)} style={styles.checkboxBase}>
      {value && <Ionicons name="checkmark" size={20} color="#4A90E2" />}
    </TouchableOpacity>
    <Text style={styles.checkboxLabel}>{label}</Text>
    {linkText && onLinkPress && ( // Ensure onLinkPress is also checked
      <TouchableOpacity onPress={onLinkPress} style={styles.checkboxLinkContainer}>
        <Text style={styles.checkboxLink}>{linkText}</Text>
      </TouchableOpacity>
    )}
  </View>
);

// Define types for PasswordStrengthMeter props
interface PasswordStrengthMeterProps {
  password: string;
}

// Basic Password Strength Meter with types
const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password }) => {
  const getStrength = () => {
    let score = 0;
    if (!password) return score;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++; // Special character
    return Math.min(score, 4); // Cap score at 4 for simplicity
  };

  const strength = getStrength();
  const strengthPercentage = (strength / 4) * 100;
  const barColor = strength <= 1 ? '#ff4d4f' : strength <= 2 ? '#ffa940' : strength <= 3 ? '#faad14' : '#52c41a';

  return (
    <View style={styles.strengthContainer}>
      <View style={styles.strengthBarBackground}>
        <View style={[styles.strengthBar, { width: `${strengthPercentage}%`, backgroundColor: barColor }]} />
      </View>
      <Text style={styles.strengthText}>
        {strength <= 1 ? '숫자와 특수문자 추가 시 더 안전합니다' : '비밀번호 강도'}
      </Text>
    </View>
  );
};

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeMarketing, setAgreeMarketing] = useState(false);

  const router = useRouter();

  const handleSignUp = () => {
    if (!agreeTerms || !agreePrivacy) {
        Alert.alert('동의 필요', '필수 약관에 동의해주세요.');
        return;
    }
    if (password !== confirmPassword) {
      Alert.alert('오류', '비밀번호가 일치하지 않습니다.');
      return;
    }
    // TODO: Implement sign up logic (mock or actual API call)
    console.log('Sign up attempt with:', email, password, { agreeTerms, agreePrivacy, agreeMarketing });
    Alert.alert('회원가입 성공 (가상)', '온보딩을 시작합니다.');
    router.replace('/onboarding/step1');
  };

    const handleGoogleSignUp = () => {
        // TODO: Implement Google sign up
        Alert.alert('알림', 'Google 가입 기능은 아직 구현되지 않았습니다.');
    };

    const handleAppleSignUp = () => {
        // TODO: Implement Apple sign up
        Alert.alert('알림', 'Apple 가입 기능은 아직 구현되지 않았습니다.');
    };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>이메일</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="example@email.com"
              placeholderTextColor="#888"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>비밀번호</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="#888"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!isPasswordVisible}
            />
            <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.eyeIcon}>
              <Ionicons name={isPasswordVisible ? "eye-off-outline" : "eye-outline"} size={24} color="#888" />
            </TouchableOpacity>
          </View>
        </View>

         <View style={styles.inputGroup}>
          <Text style={styles.label}>비밀번호 확인</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="#888"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!isConfirmPasswordVisible}
            />
            <TouchableOpacity onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)} style={styles.eyeIcon}>
              <Ionicons name={isConfirmPasswordVisible ? "eye-off-outline" : "eye-outline"} size={24} color="#888" />
            </TouchableOpacity>
          </View>
        </View>

        <PasswordStrengthMeter password={password} />

        <Checkbox
          label="이용약관 동의 (필수)"
          value={agreeTerms}
          onValueChange={setAgreeTerms}
          linkText="보기"
          onLinkPress={() => Alert.alert('알림', '이용약관 보기 기능 구현 예정')}
        />
        <Checkbox
          label="개인정보 수집 및 이용 동의 (필수)"
          value={agreePrivacy}
          onValueChange={setAgreePrivacy}
          linkText="보기"
          onLinkPress={() => Alert.alert('알림', '개인정보처리방침 보기 기능 구현 예정')}
        />
        <Checkbox
          label="마케팅 정보 수신 동의 (선택)"
          value={agreeMarketing}
          onValueChange={setAgreeMarketing}
        />

        <View style={styles.trialBanner}>
           <Text style={styles.trialBannerTitle}>✨ 가입 즉시 프리미엄 7일 무료 체험</Text>
           <Text style={styles.trialBannerSubtitle}>이별 후 재결합 확률이 평균 68% 향상됩니다</Text>
        </View>

        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpButtonText}>가입하기</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>또는</Text>

         <View style={styles.socialLoginContainer}>
          <TouchableOpacity style={styles.socialButton} onPress={handleGoogleSignUp}>
             <MaterialCommunityIcons name="google" size={20} color="#FFF" style={{ marginRight: 10 }} />
            <Text style={styles.socialButtonText}>Google로 가입</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton} onPress={handleAppleSignUp}>
             <MaterialCommunityIcons name="apple" size={20} color="#FFF" style={{ marginRight: 10 }} />
            <Text style={styles.socialButtonText}>Apple로 가입</Text>
          </TouchableOpacity>
        </View>

        {/* Removed the "back to login" link as header handles it */}
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
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#121212',
  },
  inputGroup: {
    marginBottom: 15,
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
  },
  input: {
    flex: 1,
    color: '#FFF',
    fontSize: 16,
  },
  eyeIcon: {
    padding: 5,
  },
  strengthContainer: {
      width: '100%',
      marginTop: 0, // Adjust spacing if needed
      marginBottom: 25,
  },
  strengthBarBackground: {
      height: 6,
      backgroundColor: '#444',
      borderRadius: 3,
      overflow: 'hidden',
      width: '100%',
  },
  strengthBar: {
      height: '100%',
      borderRadius: 3,
  },
  strengthText: {
      marginTop: 5,
      fontSize: 12,
      color: '#AAA',
      textAlign: 'left',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
  },
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#4A90E2',
    backgroundColor: '#282828',
    marginRight: 12,
  },
  checkboxLabel: {
    color: '#FFF',
    fontSize: 14,
    flex: 1, // Take remaining space
  },
   checkboxLinkContainer: {
     marginLeft: 'auto', // Push link to the right
     paddingVertical: 5, // Add padding for easier tap
  },
  checkboxLink: {
    color: '#4A90E2',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  trialBanner: {
    width: '100%',
    backgroundColor: '#282828',
    borderRadius: 10,
    padding: 15,
    marginBottom: 25,
    marginTop: 10,
  },
   trialBannerTitle: {
      color: '#FFF',
      fontSize: 15,
      fontWeight: 'bold',
      marginBottom: 5,
  },
  trialBannerSubtitle: {
      color: '#AAA',
      fontSize: 13,
  },
  signUpButton: {
    width: '100%',
    backgroundColor: '#4A90E2',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  signUpButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orText: {
    color: '#AAA',
    textAlign: 'center',
    marginBottom: 20,
  },
  socialLoginContainer: {
    flexDirection: Platform.OS === 'ios' ? 'row' : 'column', // Row on iOS, Column on others for better spacing potentially
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  socialButton: {
    flex: Platform.OS === 'ios' ? 1 : 0,
    flexDirection: 'row',
    backgroundColor: '#282828',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Platform.OS === 'ios' ? 5 : 0,
    marginBottom: Platform.OS === 'ios' ? 0 : 10, // Add margin bottom on non-iOS
  },
  socialButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  // Removed backLink style as it's no longer used
});

export default SignUpScreen; 