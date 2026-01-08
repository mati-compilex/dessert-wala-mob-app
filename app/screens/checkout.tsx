import { PriceSummary } from '@/components/app/PriceSummary';
import { StepIndicator } from '@/components/app/StepIndicator';
import { Button } from '@/components/auth/Button';
import { TextInput } from '@/components/auth/TextInput';
import { AppColors } from '@/constants/colors';
import { BorderRadius, Spacing } from '@/constants/spacing';
import { FontSizes, FontWeights } from '@/constants/typography';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Pressable,
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
            onPress={onBack}
            style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              color={AppColors.text.dark}
            />
          </Pressable>
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
                  ? AppColors.background.white
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
                  ? AppColors.background.white
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
              <TextInput
                placeholder="Search for address"
                value={address}
                onChangeText={setAddress}
                containerStyle={styles.addressInput}
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

        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order summary</Text>

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

        {/* Special Notes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Any notes for the rider?</Text>
          <TextInput
            placeholder="Leave on the door..."
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={3}
            containerStyle={styles.notesInput}
          />
        </View>

        {/* Price Summary */}
        <PriceSummary
          data={{
            subtotal,
            deliveryFee,
          }}
          containerStyle={styles.priceSummary}
        />

        {/* Terms and Conditions */}
        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>
            By placing this order, I agreed with all the{' '}
            <Text style={styles.termsLink}>Terms and Conditions</Text>
          </Text>
        </View>

        {/* Place Order Button */}
        <Button
          title="Place Order"
          onPress={onPlaceOrder}
          containerStyle={styles.placeOrderButton}
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
  deliveryToggle: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginHorizontal: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  deliveryTypeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    backgroundColor: AppColors.background.white,
    borderRadius: BorderRadius.round,
    borderWidth: 1,
    borderColor: AppColors.border.light,
  },
  deliveryTypeButtonActive: {
    backgroundColor: AppColors.primary,
    borderColor: AppColors.primary,
  },
  deliveryTypeText: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.semibold,
    color: AppColors.text.medium,
  },
  deliveryTypeTextActive: {
    color: AppColors.background.white,
  },
  section: {
    marginHorizontal: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.semibold,
    color: AppColors.text.dark,
    marginBottom: Spacing.md,
  },
  addressSearchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.background.white,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: AppColors.border.light,
  },
  addressInput: {
    flex: 1,
    marginVertical: 0,
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
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    backgroundColor: AppColors.background.white,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: AppColors.border.light,
  },
  paymentOptionSelected: {
    borderColor: AppColors.primary,
    backgroundColor: '#FFF5F0',
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
    backgroundColor: AppColors.background.white,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: AppColors.border.light,
  },
  summaryLabel: {
    flex: 1,
    fontSize: FontSizes.xs,
    color: AppColors.text.dark,
    fontWeight: FontWeights.medium,
    marginRight: Spacing.md,
  },
  summaryValue: {
    fontSize: FontSizes.xs,
    fontWeight: FontWeights.semibold,
    color: AppColors.primary,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: AppColors.border.light,
    marginVertical: Spacing.md,
  },
  notesInput: {
    marginBottom: Spacing.md,
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
    textAlign: 'center',
    lineHeight: 18,
  },
  termsLink: {
    color: AppColors.primary,
    fontWeight: FontWeights.semibold,
  },
  placeOrderButton: {
    marginHorizontal: Spacing.xl,
  },
});

export default CheckoutScreen;
