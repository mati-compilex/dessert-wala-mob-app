import { AuthHeader } from '@/components/auth/AuthHeader';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthLink } from '@/components/auth/AuthLink';
import { Button } from '@/components/auth/Button';
import { PasswordInput } from '@/components/auth/PasswordInput';
import { Spacing } from '@/constants/spacing';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

interface SetNewPasswordScreenProps {
  onBack: () => void;
  onConfirm: (password: string) => void;
}

export const SetNewPasswordScreen: React.FC<SetNewPasswordScreenProps> = ({
  onBack,
  onConfirm,
}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    password?: string;
    confirmPassword?: string;
  }>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirm = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      onConfirm(password);
    } catch (error) {
      console.error('Set password error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <View style={styles.container}>
        <View style={styles.content}>
          <AuthHeader
            title="Set New Password"
            subtitle="Your new password must be different from previous password"
            containerStyle={styles.header}
          />

          <View style={styles.form}>
            <PasswordInput
              label="Password"
              placeholder="Enter new password"
              value={password}
              onChangeText={setPassword}
              editable={!loading}
              error={errors.password}
            />

            <PasswordInput
              label="Confirm Password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              editable={!loading}
              error={errors.confirmPassword}
            />

            <Button
              title="Confirm Password"
              onPress={handleConfirm}
              loading={loading}
              disabled={loading}
              containerStyle={styles.button}
            />
          </View>
        </View>

        <AuthLink
          text=""
          linkText="Go Back to Login"
          onPress={onBack}
          variant="back"
        />
      </View>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: Spacing.xl,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  header: {
    marginTop: Spacing.xl,
    marginBottom: Spacing.xxl,
  },
  form: {
    gap: Spacing.md,
  },
  button: {
    marginTop: Spacing.xl,
  },
});

export default SetNewPasswordScreen;
