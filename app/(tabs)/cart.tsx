import { CartScreen } from '@/app/screens/cart';
import React from 'react';

export default function CartTab() {
  return (
    <CartScreen
      onBack={() => {
        console.log('Back pressed');
      }}
      onCheckout={() => {
        console.log('Checkout pressed');
      }}
    />
  );
}
