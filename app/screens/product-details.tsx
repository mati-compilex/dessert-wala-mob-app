import { Button } from '@/components/auth/Button';
import { TextInput } from '@/components/auth/TextInput';
import { AppColors } from '@/constants/colors';
import { BorderRadius, Spacing } from '@/constants/spacing';
import { FontSizes, FontWeights } from '@/constants/typography';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';


interface ProductDetailsScreenProps {
  productId?: string;
  onBack?: () => void;
  onViewCart?: () => void;
}

export const ProductDetailsScreen: React.FC<ProductDetailsScreenProps> = ({
  productId,
  onBack,
  onViewCart,
}) => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const pid = (productId ?? (params.productId as string) ?? '') as string;
  const handleBack = onBack ?? (() => router.back());
  const handleViewCart = onViewCart ?? (() => router.push('/(tabs)/cart'));
  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');

  const price = 4.0;
  const extrasPrice = selectedExtras.length * 1.5;
  const totalPrice = (price + extrasPrice) * quantity;

  const extras = [
    { id: '1', label: 'Add whipped cream', price: 1.5 },
    { id: '2', label: 'Add chocolate syrup', price: 2.5 },
  ];

  const handleToggleExtra = (extraId: string) => {
    setSelectedExtras((prev) =>
      prev.includes(extraId)
        ? prev.filter((id) => id !== extraId)
        : [...prev, extraId]
    );
  };

  const incrementQuantity = () => setQuantity((q) => q + 1);
  const decrementQuantity = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header with Back and Wishlist */}
        <View style={styles.headerButtons}>
          <Pressable
            onPress={handleBack}
            style={({ pressed }) => [
              styles.headerButton,
              pressed && styles.pressed,
            ]}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              color={AppColors.text.dark}
            />
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.headerButton,
              pressed && styles.pressed,
            ]}
          >
            <MaterialCommunityIcons
              name="heart-outline"
              size={24}
              color={AppColors.primary}
            />
          </Pressable>
        </View>

        {/* Product Image */}
        <View style={styles.imageContainer}>
          <View style={styles.imagePlaceholder} />
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>Flaky Butter Croissant</Text>
            <Text style={styles.price}>${price.toFixed(2)}</Text>
          </View>
          <Text style={styles.description}>
            Freshly baked cupcakes, served with sprinkled seasoning
          </Text>
        </View>

        {/* Extras Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Choose Extras</Text>
            <Text style={styles.optional}>Optional</Text>
          </View>

          {extras.map((extra) => (
            <Pressable
              key={extra.id}
              style={[
                styles.extraItem,
                selectedExtras.includes(extra.id) && styles.extraItemSelected,
              ]}
              onPress={() => handleToggleExtra(extra.id)}
            >
              <View style={styles.checkbox}>
                {selectedExtras.includes(extra.id) && (
                  <MaterialCommunityIcons
                    name="check"
                    size={16}
                    color={AppColors.background.white}
                  />
                )}
              </View>
              <Text style={styles.extraLabel}>{extra.label}</Text>
              <Text style={styles.extraPrice}>+${extra.price.toFixed(2)}</Text>
            </Pressable>
          ))}
        </View>

        {/* Special Instructions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Special Instructions</Text>
          <TextInput
            placeholder="Add extra tissues..."
            value={specialInstructions}
            onChangeText={setSpecialInstructions}
            multiline
            numberOfLines={4}
            containerStyle={styles.instructionsInput}
          />
          <Text style={styles.charCount}>
            {specialInstructions.length}/100
          </Text>
        </View>

        {/* Total Price */}
        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>Total Price</Text>
          <Text style={styles.totalPrice}>${totalPrice.toFixed(2)}</Text>
        </View>

        {/* Quantity Control */}
        <View style={styles.quantitySection}>
          <Pressable
            onPress={decrementQuantity}
            style={({ pressed }) => [
              styles.quantityButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.quantityButtonText}>−</Text>
          </Pressable>
          <Text style={styles.quantity}>{quantity}</Text>
          <Pressable
            onPress={incrementQuantity}
            style={({ pressed }) => [
              styles.quantityButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </Pressable>
        </View>

        {/* View Cart Button */}
        <Button
          title="View your Cart"
          onPress={handleViewCart}
          containerStyle={styles.viewCartButton}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: AppColors.background.cream,
  },
  scrollContent: {
    paddingBottom: Spacing.xl,
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: AppColors.background.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: AppColors.border.light,
  },
  pressed: {
    opacity: 0.7,
  },
  imageContainer: {
    height: 300,
    marginHorizontal: Spacing.xl,
    marginBottom: Spacing.xl,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E8E0D5',
  },
  productInfo: {
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  name: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
    color: AppColors.text.dark,
    flex: 1,
  },
  price: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
    color: AppColors.primary,
  },
  description: {
    fontSize: FontSizes.sm,
    color: AppColors.text.medium,
    lineHeight: 20,
  },
  section: {
    marginHorizontal: Spacing.xl,
    marginBottom: Spacing.xl,
    backgroundColor: AppColors.background.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: AppColors.border.light,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.semibold,
    color: AppColors.text.dark,
  },
  optional: {
    fontSize: FontSizes.xs,
    color: AppColors.primary,
    fontWeight: FontWeights.medium,
  },
  extraItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.border.light,
  },
  extraItemSelected: {
    backgroundColor: AppColors.background.cream,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: AppColors.border.medium,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  extraLabel: {
    flex: 1,
    fontSize: FontSizes.sm,
    color: AppColors.text.dark,
    fontWeight: FontWeights.medium,
  },
  extraPrice: {
    fontSize: FontSizes.sm,
    color: AppColors.primary,
    fontWeight: FontWeights.semibold,
  },
  instructionsInput: {
    marginBottom: Spacing.sm,
  },
  charCount: {
    textAlign: 'right',
    fontSize: FontSizes.xs,
    color: AppColors.text.light,
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  totalLabel: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.medium,
    color: AppColors.text.dark,
  },
  totalPrice: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
    color: AppColors.primary,
  },
  quantitySection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: AppColors.background.white,
    borderWidth: 1,
    borderColor: AppColors.border.light,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonText: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.bold,
    color: AppColors.primary,
  },
  quantity: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.semibold,
    color: AppColors.text.dark,
    minWidth: 30,
    textAlign: 'center',
  },
  viewCartButton: {
    marginHorizontal: Spacing.xl,
  },
});

export default ProductDetailsScreen;
