import { AppColors } from '@/constants/colors';
import { BorderRadius, Spacing } from '@/constants/spacing';
import { FontSizes, FontWeights } from '@/constants/typography';
import React, { useEffect, useRef } from 'react';
import {
    TextInput as RNTextInput,
    StyleSheet,
    Text,
    View,
    ViewStyle,
} from 'react-native';

interface OTPInputProps {
  value: string;
  onChangeText: (text: string) => void;
  length?: number;
  containerStyle?: ViewStyle;
  error?: string;
  disabled?: boolean;
}

export const OTPInput: React.FC<OTPInputProps> = ({
  value,
  onChangeText,
  length = 6,
  containerStyle,
  error,
  disabled = false,
}) => {
  const inputRefs = useRef<(RNTextInput | null)[]>([]);

  useEffect(() => {
    if (value.length > 0 && value.length < length) {
      inputRefs.current[value.length]?.focus();
    }
  }, [value, length]);

  const handleChange = (text: string, index: number) => {
    // Only allow digits
    const digit = text.replace(/[^0-9]/g, '');

    if (digit.length > 1) {
      // Handle paste
      const pastedDigits = digit.slice(0, length - index);
      const newValue = value.substring(0, index) + pastedDigits;
      onChangeText(newValue.slice(0, length));
      inputRefs.current[Math.min(index + pastedDigits.length, length - 1)]?.focus();
    } else if (digit === '') {
      // Handle deletion
      const newValue = value.substring(0, index);
      onChangeText(newValue);
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else {
      // Handle single digit input
      const newValue = value.substring(0, index) + digit + value.substring(index + 1);
      onChangeText(newValue);
      if (index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && value[index] === undefined && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const otpArray = Array.from({ length }, (_, i) => value[i] || '');

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.inputRow}>
        {otpArray.map((digit, index) => (
          <RNTextInput
            key={index}
            ref={(ref) => {
              inputRefs.current[index] = ref;
            }}
            style={[
              styles.input,
              error && styles.inputError,
              disabled && styles.inputDisabled,
              digit && styles.inputFilled,
            ]}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            keyboardType="numeric"
            maxLength={1}
            editable={!disabled}
            selectTextOnFocus
            placeholder="-"
            placeholderTextColor={AppColors.border.light}
          />
        ))}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.md,
    width: '100%',
  },
  input: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: AppColors.border.light,
    borderRadius: BorderRadius.md,
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
    textAlign: 'center',
    color: AppColors.text.dark,
    backgroundColor: AppColors.background.white,
  },
  inputFilled: {
    borderColor: AppColors.primary,
    backgroundColor: AppColors.background.cream,
  },
  inputError: {
    borderColor: AppColors.text.error,
  },
  inputDisabled: {
    backgroundColor: AppColors.background.light,
    color: AppColors.text.light,
  },
  errorText: {
    fontSize: FontSizes.xs,
    color: AppColors.text.error,
    marginTop: Spacing.md,
  },
});
