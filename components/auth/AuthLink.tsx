import { AppColors } from '@/constants/colors';
import { Spacing } from '@/constants/spacing';
import { FontSizes, FontWeights } from '@/constants/typography';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    View,
    ViewStyle,
} from 'react-native';

interface AuthLinkProps {
  text: string;
  linkText: string;
  onPress: () => void;
  containerStyle?: ViewStyle;
  variant?: 'default' | 'back';
}

export const AuthLink: React.FC<AuthLinkProps> = ({
  text,
  linkText,
  onPress,
  containerStyle,
  variant = 'default',
}) => {
  if (variant === 'back') {
    return (
      <Pressable
        style={({ pressed }) => [
          styles.backButton,
          pressed && styles.backButtonPressed,
          containerStyle,
        ]}
        onPress={onPress}
      >
        <MaterialCommunityIcons
          name="arrow-left"
          size={20}
          color={AppColors.text.medium}
        />
        <Text style={styles.backText}>{linkText}</Text>
      </Pressable>
    );
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.text}>{text}</Text>
      <Pressable onPress={onPress}>
        <Text style={styles.link}>{linkText}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: Spacing.lg,
  },
  text: {
    fontSize: FontSizes.sm,
    color: AppColors.text.medium,
  },
  link: {
    fontSize: FontSizes.sm,
    color: AppColors.primary,
    fontWeight: FontWeights.semibold,
    marginLeft: Spacing.sm,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginVertical: Spacing.lg,
  },
  backButtonPressed: {
    opacity: 0.7,
  },
  backText: {
    fontSize: FontSizes.md,
    color: AppColors.text.medium,
    fontWeight: FontWeights.medium,
  },
});
