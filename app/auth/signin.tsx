import { AuthHeader } from '@/components/auth/AuthHeader';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthLink } from '@/components/auth/AuthLink';
import { Button } from '@/components/auth/Button';
import { Divider } from '@/components/auth/Divider';
import { PasswordInput } from '@/components/auth/PasswordInput';
import { SocialButton } from '@/components/auth/SocialButton';
import { TextInput } from '@/components/auth/TextInput';
import { Spacing } from '@/constants/spacing';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

interface SignInScreenProps {
  onSignUp: () => void;
  onForgotPassword: () => void;
  onExploreAsGuest: () => void;
}

export const SignInScreen: React.FC<SignInScreenProps> = ({
  onSignUp,
  onForgotPassword,
  onExploreAsGuest,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('Sign In', { email, password, rememberMe });
      // Navigate to home screen
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <View style={styles.container}>
        <AuthHeader
          title="Welcome Back!"
          subtitle="Let's get your cravings delivered."
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
            error={errors.email}
          />

          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            editable={!loading}
            error={errors.password}
          />

          <View style={styles.rememberMeContainer}>
            <View style={styles.checkboxWrapper}>
              <View
                style={[
                  styles.checkbox,
                  rememberMe && styles.checkboxChecked,
                ]}
              >
                {rememberMe && <View style={styles.checkmark} />}
              </View>
            </View>
            <View style={styles.textWrapper}>
              <AuthLink
                text="Remember Me"
                linkText=""
                onPress={() => setRememberMe(!rememberMe)}
                containerStyle={styles.link}
              />
            </View>
            <View style={styles.forgotPasswordWrapper}>
              <AuthLink
                text=""
                linkText="Forgot Password?"
                onPress={onForgotPassword}
              />
            </View>
          </View>

          <Button
            title="Sign In"
            onPress={handleSignIn}
            loading={loading}
            disabled={loading}
            containerStyle={styles.button}
          />
        </View>

        <Divider text="or continue with" containerStyle={styles.divider} />

        <View style={styles.socialButtonsContainer}>
          <SocialButton
            icon={require('@/assets/images/icon.png')}
            onPress={() => console.log('Google sign in')}
          />
          <SocialButton
            icon={require('@/assets/images/icon.png')}
            onPress={() => console.log('Apple sign in')}
          />
        </View>

        <View style={styles.signUpLink}>
          <AuthLink
            text="Don't have an account?"
            linkText="Create One"
            onPress={onSignUp}
          />
        </View>
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
  header: {
    marginTop: Spacing.xl,
  },
  form: {
    gap: Spacing.md,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: Spacing.md,
  },
  checkboxWrapper: {
    flex: 0,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#D0CDC8',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#B8651B',
  },
  checkmark: {
    width: 12,
    height: 12,
    backgroundColor: '#B8651B',
    borderRadius: 2,
  },
  textWrapper: {
    flex: 1,
  },
  link: {
    marginVertical: 0,
  },
  forgotPasswordWrapper: {
    flex: 1,
    alignItems: 'flex-end',
  },
  button: {
    marginTop: Spacing.xl,
  },
  divider: {
    marginVertical: Spacing.lg,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.lg,
  },
  signUpLink: {
    marginVertical: Spacing.lg,
  },
});

export default SignInScreen;
