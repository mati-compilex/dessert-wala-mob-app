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


interface Order {
  id: string;
  orderNumber: string;
  itemCount: number;
  price: number;
  status: 'preparing' | 'delivered' | 'cancelled';
}

interface MyOrdersScreenProps {
  onOrderPress: (orderId: string) => void;
}

export const MyOrdersScreen: React.FC<MyOrdersScreenProps> = ({
  onOrderPress,
}) => {
  const [activeTab, setActiveTab] = useState<'today' | 'past'>('today');

  const todayOrders: Order[] = [
    {
      id: '1',
      orderNumber: 'Order #012345',
      itemCount: 2,
      price: 17.5,
      status: 'preparing',
    },
  ];

  const pastOrders: Order[] = [
    {
      id: '2',
      orderNumber: 'Order #012346',
      itemCount: 1,
      price: 8.99,
      status: 'delivered',
    },
  ];

  const displayedOrders = activeTab === 'today' ? todayOrders : pastOrders;

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'preparing':
        return AppColors.status.warning;
      case 'delivered':
        return AppColors.status.success;
      case 'cancelled':
        return AppColors.text.error;
      default:
        return AppColors.text.medium;
    }
  };

  const getStatusLabel = (status: Order['status']) => {
    switch (status) {
      case 'preparing':
        return 'Preparing';
      case 'delivered':
        return 'Delivered';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}>
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              color={AppColors.text.dark}
            />
          </Pressable>
          <Text style={styles.title}>My Orders</Text>
          <View style={styles.backButton} />
        </View>

        {/* Tab Buttons */}
        <View style={styles.tabContainer}>
          <Pressable
            style={[
              styles.tabButton,
              activeTab === 'today' && styles.tabButtonActive,
            ]}
            onPress={() => setActiveTab('today')}
          >
            <Text
              style={[
                styles.tabLabel,
                activeTab === 'today' && styles.tabLabelActive,
              ]}
            >
              Today
            </Text>
            {activeTab === 'today' && <View style={styles.tabIndicator} />}
          </Pressable>

          <Pressable
            style={[
              styles.tabButton,
              activeTab === 'past' && styles.tabButtonActive,
            ]}
            onPress={() => setActiveTab('past')}
          >
            <Text
              style={[
                styles.tabLabel,
                activeTab === 'past' && styles.tabLabelActive,
              ]}
            >
              Past Orders
            </Text>
            {activeTab === 'past' && <View style={styles.tabIndicator} />}
          </Pressable>
        </View>

        {/* Orders List */}
        <View style={styles.ordersList}>
          {displayedOrders.map((order) => (
            <Pressable
              key={order.id}
              style={({ pressed }) => [
                styles.orderCard,
                pressed && styles.pressed,
              ]}
              onPress={() => onOrderPress(order.id)}
            >
              <View style={styles.orderContent}>
                <Text style={styles.orderNumber}>{order.orderNumber}</Text>
                <Text style={styles.orderDetails}>
                  {order.itemCount} item{order.itemCount !== 1 ? 's' : ''} • $
                  {order.price.toFixed(2)}
                </Text>
              </View>

              <View style={styles.orderStatus}>
                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor: getStatusColor(order.status) + '20',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      { color: getStatusColor(order.status) },
                    ]}
                  >
                    {getStatusLabel(order.status)}
                  </Text>
                </View>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={24}
                  color={AppColors.text.light}
                />
              </View>
            </Pressable>
          ))}

          {displayedOrders.length === 0 && (
            <View style={styles.emptyState}>
              <MaterialCommunityIcons
                name="package-open-outline"
                size={48}
                color={AppColors.text.light}
              />
              <Text style={styles.emptyStateText}>No orders yet</Text>
            </View>
          )}
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
  tabContainer: {
    flexDirection: 'row',
    gap: Spacing.md,
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  tabButton: {
    flex: 1,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    backgroundColor: AppColors.background.white,
    borderRadius: BorderRadius.round,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: AppColors.border.light,
  },
  tabButtonActive: {
    backgroundColor: AppColors.primary,
    borderColor: AppColors.primary,
  },
  tabLabel: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
    color: AppColors.text.medium,
  },
  tabLabelActive: {
    color: AppColors.background.white,
  },
  tabIndicator: {
    marginTop: Spacing.xs,
  },
  ordersList: {
    paddingHorizontal: Spacing.xl,
  },
  orderCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.md,
    backgroundColor: AppColors.background.white,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: AppColors.border.light,
  },
  orderContent: {
    flex: 1,
  },
  orderNumber: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.semibold,
    color: AppColors.text.dark,
    marginBottom: Spacing.xs,
  },
  orderDetails: {
    fontSize: FontSizes.sm,
    color: AppColors.text.medium,
  },
  orderStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  statusBadge: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.round,
  },
  statusText: {
    fontSize: FontSizes.xs,
    fontWeight: FontWeights.semibold,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xxxl,
  },
  emptyStateText: {
    fontSize: FontSizes.md,
    color: AppColors.text.light,
    marginTop: Spacing.md,
  },
});

export default MyOrdersScreen;
