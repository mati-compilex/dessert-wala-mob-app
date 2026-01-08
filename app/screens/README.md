# App Screens Documentation

This directory contains all the main application screens and reusable components for the Dessert Wala app customer experience.

## Installed Packages

The following packages have been installed for the app screens:

```json
{
  "react-native-maps": "^1.x.x"  // For order tracking map display
}
```

All other dependencies were already present in the project.

## Directory Structure

```
components/app/              # Reusable UI components
├── CategoryChip.tsx        # Category selection chip
├── ProductCard.tsx         # Product card with image and info
├── CartItemRow.tsx         # Cart item with quantity controls
├── PriceSummary.tsx        # Price breakdown display
├── OrderStatusTimeline.tsx # Order status timeline
├── StepIndicator.tsx       # Multi-step indicator
└── index.ts               # Barrel export

app/screens/                 # Complete app screens
├── home.tsx               # Browse products with search
├── product-details.tsx    # Product with extras and quantity
├── cart.tsx              # Shopping cart review
├── checkout.tsx          # Delivery address & payment
├── order-success.tsx     # Order confirmation
├── my-orders.tsx         # Order history
└── order-detail.tsx      # Order tracking with map
```

## Screen Descriptions

### Home Screen (`home.tsx`)
- Search bar for products
- Category chips (Cupcakes, Croissants, Cookies)
- Hot selling products list
- Navigate to product details

**Props:**
```typescript
interface HomeScreenProps {
  onProductPress: (productId: string) => void;
  onCategorySelect: (category: string) => void;
}
```

### Product Details Screen (`product-details.tsx`)
- Large product image with back & wishlist buttons
- Product name, price, and description
- Extras selection with checkboxes
- Special instructions textarea
- Quantity controls
- Total price display

**Props:**
```typescript
interface ProductDetailsScreenProps {
  productId: string;
  onBack: () => void;
  onViewCart: () => void;
}
```

### Cart Screen (`cart.tsx`)
- Step indicator (Menu → Cart → Checkout)
- Cart items with quantity controls
- Add/remove items functionality
- Promo code input
- Price breakdown
- Proceed to checkout button

**Props:**
```typescript
interface CartScreenProps {
  onBack: () => void;
  onCheckout: () => void;
}
```

### Checkout Screen (`checkout.tsx`)
- Delivery type toggle (Delivery/Pickup)
- Delivery address with map
- Payment method selection (Card/Google Pay)
- Order summary
- Special notes for rider
- Place order button

**Props:**
```typescript
interface CheckoutScreenProps {
  onBack: () => void;
  onPlaceOrder: () => void;
}
```

### Order Success Screen (`order-success.tsx`)
- Success animation with check icon
- Order confirmation message
- Estimated delivery time
- Order details overview
- Track order button

**Props:**
```typescript
interface OrderSuccessScreenProps {
  onTrackOrder: () => void;
}
```

### My Orders Screen (`my-orders.tsx`)
- Today/Past Orders tabs
- Order cards with status badges
- Order number, item count, price
- Color-coded status indicators
- Order detail navigation

**Props:**
```typescript
interface MyOrdersScreenProps {
  onOrderPress: (orderId: string) => void;
}
```

### Order Detail Screen (`order-detail.tsx`)
- Order summary with items and prices
- Order status timeline with timestamps
- Live tracking map (react-native-maps)
- Reorder button

**Props:**
```typescript
interface OrderDetailScreenProps {
  orderId: string;
  onBack: () => void;
}
```

## Reusable Components

### CategoryChip
Selection chip for product categories.

```typescript
<CategoryChip
  label="Cupcakes"
  icon="cake"
  isSelected={isSelected}
  onPress={() => handleSelect()}
/>
```

**Props:**
- `label`: string - Category name
- `icon`: string - @expo/vector-icons name
- `image`: ImageSourcePropType - Optional image
- `isSelected`: boolean - Selection state
- `onPress`: () => void - Selection handler

### ProductCard
Displays product with image, price, rating, and description.

```typescript
<ProductCard
  id="1"
  name="Red Velvet Cupcake"
  price={4.0}
  rating={4.8}
  description="Freshly baked..."
  onPress={() => navigate('product')}
/>
```

