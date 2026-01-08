# Dessert Wala App - Complete Setup Guide

Complete documentation for all authentication and app screens with reusable components.

## 📦 Installed Packages

### New Packages Added
```bash
npm install react-native-maps
```

### Already Included
- @expo/vector-icons - Icons
- @react-navigation/* - Navigation
- expo-* libraries - Expo modules
- react-native - Core framework

## 🎯 Project Structure

```
dessert-wala/
├── app/
│   ├── auth/                          # Authentication screens
│   │   ├── welcome.tsx               # Splash/welcome
│   │   ├── signin.tsx                # Sign in
│   │   ├── signup.tsx                # Sign up
│   │   ├── forgot-password.tsx       # Password reset request
│   │   ├── otp-verification.tsx      # OTP verification
│   │   ├── set-new-password.tsx      # New password
│   │   ├── example-flow.tsx          # Auth flow example
│   │   └── README.md                 # Auth docs
│   │
│   └── screens/                      # App screens
│       ├── home.tsx                  # Browse products
│       ├── product-details.tsx       # Product details
│       ├── cart.tsx                  # Shopping cart
│       ├── checkout.tsx              # Checkout
│       ├── order-success.tsx         # Order confirmation
│       ├── my-orders.tsx             # Order history
│       ├── order-detail.tsx          # Order tracking
│       ├── example-flow.tsx          # App flow example
│       └── README.md                 # Screen docs
│
├── components/
│   ├── auth/                         # Auth components
│   │   ├── TextInput.tsx
│   │   ├── PasswordInput.tsx
│   │   ├── Button.tsx
│   │   ├── SocialButton.tsx
│   │   ├── OTPInput.tsx
│   │   ├── AuthLayout.tsx
│   │   ├── AuthHeader.tsx
│   │   ├── AuthLink.tsx
│   │   ├── Divider.tsx
│   │   ├── index.ts
│   │   └── README.md
│   │
│   └── app/                          # App components
│       ├── CategoryChip.tsx
│       ├── ProductCard.tsx
│       ├── CartItemRow.tsx
│       ├── PriceSummary.tsx
│       ├── OrderStatusTimeline.tsx
│       ├── StepIndicator.tsx
│       └── index.ts
│
├── constants/
│   ├── colors.ts                     # App colors
│   ├── spacing.ts                    # Spacing & borders
│   └── typography.ts                 # Font sizes & weights
│
└── package.json
```

## 🎨 Design System

### Colors (`constants/colors.ts`)
- **Primary**: #B8651B (Brown/Orange)
- **Background**: #F9F7F2 (Cream)
- **Text**: #1A1A1A (Dark brown)
- **Error**: #F44336 (Red)
- **Success**: #4CAF50 (Green)
- **Status colors** for different states

### Spacing (`constants/spacing.ts`)
- xs (4px) → huge (40px)
- Border radius: sm (4px) → round (99px)

### Typography (`constants/typography.ts`)
- Font sizes: xs (12px) → huge (40px)
- Font weights: light → extrabold
- Line heights: tight, normal, relaxed

## 🔐 Authentication Flow

### Screens
1. **Welcome** - Entry point with 3 options
2. **Sign In** - Email/password with remember me & social login
3. **Sign Up** - Registration with validation
4. **Forgot Password** - Email input for reset
5. **OTP Verification** - 6-digit code with timer
6. **Set New Password** - Password reset confirmation

### Components
- `TextInput` - Text input with label & error
- `PasswordInput` - Password with visibility toggle
- `Button` - Multi-variant button (primary/secondary/tertiary)
- `SocialButton` - Social login buttons
- `OTPInput` - 6-digit OTP with auto-focus
- `AuthLayout` - Safe area wrapper
- `AuthHeader` - Title + subtitle
- `AuthLink` - Navigation links
- `Divider` - Divider with text

### Usage
```typescript
import { SignInScreen, Button, TextInput } from '@/components/auth';

// Or use barrel export
import * as Auth from '@/components/auth';
```

## 🛒 App Screens Flow

### Screen Navigation
```
Home → Product Details → Cart → Checkout → Order Success
                                    ↓
                          → Order Detail ← My Orders
```

### Home Screen
- Search bar
- Category chips (Cupcakes, Croissants, Cookies)
- Hot selling products
- Image placeholders in light beige (#E8E0D5)

### Product Details Screen
- Back & wishlist buttons
- Product image placeholder
- Name, price, rating, description
- Choose extras (with +$ price)
- Special instructions textarea
- Quantity controls
- Total price
- View cart button

### Cart Screen
- Step indicator (Menu → Cart → Checkout)
- Cart items with quantity controls
- Add/remove items
- Promo code input
- Price breakdown (subtotal, discount, delivery)
- Proceed to checkout

### Checkout Screen
- Step indicator (all completed except checkout)
- Delivery type toggle (Delivery/Pickup)
- Delivery address with map placeholder
- Payment method selection (Card/Google Pay)
- Order summary
- Notes for rider
- Price summary
- Place order button

### Order Success Screen
- Success animation with rings
- "Order Placed Successfully!" message
- Estimated time (20-30 mins)
- Order details overview
- Track your order button

### My Orders Screen
- Today/Past Orders tabs
- Order cards with status badges
- Order number, item count, price
- Status color coding
  - 🟠 Preparing
  - 🟢 Delivered
  - 🔴 Cancelled

### Order Detail Screen
- Order number & summary
- Order status timeline with timestamps
- Live tracking map (ready for react-native-maps)
- Reorder button

## 📸 Image Placeholders

All image areas use placeholder backgrounds:
- **Color**: #E8E0D5 (Light beige)
- **Purpose**: Shows where images need to be added
- **Replace with**: `Image` component once you add assets

To add images:
```typescript
// Create assets folder
mkdir -p assets/images

// Import image
import productImage from '@/assets/images/cupcake.png';

// Use in Image component
<Image source={productImage} style={styles.image} />
```

## 🔄 Reusable Components

### App Components (`components/app/`)

**CategoryChip**
```typescript
<CategoryChip
  label="Cupcakes"
  icon="cake"
  isSelected={selected}
  onPress={() => handleSelect()}
/>
```

**ProductCard**
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

**CartItemRow**
```typescript
<CartItemRow
  item={cartItem}
  onIncrement={(id) => increment(id)}
  onDecrement={(id) => decrement(id)}
  onRemove={(id) => remove(id)}
/>
```

**PriceSummary**
```typescript
<PriceSummary
  data={{
    subtotal: 13.50,
    discount: 2.00,
    deliveryFee: 4.00,
  }}
/>
```

**OrderStatusTimeline**
```typescript
<OrderStatusTimeline
  steps={[
    { status: 'pending', label: 'Order Received', completed: true },
    { status: 'preparing', label: 'Preparing', completed: false },
  ]}
/>
```

**StepIndicator**
```typescript
<StepIndicator
  steps={[
    { label: 'Menu', isCompleted: true },
    { label: 'Cart', isActive: true },
    { label: 'Checkout' },
  ]}
/>
```

## 🚀 Quick Start

### 1. Import Components
```typescript
// Auth screens
import { SignInScreen, SignUpScreen } from '@/components/auth';

// App screens
import { HomeScreen, CartScreen } from '@/components/app';
```

### 2. Set Up Navigation
```typescript
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="welcome" component={WelcomeScreen} />
        <Stack.Screen name="signin" component={SignInScreen} />
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="product" component={ProductDetailsScreen} />
        <Stack.Screen name="cart" component={CartScreen} />
        <Stack.Screen name="checkout" component={CheckoutScreen} />
        <Stack.Screen name="orders" component={MyOrdersScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

### 3. Add Your Data
```typescript
// Replace mock data with API calls
const [products, setProducts] = useState([]);

useEffect(() => {
  fetchProducts().then(setProducts);
}, []);
```

## 🎭 Mock Data

All screens include mock data for development:

```typescript
// Home screen
const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Red Velvet Cupcake',
    price: 4.0,
    rating: 4.8,
    description: 'Freshly baked...',
  },
  // ...
];

// Cart screen
const cartItems = [
  { id: '1', name: 'Croissant', price: 5.5, quantity: 1 },
  // ...
];
```

Replace with real data from your backend API.

## 🔗 Integration Checklist

- [ ] Install `react-native-maps` ✅
- [ ] Create `/assets/images/` folder
- [ ] Add product images (dessert photos)
- [ ] Add payment logos (Google, Apple)
- [ ] Set up navigation structure
- [ ] Connect to your API backend
- [ ] Implement state management (Redux/Zustand/Context)
- [ ] Add real address validation
- [ ] Configure payment gateway
- [ ] Set up push notifications
- [ ] Configure maps API key

## 📋 File Checklist

### Auth Components ✅
- [x] TextInput.tsx
- [x] PasswordInput.tsx
- [x] Button.tsx
- [x] SocialButton.tsx
- [x] OTPInput.tsx
- [x] AuthLayout.tsx
- [x] AuthHeader.tsx
- [x] AuthLink.tsx
- [x] Divider.tsx

### Auth Screens ✅
- [x] welcome.tsx
- [x] signin.tsx
- [x] signup.tsx
- [x] forgot-password.tsx
- [x] otp-verification.tsx
- [x] set-new-password.tsx
- [x] example-flow.tsx

### App Components ✅
- [x] CategoryChip.tsx
- [x] ProductCard.tsx
- [x] CartItemRow.tsx
- [x] PriceSummary.tsx
- [x] OrderStatusTimeline.tsx
- [x] StepIndicator.tsx

### App Screens ✅
- [x] home.tsx
- [x] product-details.tsx
- [x] cart.tsx
- [x] checkout.tsx
- [x] order-success.tsx
- [x] my-orders.tsx
- [x] order-detail.tsx
- [x] example-flow.tsx

### Constants ✅
- [x] colors.ts
- [x] spacing.ts
- [x] typography.ts

## 🎯 Next Steps

1. **Set up React Navigation** - Implement proper navigation structure
2. **Add images** - Create product and category images
3. **Connect API** - Replace mock data with real backend calls
4. **Implement state** - Use Redux, Zustand, or Context API
5. **Add offline support** - Use AsyncStorage for cart persistence
6. **Configure maps** - Get API key and configure react-native-maps
7. **Add payments** - Integrate payment gateway
8. **Enable notifications** - Set up Firebase/Expo Notifications
9. **Test & polish** - UI/UX refinements

## 📚 Documentation

- [Auth Components](components/auth/README.md)
- [App Screens](app/screens/README.md)
- [Colors](constants/colors.ts)
- [Spacing](constants/spacing.ts)
- [Typography](constants/typography.ts)

## 🤝 Component Imports

### Barrel Exports (Recommended)
```typescript
import { SignInScreen, Button } from '@/components/auth';
import { HomeScreen, ProductCard } from '@/components/app';
```

### Direct Imports
```typescript
import { SignInScreen } from '@/app/auth/signin';
import { HomeScreen } from '@/app/screens/home';
import { Button } from '@/components/auth/Button';
```

## 💡 Tips

1. Use `React.memo()` for ProductCard in FlatList
2. Implement pagination for large lists
3. Cache images with `expo-image`
4. Use AsyncStorage for persist cart data
5. Implement error boundaries for safety
6. Add loading states with skeleton screens
7. Test on actual devices for performance

## 🐛 Troubleshooting

**Images not showing?**
- Verify path: `/assets/images/filename.png`
- Use relative import: `require('@/assets/images/file')`

**Map not rendering?**
- Get Google Maps API key
- Configure in app.json
- Use correct initialRegion

**Performance issues?**
- Use FlatList for long lists
- Memoize components
- Implement pagination
- Optimize images

## 📞 Support

For detailed component usage, see:
- `components/auth/README.md` - Auth component docs
- `app/screens/README.md` - Screen component docs
- Example flows in `example-flow.tsx` files

---

**Version**: 1.0.0  
**Last Updated**: January 2026  
**Framework**: React Native + Expo  
**Language**: TypeScript
