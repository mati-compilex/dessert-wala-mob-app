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
    View,
} from 'react-native';

interface AccountItem {
  id: string;
  label: string;
  icon: string;
  onPress: () => void;
}

export default function AccountTab() {
  const [userProfile] = React.useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    memberSince: 'January 2024',
  });

  const accountItems: AccountItem[] = [
    {
      id: 'profile',
      label: 'Edit Profile',
      icon: 'account-edit',
      onPress: () => console.log('Edit Profile'),
    },
    {
      id: 'addresses',
      label: 'Saved Addresses',
      icon: 'map-marker-multiple',
      onPress: () => console.log('Addresses'),
    },
    {
      id: 'payments',
      label: 'Payment Methods',
      icon: 'credit-card',
      onPress: () => console.log('Payments'),
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: 'bell',
      onPress: () => console.log('Notifications'),
    },
    {
      id: 'help',
      label: 'Help & Support',
      icon: 'help-circle',
      onPress: () => console.log('Help'),
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'cog',
      onPress: () => console.log('Settings'),
    },
    {
      id: 'logout',
      label: 'Logout',
      icon: 'logout',
      onPress: () => console.log('Logout'),
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.profileAvatar}>
            <MaterialCommunityIcons
              name="account"
              size={50}
              color={AppColors.primary}
            />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{userProfile.name}</Text>
            <Text style={styles.profileEmail}>{userProfile.email}</Text>
            <Text style={styles.profilePhone}>{userProfile.phone}</Text>
            <Text style={styles.memberSince}>
              Member since {userProfile.memberSince}
            </Text>
          </View>
        </View>

        {/* Account Menu Items */}
        <View style={styles.menuContainer}>
          {accountItems.map((item) => (
            <Pressable
              key={item.id}
              onPress={item.onPress}
              style={({ pressed }) => [
                styles.menuItem,
                pressed && styles.menuItemPressed,
                item.id === 'logout' && styles.logoutItem,
              ]}
            >
              <MaterialCommunityIcons
                name={item.icon}
                size={24}
                color={
                  item.id === 'logout' ? AppColors.status.error : AppColors.text.dark
                }
              />
              <Text
                style={[
                  styles.menuLabel,
                  item.id === 'logout' && styles.logoutLabel,
                ]}
              >
                {item.label}
              </Text>
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color={AppColors.border.medium}
              />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: AppColors.background.white,
  },
  scrollContent: {
    paddingBottom: Spacing.xxl,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.background.light,
    padding: Spacing.xxl,
    marginBottom: Spacing.xxl,
    gap: Spacing.lg,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.round,
    backgroundColor: AppColors.background.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
    gap: Spacing.xs,
  },
  profileName: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
    color: AppColors.text.dark,
  },
  profileEmail: {
    fontSize: FontSizes.sm,
    color: AppColors.text.medium,
  },
  profilePhone: {
    fontSize: FontSizes.sm,
    color: AppColors.text.medium,
  },
  memberSince: {
    fontSize: FontSizes.xs,
    color: AppColors.text.light,
    marginTop: Spacing.xs,
  },
  menuContainer: {
    marginHorizontal: Spacing.xl,
    gap: Spacing.sm,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    backgroundColor: AppColors.background.white,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: AppColors.border.light,
    gap: Spacing.md,
  },
  menuItemPressed: {
    backgroundColor: AppColors.background.light,
  },
  menuLabel: {
    flex: 1,
    fontSize: FontSizes.md,
    fontWeight: FontWeights.medium,
    color: AppColors.text.dark,
  },
  logoutItem: {
    borderColor: AppColors.status.error,
    borderWidth: 1,
  },
  logoutLabel: {
    color: AppColors.status.error,
  },
});
