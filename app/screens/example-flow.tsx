import {
    CartScreen,
    CheckoutScreen,
    HomeScreen,
    MyOrdersScreen,
    OrderDetailScreen,
    OrderSuccessScreen,
    ProductDetailsScreen,
} from '@/components/app';
import { AppColors } from '@/constants/colors';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

type ScreenName =
  | 'home'
  | 'product-details'
  | 'cart'
  | 'checkout'
  | 'order-success'
  | 'my-orders'
  | 'order-detail';

interface AppFlowState {
  currentScreen: ScreenName;
  selectedProductId?: string;
  selectedOrderId?: string;
}

/**
 * App Flow Example - Shows how to integrate all screens
 * 
 * This is a complete example of navigating between all app screens.
 * In production, use Expo Router or React Navigation for proper navigation.
 */
export const AppFlowExample = () => {
  const [state, setState] = useState<AppFlowState>({
    currentScreen: 'home',
  });

  const handleNavigate = (
    screen: ScreenName,
    data?: { productId?: string; orderId?: string }
  ) => {
    setState({
      currentScreen: screen,
      selectedProductId: data?.productId,
      selectedOrderId: data?.orderId,
    });
  };

  const renderScreen = () => {
    switch (state.currentScreen) {
      case 'home':
        return (
          <HomeScreen
            onProductPress={(productId) =>
              handleNavigate('product-details', { productId })
            }
            onCategorySelect={(category) => {
              console.log('Category selected:', category);
            }}
          />
        );

      case 'product-details':
        return (
          <ProductDetailsScreen
            productId={state.selectedProductId || '1'}
            onBack={() => handleNavigate('home')}
            onViewCart={() => handleNavigate('cart')}
          />
        );

      case 'cart':
        return (
          <CartScreen
            onBack={() => handleNavigate('home')}
            onCheckout={() => handleNavigate('checkout')}
          />
        );

      case 'checkout':
        return (
          <CheckoutScreen
            onBack={() => handleNavigate('cart')}
            onPlaceOrder={() => handleNavigate('order-success')}
          />
        );

      case 'order-success':
        return (
          <OrderSuccessScreen
            onTrackOrder={() => handleNavigate('order-detail', { orderId: '1' })}
          />
        );

      case 'my-orders':
        return (
          <MyOrdersScreen
            onOrderPress={(orderId) =>
              handleNavigate('order-detail', { orderId })
            }
          />
        );

      case 'order-detail':
        return (
          <OrderDetailScreen
            orderId={state.selectedOrderId || '1'}
            onBack={() => handleNavigate('my-orders')}
          />
        );

      default:
        return (
          <HomeScreen
            onProductPress={(productId) =>
              handleNavigate('product-details', { productId })
            }
            onCategorySelect={(category) => console.log(category)}
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background.cream,
  },
});

export default AppFlowExample;
