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


interface CheckoutScreenProps {
  onBack: () => void;
  onPlaceOrder: () => void;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({
  onBack,
  onPlaceOrder,
}) => {
  const router = useRouter();
  const handleBack = () => router.back();
  const handlePlaceOrder = () => router.push('/order-success' as any);
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [selectedPayment, setSelectedPayment] = useState<'card' | 'googlepay'>('card');
  const [address, setAddress] = useState('15A High Street, Hemei Hampstead');
  const [notes, setNotes] = useState('');

  const stepIndicatorSteps = [
    { label: 'Menu', isCompleted: true },
    { label: 'Cart', isCompleted: true },
    { label: 'Checkout', isActive: true },
  ];

  const subtotal = 13.5;
  const deliveryFee = 4.0;

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
              color={AppColors.text.dark}
            />
          </Pressable>
          {/* <Pressable
            onPress={onBack}
            style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              color={AppColors.text.dark}
            />
          </Pressable> */}
          <Text style={styles.title}>Checkout</Text>
          <View style={styles.backButton} />
        </View>

        {/* Step Indicator */}
        <StepIndicator
          steps={stepIndicatorSteps}
          containerStyle={styles.stepIndicator}
        />

        {/* Delivery Type Toggle */}
        <View style={styles.deliveryToggle}>
          <Pressable
            style={[
              styles.deliveryTypeButton,
              deliveryType === 'delivery' && styles.deliveryTypeButtonActive,
            ]}
            onPress={() => setDeliveryType('delivery')}
          >
            <MaterialCommunityIcons
              name="truck-fast"
              size={20}
              color={
                deliveryType === 'delivery'
                  ? AppColors.primary
                  : AppColors.text.medium
              }
            />
            <Text
              style={[
                styles.deliveryTypeText,
                deliveryType === 'delivery' && styles.deliveryTypeTextActive,
              ]}
            >
              Delivery
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.deliveryTypeButton,
              deliveryType === 'pickup' && styles.deliveryTypeButtonActive,
            ]}
            onPress={() => setDeliveryType('pickup')}
          >
            <MaterialCommunityIcons
              name="hand-extended-outline"
              size={20}
              color={
                deliveryType === 'pickup'
                  ? AppColors.primary
                  : AppColors.text.medium
              }
            />
            <Text
              style={[
                styles.deliveryTypeText,
                deliveryType === 'pickup' && styles.deliveryTypeTextActive,
              ]}
            >
              Pick Up
            </Text>
          </Pressable>
        </View>

        {/* Delivery Address */}
        {deliveryType === 'delivery' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Delivery Address</Text>

            <View style={styles.addressSearchBox}>
              <MaterialCommunityIcons
                name="magnify"
                size={20}
                color={AppColors.text.light}
              />
              <RNTextInput
                placeholder="Search for address"
                value={address}
                onChangeText={setAddress}
                style={styles.addressInput}
                underlineColorAndroid="transparent"
              />
              <MaterialCommunityIcons
                name="crosshairs-gps"
                size={20}
                color={AppColors.primary}
              />
            </View>

            {/* Map Placeholder */}
            <View style={styles.mapContainer}>
              <View style={styles.mapPlaceholder} />
              <View style={styles.mapPinContainer}>
                <MaterialCommunityIcons
                  name="map-marker"
                  size={32}
                  color={AppColors.primary}
                />
              </View>
            </View>
          </View>
        )}

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.paymentSection}>
            <Pressable
              style={[
                styles.paymentOption,
                selectedPayment === 'card' && styles.paymentOptionSelected,
              ]}
              onPress={() => setSelectedPayment('card')}
            >
              <View style={styles.paymentRadio}>
                {selectedPayment === 'card' && (
                  <View style={styles.paymentRadioFilled} />
                )}
              </View>
              <View style={styles.paymentContent}>
                <Text style={styles.paymentLabel}>Credit/Debit Card</Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color={AppColors.text.light}
              />
            </Pressable>

            <Pressable
              style={[
                styles.paymentOption,
                selectedPayment === 'googlepay' && styles.paymentOptionSelected,
              ]}
              onPress={() => setSelectedPayment('googlepay')}
            >
              <View style={styles.paymentRadio}>
                {selectedPayment === 'googlepay' && (
                  <View style={styles.paymentRadioFilled} />
                )}
              </View>
              <View style={styles.paymentContent}>
                <Text style={styles.paymentLabel}>Google Pay</Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color={AppColors.text.light}
              />
            </Pressable>
          </View>
        </View>

        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order summary</Text>
          <View style={styles.paymentSection}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>2x Red Velvet Cupcake</Text>
              <Text style={styles.summaryValue}>$ 8.00</Text>
            </View>

            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>
                1x Flaky Butter Croissant (250 gm){'\n'}with Whipped Cream
              </Text>
              <Text style={styles.summaryValue}>$ 5.50</Text>
            </View>

            <View style={styles.summaryDivider} />

            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>$ {subtotal.toFixed(2)}</Text>
            </View>

            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Delivery Fee</Text>
              <Text style={styles.summaryValue}>$ {deliveryFee.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Special Notes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Any notes for the rider?</Text>
          <RNTextInput
            placeholder="Leave on the door..."
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={3}
            style={styles.notesInput}
            underlineColorAndroid="transparent"
          />
        </View>

        {/* Terms and Conditions */}
        <View style={styles.totalSectionContainer}>
          {/* Total Price */}
          <View style={styles.totalSection}>
            <Text style={styles.totalLabel}>Total (incl. fees and tax)</Text>
            <Text style={styles.totalPrice}>$17.50</Text>
          </View>

          <Button
            title="Place Order"
            onPress={handlePlaceOrder}
            containerStyle={styles.placeOrderButton}
          />
          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              By placing this order, I agreed with all the{' '}
              <Text style={styles.termsLink}>Terms and Conditions</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: AppColors.background.light,
  },
  scrollContent: {
    paddingBottom: Spacing.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
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
  deliveryToggle: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginHorizontal: Spacing.xl,
    marginBottom: Spacing.xl,
    backgroundColor: AppColors.background.accent,
    borderWidth: 1,
    borderRadius: BorderRadius.round,
    borderColor: AppColors.border.light,
    overflow: 'hidden',
    padding: Spacing.xs,
  },
  deliveryTypeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    // backgroundColor: AppColors.background.white,
    borderRadius: BorderRadius.round,
    // borderWidth: 1,
    borderColor: AppColors.border.light,
  },
  deliveryTypeButtonActive: {
    backgroundColor: AppColors.background.accentDark,
    borderColor: AppColors.primary,
    borderWidth: 1
  },
  deliveryTypeText: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.semibold,
    color: AppColors.text.medium,
  },
  deliveryTypeTextActive: {
    color: AppColors.primary,
  },
  section: {
    marginHorizontal: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.semibold,
    color: AppColors.text.mehndi,
    marginBottom: Spacing.md,
  },
  addressSearchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.background.white,
    borderRadius: BorderRadius.round,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: AppColors.border.light,
    paddingVertical: 10
  },
  addressInput: {
    flex: 1,
    marginVertical: 0,
    borderWidth: 0,
    outlineWidth: 0,
  },
  mapContainer: {
    height: 200,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    marginBottom: Spacing.md,
  },
  mapPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E8D4C0',
  },
  mapPinContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -16,
    marginTop: -32,
  },
  paymentSection: {
    backgroundColor: AppColors.background.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.sm,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 17,
    elevation: 10,
    borderColor: AppColors.primary,
    borderWidth: 1

  },
  paymentSectionTitle: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.semibold,
    color: AppColors.text.dark,
    marginBottom: Spacing.md,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    // backgroundColor: AppColors.background.white,
    // borderRadius: BorderRadius.lg,
    // marginBottom: Spacing.md,
    // borderWidth: 1,
    // borderColor: AppColors.border.light,
  },
  paymentOptionSelected: {
    // borderColor: AppColors.primary,
    // backgroundColor: '#FFF5F0',
  },
  paymentRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: AppColors.border.medium,
    marginRight: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentRadioFilled: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: AppColors.primary,
  },
  paymentContent: {
    flex: 1,
  },
  paymentLabel: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.semibold,
    color: AppColors.text.dark,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: Spacing.sm,
    // backgroundColor: AppColors.background.white,
    // paddingHorizontal: Spacing.md,
    // borderRadius: BorderRadius.lg,
    // marginBottom: Spacing.md,
    // borderWidth: 1,
    // borderColor: AppColors.border.light,
  },
  summaryLabel: {
    flex: 1,
    fontSize: FontSizes.xs,
    fontWeight: FontWeights.medium,
    marginRight: Spacing.md,
    color: AppColors.text.falcon

  },
  summaryValue: {
    fontSize: FontSizes.xs,
    fontWeight: FontWeights.semibold,
    color: AppColors.text.falcon
  },
  summaryDivider: {
    height: 1,
    backgroundColor: AppColors.border.light,
    marginVertical: Spacing.md,
  },
  notesInput: {
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    backgroundColor: AppColors.background.light,
    color: AppColors.text.dark,
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
    height: 100,
    borderColor: AppColors.text.mehndi,
    outlineWidth: 0,

  },
  priceSummary: {
    marginHorizontal: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  termsContainer: {
    marginHorizontal: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  termsText: {
    fontSize: FontSizes.xs,
    color: AppColors.text.medium,
    lineHeight: 18,
    marginTop: 5
  },
  termsLink: {
    color: AppColors.primary,
    fontWeight: FontWeights.semibold,
  },
  placeOrderButton: {
    // marginHorizontal: Spacing.xl,
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

export default CheckoutScreen;
