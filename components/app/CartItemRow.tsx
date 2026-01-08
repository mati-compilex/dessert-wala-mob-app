import { AppColors } from '@/constants/colors';
import { BorderRadius, Spacing } from '@/constants/spacing';
import { FontSizes, FontWeights } from '@/constants/typography';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    View
} from 'react-native';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartItemRowProps {
  item: CartItem;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onRemove: (id: string) => void;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({
  item,
  onIncrement,
  onDecrement,
  onRemove,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.imagePlaceholder} />
      </View>

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      </View>

      <View style={styles.actions}>
        <Pressable
          onPress={() => onRemove(item.id)}
          style={({ pressed }) => [
            styles.actionButton,
            styles.deleteButton,
            pressed && styles.pressed,
          ]}
        >
          <MaterialCommunityIcons
            name="trash-can-outline"
            size={18}
            color={AppColors.text.error}
          />
        </Pressable>

        <View style={styles.quantityControl}>
          <Pressable
            onPress={() => onDecrement(item.id)}
            style={({ pressed }) => [
              styles.quantityButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.quantityButtonText}>−</Text>
          </Pressable>

          <Text style={styles.quantity}>{item.quantity}</Text>

          <Pressable
            onPress={() => onIncrement(item.id)}
            style={({ pressed }) => [
              styles.quantityButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </Pressable>
        </View>

        <Text style={styles.total}>
          ${(item.price * item.quantity).toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    backgroundColor: AppColors.background.white,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: AppColors.border.light,
    marginBottom: Spacing.md,
    gap: Spacing.md,
  },
  imageContainer: {
    width: 70,
    height: 70,
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E8E0D5',
    borderRadius: BorderRadius.md,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.semibold,
    color: AppColors.text.dark,
    marginBottom: Spacing.xs,
  },
  price: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
    color: AppColors.primary,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  actionButton: {
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: AppColors.border.light,
  },
  deleteButton: {
    borderColor: AppColors.text.error,
  },
  pressed: {
    opacity: 0.6,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: AppColors.border.light,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
  },
  quantityButton: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  quantityButtonText: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
    color: AppColors.primary,
  },
  quantity: {
    paddingHorizontal: Spacing.md,
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.semibold,
    color: AppColors.text.dark,
  },
  total: {
    minWidth: 60,
    textAlign: 'right',
    fontSize: FontSizes.md,
    fontWeight: FontWeights.bold,
    color: AppColors.primary,
  },
});
