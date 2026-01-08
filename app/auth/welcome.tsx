import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthLink } from '@/components/auth/AuthLink';
import { Button } from '@/components/auth/Button';
import { AppColors } from '@/constants/colors';
import { Spacing } from '@/constants/spacing';
import { FontSizes, FontWeights } from '@/constants/typography';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface WelcomeScreenProps {
  onSignIn: () => void;
  onSignUp: () => void;
  onExploreAsGuest: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onSignIn,
  onSignUp,
  onExploreAsGuest,
}) => {
  return (
    <AuthLayout scrollable={false}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>DESSERT WALA</Text>
        </View>

        <View style={styles.buttonsContainer}>
          <Button
            title="Sign In"
            onPress={onSignIn}
            containerStyle={styles.button}
          />

          <Button
            title="Create Account"
            onPress={onSignUp}
            variant="secondary"
            containerStyle={styles.button}
          />

          <AuthLink
            text=""
            linkText="Explore as a Guest"
            onPress={onExploreAsGuest}
            containerStyle={styles.guestLink}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By continuing, you agree to our{' '}
            <Text style={styles.link}>Terms of Service</Text> and{' '}
            <Text style={styles.link}>Privacy Policy.</Text>
          </Text>
        </View>
      </View>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: Spacing.xxl,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: FontSizes.huge,
    fontWeight: FontWeights.bold,
    color: AppColors.text.dark,
    letterSpacing: 2,
  },
  buttonsContainer: {
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  button: {
    marginBottom: Spacing.sm,
  },
  guestLink: {
    marginVertical: Spacing.md,
  },
  footer: {
    paddingHorizontal: Spacing.md,
  },
  footerText: {
    fontSize: FontSizes.xs,
    color: AppColors.text.medium,
    textAlign: 'center',
    lineHeight: 18,
  },
  link: {
    color: AppColors.primary,
    fontWeight: FontWeights.semibold,
  },
});

export default WelcomeScreen;
