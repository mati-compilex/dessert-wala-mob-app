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

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image?: ImageSourcePropType;
  rating?: number;
  description?: string;
  onPress: () => void;
  containerStyle?: ViewStyle;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  image,
  rating,
  description,
  onPress,
  containerStyle,
}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
        containerStyle,
      ]}
      onPress={onPress}
    >
      <View style={styles.imageContainer}>
        {image ? (
          <Image source={image} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder} />
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.name} numberOfLines={2}>
            {name}
          </Text>
          <Text style={styles.price}>${price.toFixed(2)}</Text>
        </View>

        {rating !== undefined && (
          <View style={styles.ratingRow}>
            <MaterialCommunityIcons
              name="star"
              size={14}
              color="#FFC107"
            />
            <Text style={styles.rating}>{rating}</Text>
          </View>
        )}

        {description && (
          <Text style={styles.description} numberOfLines={2}>
            {description}
          </Text>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
    backgroundColor: AppColors.background.white,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: AppColors.border.light,
  },
  pressed: {
    opacity: 0.7,
  },
  imageContainer: {
    width: 100,
    height: 100,
    marginRight: Spacing.md,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E8E0D5',
  },
  content: {
    flex: 1,
    paddingVertical: Spacing.md,
    paddingRight: Spacing.md,
    justifyContent: 'space-between',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    // marginBottom: Spacing.xs,
  },
  name: {
    flex: 1,
    fontSize: FontSizes.md,
    fontWeight: FontWeights.semibold,
    color: AppColors.text.dark,
    marginRight: Spacing.sm,
  },
  price: {
    fontSize: FontSizes.md,
    fontWeight: FontWeights.bold,
    color: AppColors.primary,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.xs,
  },
  rating: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
    color: AppColors.text.dark,
  },
  description: {
    fontSize: FontSizes.xs,
    color: AppColors.text.medium,
    lineHeight: 16,
  },
});
