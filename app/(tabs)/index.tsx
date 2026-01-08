import { HomeScreen } from '@/app/screens/home';
import { useRouter } from 'expo-router';
import React from 'react';

export default function Index() {
  const router = useRouter();

  const handleProductPress = (productId: string) => {
    // Navigate to the product details screen with productId as query param
    router.push(`/screens/product-details?productId=${productId}`);
  };

  return (
    <HomeScreen
      onProductPress={(productId) => {
        handleProductPress(productId);
      }}
      onCategorySelect={(category) => {
        console.log('Category selected:', category);
      }}
    />
  );
}
