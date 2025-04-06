import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Platform, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { useAuth } from '@/context/AuthContext';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('오류', '이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Login successful for:', email);
      login();
    } catch (error) {
      console.error('Login failed:', error);
      Alert.alert('로그인 실패', '이메일 또는 비밀번호가 올바르지 않습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // TODO: Implement Google login
    console.log('Google Login attempt');
    Alert.alert('Google 로그인 기능은 아직 구현되지 않았습니다.');
  };

  const handleAppleLogin = () => {
    // TODO: Implement Apple login
    console.log('Apple Login attempt');
    Alert.alert('Apple 로그인 기능은 아직 구현되지 않았습니다.');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <Text style={styles.title}>Re:connect</Text>
        <View style={styles.logoPlaceholder}>
          <AntDesign name="plus" size={40} color="#4A90E2" />
        </View>
        <Text style={styles.subtitle}>기계적 연애, 전략적 재결합</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="이메일"
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {/* Add confirmation button if needed based on design */}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="비밀번호"
            placeholderTextColor="#888"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {/* Add visibility toggle icon if needed */}
        </View>

        <TouchableOpacity
          style={[styles.loginButton, isLoading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={styles.loginButtonText}>로그인</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.orText}>또는</Text>

        <View style={styles.socialLoginContainer}>
          <TouchableOpacity style={styles.socialButton} onPress={handleGoogleLogin}>
            <Text style={styles.socialButtonText}>Google 로그인</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton} onPress={handleAppleLogin}>
            <Text style={styles.socialButtonText}>Apple 로그인</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.linksContainer}>
          <TouchableOpacity onPress={() => Alert.alert('알림', '비밀번호 찾기 기능은 아직 구현되지 않았습니다.')}>
            <Text style={styles.linkText}>비밀번호 찾기</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/signup')}>
            <Text style={styles.linkText}>회원가입</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.trialBanner}>
          <Text style={styles.trialTitle}>👑 7일간 모든 기능 무료 체험</Text>
          <Text style={styles.trialSubtitle}>가입 후 바로 이용 가능</Text>
          <TouchableOpacity style={styles.trialButton} onPress={() => alert('자세히 보기 기능은 아직 구현되지 않았습니다.')}>
            <Text style={styles.trialButtonText}>자세히</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity onPress={() => alert('개인정보처리방침 기능은 아직 구현되지 않았습니다.')}>
              <Text style={styles.footerText}>개인정보처리방침</Text>
          </TouchableOpacity>
          <Text style={styles.footerSeparator}> | </Text>
           <TouchableOpacity onPress={() => alert('이용약관 기능은 아직 구현되지 않았습니다.')}>
             <Text style={styles.footerText}>이용약관</Text>
           </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212', // Dark background
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#121212', // Dark background
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4A90E2', // Blue color for the title
    marginBottom: 10,
  },
  logoPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 5,
    borderColor: '#4A90E2', // Blue border
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#AAA', // Light grey subtitle
    marginBottom: 40,
  },
  inputContainer: {
    width: '100%',
    backgroundColor: '#282828', // Darker input background
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    flexDirection: 'row', // For potential icons/buttons inside
    alignItems: 'center', // Align items vertically
  },
  input: {
    flex: 1, // Take remaining space
    height: 50,
    color: '#FFF', // White text color
    fontSize: 16,
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#4A90E2', // Blue button
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orText: {
    color: '#AAA',
    marginBottom: 20,
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  socialButton: {
    flex: 1, // Take half width
    backgroundColor: '#282828', // Darker button background
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5, // Add some space between buttons
  },
  socialButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  linkText: {
    color: '#4A90E2', // Blue link text
    fontSize: 14,
  },
  trialBanner: {
    width: '100%',
    backgroundColor: '#282828',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    flexDirection: 'row', // Arrange items horizontally
    alignItems: 'center', // Align items vertically
    justifyContent: 'space-between', // Space out items
  },
  trialTitle: {
      color: '#FFF',
      fontSize: 14,
      fontWeight: 'bold',
  },
  trialSubtitle: {
      color: '#AAA',
      fontSize: 12,
      flex: 1, // Allow text to wrap
      marginHorizontal: 10,
  },
  trialButton: {
    backgroundColor: '#444', // Dark grey button
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20, // Make it rounded
  },
  trialButtonText: {
    color: '#FFF',
    fontSize: 12,
  },
  footer: {
    flexDirection: 'row', // Arrange items horizontally
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 20 : 10, // Adjust position based on OS for safe area
  },
  footerText: {
    color: '#AAA',
    fontSize: 12,
  },
    footerSeparator: {
        color: '#AAA',
        fontSize: 12,
        marginHorizontal: 5,
    },
  buttonDisabled: {
    backgroundColor: '#888',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen; 