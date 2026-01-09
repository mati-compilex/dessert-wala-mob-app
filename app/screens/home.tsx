import { CategoryChip } from '@/components/app/CategoryChip';
import { ProductCard } from '@/components/app/ProductCard';
import { AppColors } from '@/constants/colors';
import { BorderRadius, Spacing } from '@/constants/spacing';
import { FontSizes, FontWeights } from '@/constants/typography';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';


interface HomeScreenProps {
  onProductPress: (productId: string) => void;
  onCategorySelect: (category: string) => void;
}

const MOCK_CATEGORIES = [
  { id: '1', label: 'Cupcakes',  image: require('../../assets/images/cake.png') },
  { id: '2', label: 'Croissants', image: require('../../assets/images/Croissants.png') },
  { id: '3', label: 'Cookies', image: require('../../assets/images/Cookies.png') },
];

const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Red Velvet Cupcake',
    price: 4.0,
    rating: 4.8,
    description: 'Freshly baked cupcakes, served with sprinkled seasoning',
    image: require('../../assets/images/redvelvet.png'),
  },
  {
    id: '2',
    name: 'Flaky Butter Croissant',
    price: 4.0,
    rating: 4.9,
    description: 'Freshly baked cupcakes, served with sprinkled seasoning',
    image: require('../../assets/images/Croissants.png'),
  },
  {
    id: '3',
    name: 'Molten Lava Cake',
    price: 12.0,
    rating: 5.0,
    description: 'Rich chocolate cake with a gooey molten center topped with vanilla ice cream',
    image: require('../../assets/images/Cookies.png'),
  },
];

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onProductPress,
  onCategorySelect,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
    onCategorySelect(categoryId);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ImageBackground 
          source={require('../../assets/images/header-bg.png')}
          style={styles.headerContainer}
        >
          {/* Header */}
          <View style={styles.header}>
            <Image source={require('../../assets/images/Logo.png')} />
            {/* <Text style={styles.title}>DESSERT WALA</Text> */}
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <MaterialCommunityIcons
              name="magnify"
              size={20}
              color={AppColors.text.light}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search your cravings..."
              placeholderTextColor={AppColors.text.light}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </ImageBackground>
        {/* Categories Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What Do You Crave?</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          >
            {MOCK_CATEGORIES.map((category) => (
              <CategoryChip
                key={category.id}
                label={category.label}
                image={category.image}
                isSelected={selectedCategory === category.id}
                onPress={() => handleCategorySelect(category.id)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Hot Selling Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Hot Selling</Text>
          {MOCK_PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onPress={() => onProductPress(product.id)}
            />
          ))}
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
  headerContainer: {
    backgroundColor:"#FFEFCC",
    marginBottom: Spacing.xl,
    paddingTop: 80,
  },
  header: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    alignItems: 'center',
  },
  title: {
    fontSize: FontSizes.xxxl,
    fontWeight: FontWeights.bold,
    color: AppColors.text.dark,
    letterSpacing: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColors.background.white,
    borderRadius: BorderRadius.round,
    paddingHorizontal: Spacing.lg,
    marginHorizontal: Spacing.xl,
    marginBottom: Spacing.xl,
    borderWidth: 1,
    borderColor: AppColors.border.light,
  },
  searchInput: {
    flex: 1,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    fontSize: FontSizes.md,
    color: AppColors.text.dark,
  },
  section: {
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.xl,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.bold,
    color: AppColors.text.dark,
    marginBottom: Spacing.lg,
    // marginHorizontal: Spacing.xl,
  },
  categoriesList: {
    gap: Spacing.md,
  },
  productsList: {
    paddingHorizontal: Spacing.xl,
  },
});

export default HomeScreen;
