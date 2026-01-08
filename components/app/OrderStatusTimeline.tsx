import { AppColors } from '@/constants/colors';
import { BorderRadius, Spacing } from '@/constants/spacing';
import { FontSizes, FontWeights } from '@/constants/typography';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ViewStyle
} from 'react-native';

type OrderStatus = 'pending' | 'preparing' | 'ready' | 'out-for-delivery' | 'delivered' | 'cancelled';

interface OrderStatusItem {
  status: OrderStatus;
  label: string;
  timestamp?: string;
  completed: boolean;
}

interface OrderStatusTimelineProps {
  steps: OrderStatusItem[];
  containerStyle?: ViewStyle;
}

const statusLabels: Record<OrderStatus, string> = {
  pending: 'Order Received',
  preparing: 'Preparing',
  ready: 'Ready for Pickup',
  'out-for-delivery': 'Out for Delivery',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

const statusIcons: Record<OrderStatus, string> = {
  pending: 'receipt',
  preparing: 'chef-hat',
  ready: 'package-variant-closed',
  'out-for-delivery': 'truck-fast',
  delivered: 'check-circle',
  cancelled: 'close-circle',
};

export const OrderStatusTimeline: React.FC<OrderStatusTimelineProps> = ({
  steps,
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.title}>Order Status</Text>

      {steps.map((step, index) => (
        <View key={index} style={styles.stepContainer}>
          <View style={styles.stepContent}>
            <View
              style={[
                styles.stepCircle,
                step.completed ? styles.stepCircleCompleted : styles.stepCirclePending,
              ]}
            >
              {step.completed ? (
                <MaterialCommunityIcons
                  name={statusIcons[step.status]}
                  size={18}
                  color={AppColors.background.white}
                />
              ) : (
                <View style={styles.stepDot} />
              )}
            </View>

            {index < steps.length - 1 && (
              <View
                style={[
                  styles.connector,
                  step.completed && styles.connectorCompleted,
                ]}
              />
            )}
          </View>

          <View style={styles.stepInfo}>
            <Text
              style={[
                styles.stepLabel,
                step.completed && styles.stepLabelCompleted,
              ]}
            >
              {step.label}
            </Text>
            {step.timestamp && (
              <Text style={styles.stepTime}>{step.timestamp}</Text>
            )}
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.background.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginVertical: Spacing.lg,
    borderWidth: 1,
    borderColor: AppColors.border.light,
  },
  title: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.semibold,
    color: AppColors.text.dark,
    marginBottom: Spacing.lg,
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: Spacing.xl,
  },
  stepContent: {
    alignItems: 'center',
    marginRight: Spacing.lg,
    width: 50,
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  stepCircleCompleted: {
    backgroundColor: AppColors.primary,
    borderColor: AppColors.primary,
  },
  stepCirclePending: {
    borderColor: AppColors.border.light,
    backgroundColor: AppColors.background.white,
  },
  stepDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: AppColors.border.medium,
  },
  connector: {
    width: 2,
    flex: 1,
    backgroundColor: AppColors.border.light,
    marginTop: Spacing.sm,
  },
  connectorCompleted: {
    backgroundColor: AppColors.primary,
  },
  stepInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  stepLabel: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
    color: AppColors.text.medium,
    marginBottom: Spacing.xs,
  },
  stepLabelCompleted: {
    color: AppColors.text.dark,
    fontWeight: FontWeights.semibold,
  },
  stepTime: {
    fontSize: FontSizes.xs,
    color: AppColors.text.light,
  },
});
