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


interface OrderSuccessScreenProps {
  onTrackOrder: () => void;
}

export const OrderSuccessScreen: React.FC<OrderSuccessScreenProps> = ({
  onTrackOrder,
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Back Button */}
        <View style={styles.headerContainer}>
          <Pressable style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}>
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              color={AppColors.text.dark}
            />
          </Pressable>
        </View>

        {/* Success Icon Animation Container */}
        <View style={styles.successContainer}>
          <View style={styles.successIconWrapper}>
            <View style={styles.successIconRing1} />
            <View style={styles.successIconRing2} />
            <View style={styles.successIconRing3} />
            <View style={styles.successIcon}>
              <MaterialCommunityIcons
                name="check-bold"
                size={48}
                color={AppColors.primary}
              />
            </View>
          </View>
        </View>

        {/* Success Message */}
        <View style={styles.messageContainer}>
          <Text style={styles.title}>Order Placed Successfully!</Text>
          <Text style={styles.subtitle}>
            Your delicious order is being prepared!
          </Text>
          <Text style={styles.estimatedTime}>Estimated time: 20-30 mins</Text>
        </View>

        {/* Order Details */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <MaterialCommunityIcons
              name="clock-outline"
              size={20}
              color={AppColors.primary}
            />
            <Text style={styles.detailText}>Preparation started</Text>
          </View>

          <View style={styles.detailRow}>
            <MaterialCommunityIcons
              name="truck-fast"
              size={20}
              color={AppColors.primary}
            />
            <Text style={styles.detailText}>Will be delivered soon</Text>
          </View>

          <View style={styles.detailRow}>
            <MaterialCommunityIcons
              name="bell-outline"
              size={20}
              color={AppColors.primary}
            />
            <Text style={styles.detailText}>
              You'll receive notifications about your order
            </Text>
          </View>
        </View>

        {/* Track Order Button */}
        <Button
          title="Track Your Order"
          onPress={onTrackOrder}
          containerStyle={styles.trackButton}
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
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  headerContainer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  backButton: {
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
  successContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Spacing.xxxl,
  },
  successIconWrapper: {
    position: 'relative',
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successIconRing1: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: 'rgba(184, 101, 27, 0.1)',
  },
  successIconRing2: {
    position: 'absolute',
    width: 95,
    height: 95,
    borderRadius: 47.5,
    borderWidth: 1,
    borderColor: 'rgba(184, 101, 27, 0.15)',
  },
  successIconRing3: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: 'rgba(184, 101, 27, 0.2)',
  },
  successIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: AppColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageContainer: {
    alignItems: 'center',
    marginVertical: Spacing.xl,
    paddingHorizontal: Spacing.xl,
  },
  title: {
    fontSize: FontSizes.xxl,
    fontWeight: FontWeights.bold,
    color: AppColors.text.dark,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FontSizes.md,
    color: AppColors.text.medium,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  estimatedTime: {
    fontSize: FontSizes.sm,
    color: AppColors.primary,
    fontWeight: FontWeights.semibold,
  },
  detailsContainer: {
    marginHorizontal: Spacing.xl,
    marginVertical: Spacing.xl,
    backgroundColor: AppColors.background.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: AppColors.border.light,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  detailText: {
    fontSize: FontSizes.sm,
    color: AppColors.text.dark,
    marginLeft: Spacing.md,
    flex: 1,
    lineHeight: 20,
  },
  trackButton: {
    marginHorizontal: Spacing.xl,
  },
});

export default OrderSuccessScreen;
