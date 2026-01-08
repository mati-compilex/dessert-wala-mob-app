import { AuthHeader } from '@/components/auth/AuthHeader';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthLink } from '@/components/auth/AuthLink';
import { Button } from '@/components/auth/Button';
import { TextInput } from '@/components/auth/TextInput';
import { Spacing } from '@/constants/spacing';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

interface ForgotPasswordScreenProps {
  onBack: () => void;
  onContinue: (email: string) => void;
}

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  onBack,
  onContinue,
}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateForm = () => {
    if (!email) {
      setError('Email is required');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Invalid email format');
      return false;
    }
    setError('');
    return true;
  };

  const handleContinue = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      onContinue(email);
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Forgot password error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <View style={styles.container}>
        <View style={styles.content}>
          <AuthHeader
            title="Forgot Password"
            subtitle="Enter your registered email below to reset you password."
            containerStyle={styles.header}
          />

          <View style={styles.form}>
            <TextInput
              label="Your Email Address"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              editable={!loading}
              error={error || undefined}
            />

            <Button
              title="Continue"
              onPress={handleContinue}
              loading={loading}
              disabled={loading}
              containerStyle={styles.button}
            />
          </View>

          <View style={styles.helpText}>
            <AuthHeader
              title=""
              subtitle="We'll send you a OTP code for password reset."
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
  helpText: {
    marginTop: Spacing.xl,
  },
});

export default ForgotPasswordScreen;
