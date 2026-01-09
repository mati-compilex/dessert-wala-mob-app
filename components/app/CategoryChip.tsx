import { AppColors } from '@/constants/colors';
import { BorderRadius, Spacing } from '@/constants/spacing';
import { FontSizes, FontWeights } from '@/constants/typography';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
    Image,
    ImageSourcePropType,
    Pressable,
    StyleSheet,
    Text,
    View,
    ViewStyle,
} from 'react-native';

interface CategoryChipProps {
  label: string;
  icon?: string;
  image?: ImageSourcePropType;
  isSelected?: boolean;
  onPress: () => void;
  containerStyle?: ViewStyle;
}

export const CategoryChip: React.FC<CategoryChipProps> = ({
  label,
  icon,
  image,
  isSelected = false,
  onPress,
  containerStyle,
}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        isSelected && styles.selected,
        pressed && styles.pressed,
        containerStyle,
      ]}
      onPress={onPress}
    >
      {image ? (
        <Image source={image} style={styles.image} />
      ) : icon ? (
        <MaterialCommunityIcons
          name={icon as any}
          size={32}
          color={isSelected ? AppColors.background.white : AppColors.primary}
        />
      ) : (
        <View style={styles.placeholderImage} />
      )}
      <Text style={[styles.label, isSelected && styles.selectedLabel]}>
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    // paddingVertical: Spacing.md,
    // paddingHorizontal: Spacing.md,
    // borderRadius: BorderRadius.lg,
    // backgroundColor: '#FDE8D4',
    // marginRight: Spacing.md,
    minWidth: 100,
  },
  selected: {
    // backgroundColor: "#FDE8D4",
  },
  pressed: {
    opacity: 0.8,
  },
  image: {
    // width: 50,
    // height: 50,
    resizeMode: 'contain',
    marginBottom: Spacing.sm,
    borderRadius: BorderRadius.xl,
  },
  placeholderImage: {
    width: 50,
    height: 50,
    backgroundColor: '#E0DDD8',
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
  },
  label: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
    color: AppColors.text.dark,
  },
  selectedLabel: {
    color: AppColors.primary,
  },
});
