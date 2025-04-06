import { StyleSheet, Text, TouchableOpacity, ViewStyle, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { forwardRef } from 'react';

interface CustomButtonProps {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary';
  style?: ViewStyle;
}

export const CustomButton = forwardRef<View, CustomButtonProps>(({
  title, 
  onPress, 
  variant = 'primary',
  style,
}, ref) => {
  return (
    <TouchableOpacity 
      ref={ref}
      style={[
        styles.button,
        variant === 'secondary' && styles.secondaryButton,
        style,
      ]} 
      onPress={onPress}
    >
      <Text style={[
        styles.text,
        variant === 'secondary' && styles.secondaryText,
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
});

CustomButton.displayName = 'CustomButton';

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.light.blue,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.dark.text,
  },
  text: {
    color: Colors.light.text,
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryText: {
    color: Colors.dark.text,
  },
}); 