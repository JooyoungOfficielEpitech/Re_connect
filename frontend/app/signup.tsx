import React, { useState } from 'react';
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
import { Checkbox } from '@/components/Checkbox';
import { PasswordStrengthMeter } from '@/components/PasswordStrengthMeter';
import { userApi } from '@/services/api';

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

  const handleSignUp = async () => {
    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('오류', '올바른 이메일 형식이 아닙니다.');
      return;
    }

    // 비밀번호 검증
    if (password.length < 8) {
      Alert.alert('오류', '비밀번호는 8자 이상이어야 합니다.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('오류', '비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!agreeTerms || !agreePrivacy) {
      Alert.alert('오류', '필수 약관에 동의해주세요.');
      return;
    }

    try {
      // 사용자 이름 생성 (이메일의 @ 앞부분 + 랜덤 숫자)
      const baseUsername = email.split('@')[0];
      const randomNum = Math.floor(Math.random() * 1000);
      const username = baseUsername.length >= 3 ? baseUsername : `${baseUsername}${randomNum}`;
      
      // API 요청 데이터 로깅
      const signupData = {
        email,
        password,
        username,
        full_name: username, // 사용자 이름을 full_name으로도 사용
      };
      console.log('회원가입 요청 데이터:', signupData);

      // 실제 회원가입 API 호출
      const response = await userApi.signup(signupData);
      console.log('회원가입 응답:', response);

      // 회원가입 성공 시 온보딩 페이지로 이동
      Alert.alert('회원가입 성공', '온보딩을 시작합니다.');
      router.replace('/onboarding/step1');
    } catch (error: any) {
      console.error('회원가입 실패:', error);
      console.error('에러 응답:', error.response?.data);
      
      if (error.response?.status === 422) {
        const errorMessage = error.response.data.detail || '입력하신 정보를 다시 확인해주세요.';
        Alert.alert('회원가입 실패', errorMessage);
      } else if (error.response?.status === 400) {
        const errorMessage = error.response.data.detail || '이미 가입된 이메일입니다.';
        Alert.alert('회원가입 실패', errorMessage);
      } else {
        Alert.alert('회원가입 실패', '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    }
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