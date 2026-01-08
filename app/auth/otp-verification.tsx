import { AuthHeader } from '@/components/auth/AuthHeader';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthLink } from '@/components/auth/AuthLink';
import { Button } from '@/components/auth/Button';
import { OTPInput } from '@/components/auth/OTPInput';
import { AppColors } from '@/constants/colors';
import { Spacing } from '@/constants/spacing';
import { FontSizes } from '@/constants/typography';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface OTPVerificationScreenProps {
  email: string;
  onVerify: (otp: string) => void;
  onResend: () => void;
  onBack: () => void;
  screenType?: 'email-verification' | 'password-reset';
}

export const OTPVerificationScreen: React.FC<OTPVerificationScreenProps> = ({
  email,
  onVerify,
  onResend,
  onBack,
  screenType = 'email-verification',
}) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setLoading(true);
    setError('');
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      onVerify(otp);
    } catch (err) {
      setError('Invalid OTP. Please try again.');
      console.error('OTP verification error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setCanResend(false);
    setTimeRemaining(300);
    setOtp('');
    setError('');
    try {
      await onResend();
    } catch (err) {
      console.error('Resend OTP error:', err);
    }
  };

  const getTitle = () => {
    return screenType === 'password-reset' ? 'Enter OTP' : 'Enter OTP';
  };

  const getSubtitle = () => {
    return `A 6-digit OTP code has sent to your email: ${email}`;
  };

  return (
    <AuthLayout>
      <View style={styles.container}>
        <View style={styles.content}>
          <AuthHeader
            title={getTitle()}
            subtitle={getSubtitle()}
            containerStyle={styles.header}
          />

          <View style={styles.form}>
            <OTPInput
              value={otp}
              onChangeText={setOtp}
              length={6}
              error={error || undefined}
              disabled={loading}
            />

            <View style={styles.resendContainer}>
              <Text style={styles.resendText}>{`Didn't receive the code?`}</Text>
              <AuthLink
                text=""
                linkText="Resend OTP"
                onPress={handleResend}
                containerStyle={styles.resendLink}
              />
              <Text style={styles.timerText}>
                Time Remaining: {formatTime(timeRemaining)}
              </Text>
            </View>

            <Button
              title={screenType === 'password-reset' ? 'Verify Email' : 'Verify Email'}
              onPress={handleVerify}
              loading={loading}
              disabled={loading || otp.length !== 6}
              containerStyle={styles.button}
            />
          </View>
        </View>

        <AuthLink
          text=""
          linkText={screenType === 'password-reset' ? 'G Back' : 'Change Email'}
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
    gap: Spacing.lg,
  },
  resendContainer: {
    alignItems: 'center',
  },
  resendText: {
    fontSize: FontSizes.sm,
    color: AppColors.text.medium,
    marginBottom: Spacing.sm,
  },
  resendLink: {
    marginVertical: 0,
    marginBottom: Spacing.md,
  },
  timerText: {
    fontSize: FontSizes.xs,
    color: AppColors.text.medium,
  },
  button: {
    marginTop: Spacing.md,
  },
});

export default OTPVerificationScreen;
