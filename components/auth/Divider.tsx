import { AppColors } from '@/constants/colors';
import { Spacing } from '@/constants/spacing';
import { FontSizes, FontWeights } from '@/constants/typography';
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ViewStyle,
} from 'react-native';

interface DividerProps {
  text?: string;
  containerStyle?: ViewStyle;
}

export const Divider: React.FC<DividerProps> = ({
  text,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.line} />
      {text && <Text style={styles.text}>{text}</Text>}
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.xl,
    gap: Spacing.md,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: AppColors.border.light,
  },
  text: {
    fontSize: FontSizes.sm,
    color: AppColors.text.medium,
    fontWeight: FontWeights.medium,
  },
});
