import { CartItem, CartItemRow } from '@/components/app/CartItemRow';
import { PriceSummary } from '@/components/app/PriceSummary';
import { StepIndicator } from '@/components/app/StepIndicator';
import { Button } from '@/components/auth/Button';
import { AppColors } from '@/constants/colors';
import { BorderRadius, Spacing } from '@/constants/spacing';
import { FontSizes, FontWeights } from '@/constants/typography';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Pressable,
  TextInput as RNTextInput,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';


interface CartScreenProps {
  onBack: () => void;
  onCheckout: () => void;
}

export const CartScreen: React.FC<CartScreenProps> = ({
  onBack,
  onCheckout,
}) => {
  const router = useRouter();
  const handleBack = () => router.back();
  const handleCheckout = () => router.push('/checkout' as any);

  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Flaky Butter Croissant',
      price: 5.5,
      quantity: 1,
      image: require('../../assets/images/Croissants.png')
    },
    {
      id: '2',
      name: 'Red Velvet Cupcake',
      price: 4.0,
      quantity: 2,
      image: require('../../assets/images/cake.png')
    },
  ]);

  const [promoCode, setPromoCode] = useState('');

  const handleIncrement = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemove = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = 0;
  const deliveryFee = 4.0;

  const stepIndicatorSteps = [
    { label: 'Menu', isCompleted: true },
    { label: 'Cart', isActive: true },
    { label: 'Checkout' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {/* Header with Back Button */}
        <View style={styles.header}>
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
              color={AppColors.primary}
            />
          </Pressable>
          {/* <Pressable
            onPress={handleBack}
            style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              color={AppColors.primary}
            />
          </Pressable> */}
          <Text style={styles.title}>My Cart</Text>
          <View style={styles.backButton} />
        </View>

        {/* Step Indicator */}
        <StepIndicator
          steps={stepIndicatorSteps}
          containerStyle={styles.stepIndicator}
        />

        {/* Items in Cart */}
        <View style={styles.itemsSection}>
          <View style={styles.itemsHeader}>
            <Text style={styles.sectionTitle}>Items in your Cart</Text>
            <Pressable>
              <Text style={styles.addItemsLink}>+ Add Items</Text>
            </Pressable>
          </View>

          {cartItems.map((item) => (
            <CartItemRow
              key={item.id}
              item={item}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              onRemove={handleRemove}
            />
          ))}
        </View>

        {/* Promo Code */}
        <View style={styles.promoSection}>
          <Text style={styles.promoLabel}>Apply Promo Code</Text>
          <View style={styles.promoInputWrapper}>
            <MaterialCommunityIcons
              name="tag-outline"
              size={20}
              color={AppColors.text.light}
              style={styles.promoIcon}
            />
            <RNTextInput
              placeholder="Type here..."
              value={promoCode}
              onChangeText={setPromoCode}
              style={styles.promoInput}
              underlineColorAndroid="transparent"
            />
            <Pressable style={styles.applyButton}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </Pressable>
          </View>
        </View>

        {/* Price Summary */}
        <PriceSummary
          data={{
            subtotal,
            discount,
            deliveryFee,
          }}
          containerStyle={styles.priceSummary}
        />
        <View style={styles.totalSectionContainer}>
          {/* Total Price */}
          <View style={styles.totalSection}>
            <Text style={styles.totalLabel}>Total (incl. fees and tax)</Text>
            <Text style={styles.totalPrice}>$17.50</Text>
          </View>


          <Button
            title="Proceed to Checkout"
            onPress={handleCheckout}
          />
        </View>
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
    // paddingBottom: Spacing.xl,
  },

  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: AppColors.background.accent,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: AppColors.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  title: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
    color: AppColors.text.dark,
  },
  stepIndicator: {
    marginHorizontal: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  itemsSection: {
    marginHorizontal: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  itemsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.semibold,
    color: AppColors.text.dark,
  },
  addItemsLink: {
    fontSize: FontSizes.sm,
    color: AppColors.primary,
    fontWeight: FontWeights.semibold,
  },
  promoSection: {
    marginHorizontal: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  promoLabel: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
    color: AppColors.text.dark,
    marginBottom: Spacing.md,
  },
  promoInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.background.white,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: AppColors.border.light,
  },
  promoIcon: {
    marginRight: Spacing.sm,
  },
  promoInput: {
    flex: 1,
    marginVertical: 0,
    borderWidth: 0,
    outlineWidth: 0,
  },
  applyButton: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  applyButtonText: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.semibold,
    color: AppColors.primary,
  },
  priceSummary: {
    marginHorizontal: Spacing.xl,
    marginBottom: Spacing.xl,
  },

  totalSectionContainer: {
    backgroundColor: AppColors.background.white,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    paddingVertical: Spacing.lg,
    marginTop: Spacing.md,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 17,
    elevation: 10,
    paddingHorizontal: Spacing.xl,
  },

  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    marginLeft: Spacing.md,
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
  }
});

export default CartScreen;
