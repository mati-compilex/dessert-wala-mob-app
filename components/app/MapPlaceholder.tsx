import { AppColors } from '@/constants/colors';
import { BorderRadius, Spacing } from '@/constants/spacing';
import { FontSizes, FontWeights } from '@/constants/typography';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface MapPlaceholderProps {
  height?: number;
  onPress?: () => void;
}

export const MapPlaceholder: React.FC<MapPlaceholderProps> = ({
  height = 250,
  onPress,
}) => {
  return (
    <View
      style={[
        styles.container,
        { height },
        onPress && styles.pressable,
      ]}
      onTouchEnd={onPress}
    >
      <View style={styles.content}>
        <MaterialCommunityIcons
          name="map-marker"
          size={48}
          color={AppColors.primary}
        />
        <Text style={styles.title}>Live Tracking Map</Text>
        <Text style={styles.subtitle}>Integration Ready</Text>
        <Text style={styles.hint}>Ready for react-native-maps or other map providers</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: AppColors.background.light,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: AppColors.border.medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressable: {
    opacity: 0.9,
  },
  content: {
    alignItems: 'center',
    gap: Spacing.md,
  },
  title: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semibold as any,
    color: AppColors.text.dark,
    marginTop: Spacing.md,
  },
  subtitle: {
    fontSize: FontSizes.sm,
    color: AppColors.text.medium,
  },
  hint: {
    fontSize: FontSizes.xs,
    color: AppColors.text.light,
    marginTop: Spacing.sm,
  },
});
