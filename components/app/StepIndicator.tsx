import { AppColors } from '@/constants/colors';
import { BorderRadius, Spacing } from '@/constants/spacing';
import { FontSizes, FontWeights } from '@/constants/typography';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    View,
    ViewStyle
} from 'react-native';

export interface StepIndicatorProps {
  steps: {
    label: string;
    icon?: string;
    isActive?: boolean;
    isCompleted?: boolean;
  }[];
  containerStyle?: ViewStyle;
  onStepPress?: (index: number) => void;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  containerStyle,
  onStepPress,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {steps.map((step, index) => (
        <Pressable
          key={index}
          style={styles.stepWrapper}
          onPress={() => onStepPress?.(index)}
        >
          <View style={styles.stepContent}>
            {/* Circle with number or icon */}
            <View
              style={[
                styles.circle,
                step.isCompleted && styles.circleCompleted,
                step.isActive && styles.circleActive,
              ]}
            >
              {step.isCompleted ? (
                <MaterialCommunityIcons
                  name="check"
                  size={16}
                  color={AppColors.background.white}
                />
              ) : (
                <Text
                  style={[
                    styles.stepNumber,
                    step.isActive && styles.stepNumberActive,
                  ]}
                >
                  {index + 1}
                </Text>
              )}
            </View>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <View
                style={[
                  styles.line,
                  step.isCompleted && styles.lineCompleted,
                  step.isActive && styles.lineActive,
                ]}
              />
            )}
          </View>

          {/* Label */}
          <Text
            style={[
              styles.label,
              step.isActive && styles.labelActive,
              step.isCompleted && styles.labelCompleted,
            ]}
          >
            {step.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.md,
    // backgroundColor: AppColors.background.white,
    borderRadius: BorderRadius.lg,
  },
  stepWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    width: '100%',
    marginLeft: 70,
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: AppColors.background.light,
    borderWidth: 1,
    borderColor: AppColors.border.light,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  circleActive: {
    backgroundColor: AppColors.primary,
    borderColor: AppColors.primary,
  },
  circleCompleted: {
    backgroundColor: AppColors.primary,
    borderColor: AppColors.primary,
  },
  stepNumber: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.bold,
    color: AppColors.text.medium,
  },
  stepNumberActive: {
    color: AppColors.background.white,
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: AppColors.border.light,
    marginHorizontal: Spacing.xs,
  },
  lineActive: {
    backgroundColor: AppColors.primary,
  },
  lineCompleted: {
    backgroundColor: AppColors.primary,
  },
  label: {
    fontSize: FontSizes.xs,
    color: AppColors.text.light,
    // textAlign: 'center',
    marginTop: Spacing.xs,
  },
  labelActive: {
    color: AppColors.text.dark,
    fontWeight: FontWeights.semibold,
  },
  labelCompleted: {
    color: AppColors.primary,
    fontWeight: FontWeights.semibold,
  },
});
