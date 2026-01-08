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

interface SignUpScreenProps {
  onSignIn: () => void;
}

export const SignUpScreen: React.FC<SignUpScreenProps> = ({ onSignIn }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format';
    }

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

  const handleSignUp = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('Sign Up', { name, email, password });
      // Navigate to verification screen or home
    } catch (error) {
      console.error('Sign up error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <View style={styles.container}>
        <AuthHeader
          title="Create an Account"
          subtitle="Get closer to satisfying your cravings."
          containerStyle={styles.header}
        />

        <View style={styles.form}>
          <TextInput
            label="Your Name"
            placeholder="Enter your full name"
            value={name}
            onChangeText={setName}
            editable={!loading}
            error={errors.name}
          />

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

          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            editable={!loading}
            error={errors.confirmPassword}
          />

          <Button
            title="Create Account"
            onPress={handleSignUp}
            loading={loading}
            disabled={loading}
            containerStyle={styles.button}
          />
        </View>

        <Divider text="or continue with" containerStyle={styles.divider} />

        <View style={styles.socialButtonsContainer}>
          <SocialButton
            icon={require('@/assets/images/icon.png')}
            onPress={() => console.log('Google sign up')}
          />
          <SocialButton
            icon={require('@/assets/images/icon.png')}
            onPress={() => console.log('Apple sign up')}
          />
        </View>

        <View style={styles.signInLink}>
          <AuthLink
            text="Already have an account?"
            linkText="Sign In"
            onPress={onSignIn}
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
  signInLink: {
    marginVertical: Spacing.lg,
  },
});

export default SignUpScreen;
