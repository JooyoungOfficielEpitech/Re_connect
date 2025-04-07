import React from 'react';
import { View, Text, StyleSheet, DimensionValue } from 'react-native';

interface PasswordStrengthMeterProps {
  password: string;
}

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password }) => {
  const getPasswordStrength = (password: string): { score: number; label: string; color: string } => {
    if (!password) return { score: 0, label: '비밀번호를 입력하세요', color: '#888' };

    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const strengthMap = {
      0: { label: '매우 약함', color: '#FF4444' },
      1: { label: '약함', color: '#FF8844' },
      2: { label: '보통', color: '#FFCC44' },
      3: { label: '강함', color: '#44CC44' },
      4: { label: '매우 강함', color: '#44AA44' },
      5: { label: '최상', color: '#228822' },
    };

    return {
      score,
      ...strengthMap[score as keyof typeof strengthMap],
    };
  };

  const strength = getPasswordStrength(password);
  const barWidth = ((strength.score / 5) * 100) as DimensionValue;

  return (
    <View style={styles.container}>
      <View style={styles.barContainer}>
        <View style={[styles.bar, { width: barWidth, backgroundColor: strength.color }]} />
      </View>
      <Text style={[styles.label, { color: strength.color }]}>{strength.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  barContainer: {
    height: 4,
    backgroundColor: '#333',
    borderRadius: 2,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: 2,
  },
  label: {
    fontSize: 12,
    marginTop: 5,
  },
}); 