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

export interface PriceSummaryData {
  subtotal: number;
  discount?: number;
  deliveryFee?: number;
  tax?: number;
}

interface PriceSummaryProps {
  data: PriceSummaryData;
  containerStyle?: ViewStyle;
}

export const PriceSummary: React.FC<PriceSummaryProps> = ({
  data,
  containerStyle,
}) => {
  const total =
    data.subtotal -
    (data.discount || 0) +
    (data.deliveryFee || 0) +
    (data.tax || 0);

  const rows: { label: string; value: number; isTotal?: boolean }[] = [
    { label: 'Subtotal', value: data.subtotal },
  ];

  if (data.discount && data.discount > 0) {
    rows.push({ label: 'Discount', value: -data.discount });
  }

  if (data.deliveryFee && data.deliveryFee > 0) {
    rows.push({ label: 'Delivery Fee', value: data.deliveryFee });
  }

  if (data.tax && data.tax > 0) {
    rows.push({ label: 'Tax', value: data.tax });
  }

  rows.push({ label: 'Total (incl. fees and tax)', value: total, isTotal: true });

  return (
    <View style={[styles.container, containerStyle]}>
      {rows.map((row, index) => (
        <View
          key={index}
          style={[
            styles.row,
            row.isTotal && styles.totalRow,
          ]}
        >
          <Text
            style={[
              styles.label,
              row.isTotal && styles.totalLabel,
            ]}
          >
            {row.label}
          </Text>
          <Text
            style={[
              styles.value,
              row.isTotal && styles.totalValue,
              row.value < 0 && styles.negativeValue,
            ]}
          >
            ${Math.abs(row.value).toFixed(2)}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.background.accent,
    borderRadius: 8,
    padding: Spacing.md,
    marginVertical: Spacing.md,
    borderWidth: 1,
    borderColor: AppColors.primary,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.xs,
  },
  totalRow: {
    borderBottomWidth: 0,
  },
  label: {
    fontSize: FontSizes.xs,
    color: AppColors.text.medium,
    fontWeight: FontWeights.semibold,
  },
  totalLabel: {
    fontSize: FontSizes.xs,
    fontWeight: FontWeights.medium,
    color: AppColors.text.dark,
  },
  value: {
    fontSize: FontSizes.xs,
    fontWeight: FontWeights.medium,
    color: AppColors.text.dark,
  },
  totalValue: {
    fontSize: FontSizes.xs,
    fontWeight: FontWeights.bold,
    color: AppColors.primary,
  },
  negativeValue: {
    color: AppColors.status.success,
  },
});
