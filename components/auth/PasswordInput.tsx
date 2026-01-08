import { AppColors } from '@/constants/colors';
import { BorderRadius, Spacing } from '@/constants/spacing';
import { FontSizes, FontWeights } from '@/constants/typography';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Pressable,
    TextInput as RNTextInput,
    StyleSheet,
    Text,
    TextInputProps,
    View,
    ViewStyle,
} from 'react-native';

interface CustomPasswordInputProps extends Omit<TextInputProps, 'secureTextEntry'> {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  disabled?: boolean;
}

export const PasswordInput = React.forwardRef<RNTextInput, CustomPasswordInputProps>(
  ({ label, error, containerStyle, disabled = false, style, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <View style={[styles.container, containerStyle]}>
        {label && <Text style={styles.label}>{label}</Text>}
        <View style={styles.inputWrapper}>
          <RNTextInput
            ref={ref}
            style={[
              styles.input,
              error && styles.inputError,
              disabled && styles.inputDisabled,
              style,
            ]}
            placeholderTextColor={AppColors.text.light}
            secureTextEntry={!showPassword}
            editable={!disabled}
            {...props}
          />
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            style={styles.iconButton}
            disabled={disabled}
          >
            <MaterialCommunityIcons
              name={showPassword ? 'eye-off' : 'eye'}
              size={20}
              color={AppColors.text.medium}
            />
          </Pressable>
        </View>
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';

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
  inputWrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: AppColors.border.light,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    paddingRight: Spacing.xl + Spacing.md,
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
  iconButton: {
    position: 'absolute',
    right: Spacing.md,
    padding: Spacing.sm,
  },
  errorText: {
    fontSize: FontSizes.xs,
    color: AppColors.text.error,
    marginTop: Spacing.xs,
  },
});