**Props:**
- `id`: string - Product ID
- `name`: string - Product name
- `price`: number - Price in USD
- `image`: ImageSourcePropType - Product image
- `rating`: number - Star rating
- `description`: string - Product description
- `onPress`: () => void - Navigate handler

### CartItemRow
Cart item with quantity controls and remove button.

```typescript
<CartItemRow
  item={cartItem}
  onIncrement={(id) => handleIncrement(id)}
  onDecrement={(id) => handleDecrement(id)}
  onRemove={(id) => handleRemove(id)}
/>
```

**Props:**
- `item`: CartItem - Item data
- `onIncrement`: (id: string) => void
- `onDecrement`: (id: string) => void
- `onRemove`: (id: string) => void

### PriceSummary
Displays price breakdown with subtotal, discount, delivery fee.

```typescript
<PriceSummary
  data={{
    subtotal: 13.50,
    discount: 0,
    deliveryFee: 4.00,
  }}
/>
```

**Props:**
```typescript
interface PriceSummaryProps {
  data: PriceSummaryData;
  containerStyle?: ViewStyle;
}

interface PriceSummaryData {
  subtotal: number;
  discount?: number;
  deliveryFee?: number;
  tax?: number;
}
```

### OrderStatusTimeline
Displays order progress with status steps.

```typescript
<OrderStatusTimeline
  steps={[
    { status: 'pending', label: 'Order Received', completed: true },
    { status: 'preparing', label: 'Preparing', completed: false },
    // ...
  ]}
/>
```

### StepIndicator
Multi-step navigation indicator.

```typescript
<StepIndicator
  steps={[
    { label: 'Menu', isCompleted: true },
    { label: 'Cart', isActive: true },
    { label: 'Checkout' },
  ]}
  onStepPress={(index) => handleStepPress(index)}
/>
```

## Image Placeholders

All screens have placeholder containers for images:
- **Background Color**: `#E8E0D5` (light beige)
- **Purpose**: Shows where images should be replaced

To add images:
1. Prepare image assets in `/assets/images/`
2. Import with: `require('@/assets/images/filename.png')`
3. Replace `imagePlaceholder` Views with `Image` components

## Integration Tips

### Step 1: Navigation Setup
```typescript
import { HomeScreen, CartScreen, CheckoutScreen } from '@/components/app';

// In your navigation stack
<Stack.Screen name="home" component={HomeScreen} />
<Stack.Screen name="cart" component={CartScreen} />
<Stack.Screen name="checkout" component={CheckoutScreen} />
```

### Step 2: State Management
```typescript
// Connect to your state management (Redux, Zustand, Context, etc)
const [cartItems, setCartItems] = useState([]);
const [selectedProduct, setSelectedProduct] = useState(null);
```

### Step 3: API Integration
```typescript
// Replace mock data with API calls
const handleProductPress = async (productId) => {
  const product = await fetchProduct(productId);
  setSelectedProduct(product);
  navigate('product-details');
};
```

## Design System

All components use the design system from `constants/`:
- **Colors**: `AppColors` (Primary: #B8651B)
- **Spacing**: `Spacing` (xs to huge)
- **Typography**: `FontSizes`, `FontWeights`
- **Borders**: `BorderRadius`

## Mock Data

Screens include mock data for development:
- `MOCK_CATEGORIES` - Product categories
- `MOCK_PRODUCTS` - Sample products
- Sample cart items, orders, etc.

Replace with real data from your API when integrating.

## Image Assets Needed

Create these image files in `/assets/images/`:
- Product images (various desserts)
- Category icons/images
- Payment method logos
- Order status icons

## Accessibility

- All buttons are 44x44px minimum touch targets
- Color contrast meets WCAG AA standards
- Icon + text for clarity
- Proper labeling for screen readers

## Performance Considerations

- Use `React.memo()` for ProductCard for FlatList optimization
- Implement pagination for large product/order lists
- Lazy load product images with `expo-image`
- Cache cart data locally before checkout

## Future Enhancements

- [ ] Implement actual map tracking with react-native-maps
- [ ] Add product image gallery/carousel
- [ ] Implement real-time order updates with WebSocket
- [ ] Add review/rating functionality
- [ ] Wishlist synchronization
- [ ] Push notifications for order updates
- [ ] Address autocomplete with Google Places API

## License

Part of Dessert Wala App
