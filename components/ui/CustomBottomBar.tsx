import { AppColors } from '@/constants/colors';
import { FontSizes, FontWeights } from '@/constants/typography';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

export default function CustomBottomBar() {
  const router = useRouter();
  const pathname = usePathname();
  const cartCount = 2; // placeholder, replace with state

  const nav = (path: string) => {
    router.push(path as any);
  };

  const isActive = (path: string) => pathname === path;

  return (
    <View pointerEvents="box-none" style={styles.container}>
      <View style={styles.wrapper}>
        <Pressable style={styles.tab} onPress={() => nav('/')}>
          <MaterialCommunityIcons 
            name="home-outline" 
            size={25} 
            color={isActive('/') ? AppColors.primary : AppColors.text.light} 
          />
        </Pressable>

        <Pressable style={styles.tab} onPress={() => nav('/orders')}>
          <MaterialCommunityIcons 
            name="receipt-outline" 
            size={25} 
            color={isActive('/orders') ? AppColors.primary : AppColors.text.light} 
          />
        </Pressable>

        {/* <View style={styles.centerSpace} /> */}

        <Pressable style={styles.tab} onPress={() => nav('/cart')}>
          <MaterialCommunityIcons 
            name="cart-outline" 
            size={25} 
            color={isActive('/cart') ? AppColors.primary : AppColors.text.light} 
          />
          {cartCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartCount}</Text>
            </View>
          )}
        </Pressable>

        <Pressable style={styles.tab} onPress={() => nav('/account')}>
          <MaterialCommunityIcons 
            name="account-circle-outline" 
            size={25} 
            color={isActive('/account') ? AppColors.primary : AppColors.text.light} 
          />
        </Pressable>
      </View>

      {/* <Pressable onPress={() => nav('/(tabs)/account')} style={styles.fab}>
        <MaterialCommunityIcons name="account" size={28} color="#fff" />
      </Pressable> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: Platform.OS === 'ios' ? 24 : 12,
    alignItems: 'center',
    zIndex: 50,
  },
  wrapper: {
    flexDirection: 'row',
    backgroundColor: AppColors.background.white,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    width: '50%',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#543018',
    shadowOffset: { width: 0, height: 29 },
    shadowOpacity: 0.04,
    shadowRadius: 29,
    elevation: 15,
    borderColor: AppColors.primary,
    borderWidth: 1,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 25,
  },
  label: {
    fontSize: FontSizes.xs,
    marginTop: 4,
    color: AppColors.text.light,
    fontWeight: FontWeights.medium as any,
  },
  centerSpace: {
    width: 25,
  },
  fab: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 28 : 16,
    backgroundColor: AppColors.primary,
    width: 64,
    height: 64,
    borderRadius: 64,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 12,
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: AppColors.primary,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
});