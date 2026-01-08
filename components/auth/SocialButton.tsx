import { AppColors } from '@/constants/colors';
import { BorderRadius } from '@/constants/spacing';
import React from 'react';
import {
    Image,
    ImageSourcePropType,
    Pressable,
    StyleSheet,
    ViewStyle
} from 'react-native';

interface SocialButtonProps {
  icon: ImageSourcePropType;
  onPress: () => void;
  containerStyle?: ViewStyle;
  disabled?: boolean;
}

export const SocialButton: React.FC<SocialButtonProps> = ({
  icon,
  onPress,
  containerStyle,
  disabled = false,
}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
        containerStyle,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Image source={icon} style={styles.icon} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.round,
    backgroundColor: AppColors.background.white,
    borderWidth: 1,
    borderColor: AppColors.border.light,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    backgroundColor: AppColors.background.cream,
  },
});
