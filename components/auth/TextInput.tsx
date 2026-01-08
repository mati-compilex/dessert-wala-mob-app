import { AppColors } from '@/constants/colors';
import { BorderRadius, Spacing } from '@/constants/spacing';
import { FontSizes, FontWeights } from '@/constants/typography';
import React from 'react';
import {
    TextInput as RNTextInput,
    StyleSheet,
    Text,
    TextInputProps,
    View,
    ViewStyle,
} from 'react-native';

interface CustomTextInputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  disabled?: boolean;
}

export const TextInput = React.forwardRef<RNTextInput, CustomTextInputProps>(
  ({ label, error, containerStyle, disabled = false, style, ...props }, ref) => {
    return (
      <View style={[styles.container, containerStyle]}>
        {label && <Text style={styles.label}>{label}</Text>}
        <RNTextInput
          ref={ref}
          style={[
            styles.input,
            error && styles.inputError,
            disabled && styles.inputDisabled,
            style,
          ]}
          placeholderTextColor={AppColors.text.light}
          editable={!disabled}
          {...props}
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  }
);

TextInput.displayName = 'TextInput';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: Spacing.sm,
  },
  label: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
    color: AppColors.text.dark,
    marginBottom: Spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: AppColors.border.light,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    fontSize: FontSizes.md,
    color: AppColors.text.dark,
    backgroundColor: AppColors.background.white,
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
    marginTop: Spacing.xs,
  },
});
