import { AppColors } from '@/constants/colors';
import { Spacing } from '@/constants/spacing';
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
    ViewStyle,
} from 'react-native';

interface AuthLayoutProps {
  children: React.ReactNode;
  scrollable?: boolean;
  containerStyle?: ViewStyle;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  scrollable = true,
  containerStyle,
}) => {
  const content = (
    <View style={[styles.container, containerStyle]}>
      {children}
    </View>
  );

  if (scrollable) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {content}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {content}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: AppColors.background.cream,
  },
  container: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
  },
  scrollContent: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.xxl,
  },
});
