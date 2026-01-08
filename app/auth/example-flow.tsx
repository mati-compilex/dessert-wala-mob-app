/**
 * Authentication Flow Example
 * 
 * This file demonstrates how to use the authentication screens and components
 * together to create a complete auth flow.
 */

import {
    ForgotPasswordScreen,
    OTPVerificationScreen,
    SetNewPasswordScreen,
    SignInScreen,
    SignUpScreen,
    WelcomeScreen,
} from '@/components/auth';
import { AppColors } from '@/constants/colors';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';

type AuthScreenType =
  | 'welcome'
  | 'signin'
  | 'signup'
  | 'forgot-password'
  | 'otp-verification'
  | 'otp-verification-password'
  | 'set-new-password';

interface AuthFlowState {
  currentScreen: AuthScreenType;
  email?: string;
  verificationFor?: 'email' | 'password-reset';
}

export const AuthFlowExample = () => {
  const [state, setState] = useState<AuthFlowState>({
    currentScreen: 'welcome',
  });

  const handleNavigateTo = (screen: AuthScreenType, data?: { email?: string }) => {
    setState({
      ...state,
      currentScreen: screen,
      ...(data && { email: data.email }),
    });
  };

  const handleSignInSuccess = () => {
    console.log('Sign in successful');
    // Navigate to home screen
  };

  const handleSignUpSuccess = () => {
    console.log('Sign up successful');
    // Navigate to home screen or email verification
  };

  const handleForgotPasswordContinue = (email: string) => {
    handleNavigateTo('otp-verification-password', { email });
  };

  const handleOTPVerify = (otp: string) => {
    if (state.verificationFor === 'password-reset') {
      handleNavigateTo('set-new-password');
    } else {
      handleSignInSuccess();
    }
  };

  const handleSetNewPassword = (password: string) => {
    console.log('Password reset successful');
    handleNavigateTo('welcome');
  };

  const renderScreen = () => {
    switch (state.currentScreen) {
      case 'welcome':
        return (
          <WelcomeScreen
            onSignIn={() => handleNavigateTo('signin')}
            onSignUp={() => handleNavigateTo('signup')}
            onExploreAsGuest={() => {
              console.log('Explore as guest');
              // Navigate to home with guest mode
            }}
          />
        );

      case 'signin':
        return (
          <SignInScreen
            onSignUp={() => handleNavigateTo('signup')}
            onForgotPassword={() => handleNavigateTo('forgot-password')}
            onExploreAsGuest={() => {
              console.log('Explore as guest');
            }}
          />
        );

      case 'signup':
        return (
          <SignUpScreen
            onSignIn={() => handleNavigateTo('signin')}
          />
        );

      case 'forgot-password':
        return (
          <ForgotPasswordScreen
            onBack={() => handleNavigateTo('signin')}
            onContinue={(email) => {
              setState((prev) => ({
                ...prev,
                email,
                verificationFor: 'password-reset',
              }));
              handleNavigateTo('otp-verification-password', { email });
            }}
          />
        );

      case 'otp-verification-password':
        return (
          <OTPVerificationScreen
            email={state.email || ''}
            screenType="password-reset"
            onVerify={handleOTPVerify}
            onResend={() => {
              console.log('Resend OTP');
            }}
            onBack={() => handleNavigateTo('forgot-password')}
          />
        );

      case 'set-new-password':
        return (
          <SetNewPasswordScreen
            onBack={() => handleNavigateTo('welcome')}
            onConfirm={handleSetNewPassword}
          />
        );

      default:
        return <WelcomeScreen
          onSignIn={() => handleNavigateTo('signin')}
          onSignUp={() => handleNavigateTo('signup')}
          onExploreAsGuest={() => console.log('Guest')}
        />;
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: AppColors.background.cream,
      }}
    >
      {renderScreen()}
    </SafeAreaView>
  );
};

export default AuthFlowExample;
