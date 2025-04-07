import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CheckboxProps {
  label: string;
  value: boolean;
  onValueChange: (newValue: boolean) => void;
  linkText?: string;
  onLinkPress?: () => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, value, onValueChange, linkText, onLinkPress }) => (
  <View style={styles.checkboxContainer}>
    <TouchableOpacity onPress={() => onValueChange(!value)} style={styles.checkboxBase}>
      {value && <Ionicons name="checkmark" size={20} color="#4A90E2" />}
    </TouchableOpacity>
    <Text style={styles.checkboxLabel}>{label}</Text>
    {linkText && onLinkPress && (
      <TouchableOpacity onPress={onLinkPress} style={styles.checkboxLinkContainer}>
        <Text style={styles.checkboxLink}>{linkText}</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkboxBase: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#4A90E2',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxLabel: {
    color: '#FFF',
    fontSize: 14,
    flex: 1,
  },
  checkboxLinkContainer: {
    marginLeft: 5,
  },
  checkboxLink: {
    color: '#4A90E2',
    fontSize: 14,
  },
}); 