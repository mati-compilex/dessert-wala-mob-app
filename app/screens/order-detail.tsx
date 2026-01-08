import { MapPlaceholder } from '@/components/app/MapPlaceholder';
import { OrderStatusTimeline } from '@/components/app/OrderStatusTimeline';
import { Button } from '@/components/auth/Button';
import { AppColors } from '@/constants/colors';
import { BorderRadius, Spacing } from '@/constants/spacing';
import { FontSizes, FontWeights } from '@/constants/typography';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';


interface OrderDetailScreenProps {
  orderId: string;
  onBack: () => void;
}

export const OrderDetailScreen: React.FC<OrderDetailScreenProps> = ({
  orderId,
  onBack,
}) => {
  const statusSteps = [
    { status: 'pending' as const, label: 'Order Received', timestamp: '05:58 PM, 31 Jan 2024', completed: true },
    { status: 'preparing' as const, label: 'Preparing', timestamp: '06:00 PM, 31 Jan 2024', completed: true },
    { status: 'ready' as const, label: 'Picked by Rider', timestamp: '06:10 PM, 31 Jan 2024', completed: false },
    { status: 'out-for-delivery' as const, label: 'Out for Delivery', completed: false },
    { status: 'delivered' as const, label: 'Delivered', completed: false },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
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
          <Text style={styles.title}>Order #012345</Text>
          <View style={styles.backButton} />
        </View>

        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>

          <View style={styles.summaryContainer}>
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
              <Text style={styles.summaryValue}>$ 13.50</Text>
            </View>

            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Delivery Fee</Text>
              <Text style={styles.summaryValue}>$ 4.00</Text>
            </View>
          </View>
        </View>

        {/* Order Status Timeline */}
        <View style={styles.section}>
          <OrderStatusTimeline
            steps={statusSteps}
            containerStyle={styles.timeline}
          />
        </View>

        {/* Order Tracking Map */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Tracking</Text>
          <MapPlaceholder height={250} />
        </View>

        {/* Reorder Button */}
        <Button
          title="Reorder same items"
          onPress={() => console.log('Reorder')}
          containerStyle={styles.reorderButton}
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
  summaryContainer: {
    backgroundColor: AppColors.background.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: AppColors.border.light,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: Spacing.sm,
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
  timeline: {
    marginHorizontal: -Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },
  reorderButton: {
    marginHorizontal: Spacing.xl,
  },
});

export default OrderDetailScreen;
