import { MyOrdersScreen } from '@/app/screens/my-orders';
import React from 'react';

export default function OrdersTab() {
  return (
    <MyOrdersScreen
      onOrderPress={(orderId) => {
        console.log('Order pressed:', orderId);
        // Navigate to order details
      }}
    />
  );
}
