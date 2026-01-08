# Authentication Components Documentation

This directory contains a complete, reusable authentication flow system for the Dessert Wala app. All components are built with React Native, TypeScript, and Expo.

## Directory Structure

```
components/auth/          # Reusable UI components
├── TextInput.tsx        # Standard text input with validation
├── PasswordInput.tsx    # Password input with visibility toggle
├── Button.tsx           # Multi-variant button component
├── SocialButton.tsx     # Social login buttons (Google, Apple)
├── OTPInput.tsx         # 6-digit OTP input component
├── AuthLayout.tsx       # Layout wrapper for auth screens
├── AuthHeader.tsx       # Header with title and subtitle
├── AuthLink.tsx         # Navigation links and back buttons
├── Divider.tsx          # Visual divider with text
└── index.ts            # Barrel export file

app/auth/                 # Complete authentication screens
├── welcome.tsx          # Welcome/splash screen
├── signin.tsx           # Sign in screen
├── signup.tsx           # Sign up screen
├── forgot-password.tsx  # Password reset request
├── otp-verification.tsx # OTP verification
├── set-new-password.tsx # New password creation
└── example-flow.tsx     # Example implementation

constants/
├── colors.ts           # App-wide color palette
├── spacing.ts          # Spacing and border radius values
└── typography.ts       # Font sizes, weights, line heights
```

## Color Palette

The app uses a cohesive color system defined in `constants/colors.ts`:

- **Primary**: `#B8651B` (Brown/Orange)
- **Background**: Cream `#F9F7F2`
- **Text**: Dark brown `#1A1A1A`
- **Error**: Red `#F44336`
- **Border**: Light `#E0DDD8`

## Component Usage

### TextInput

Standard text input with optional label and error messages.

```tsx
import { TextInput } from '@/components/auth';

<TextInput
  label="Your Email"
  placeholder="Enter your email"
  value={email}
  onChangeText={setEmail}
  keyboardType="email-address"
  error={errors.email}
/>
```

### PasswordInput

Password input with show/hide toggle and validation.

```tsx
import { PasswordInput } from '@/components/auth';

<PasswordInput
  label="Password"
  placeholder="Enter your password"
  value={password}
  onChangeText={setPassword}
  error={errors.password}
/>
```

### Button

Versatile button with multiple variants and sizes.

```tsx
import { Button } from '@/components/auth';

// Primary button
<Button
  title="Sign In"
  onPress={handleSignIn}
  loading={isLoading}
  disabled={isLoading}
/>

// Secondary button
<Button
  title="Cancel"
  variant="secondary"
  size="medium"
  onPress={handleCancel}
/>
```

**Variants**: `primary`, `secondary`, `tertiary`
**Sizes**: `small`, `medium`, `large`

### OTPInput

6-digit OTP input with auto-focus and paste support.

```tsx
import { OTPInput } from '@/components/auth';

<OTPInput
  value={otp}
  onChangeText={setOtp}
  length={6}
  error={error}
/>
```

Features:
- Auto-focus next input on digit entry
- Paste support (pastes multiple digits)
- Backspace navigation
- Only accepts digits

### SocialButton

Rounded button for social login (Google, Apple).

```tsx
import { SocialButton } from '@/components/auth';

<SocialButton
  icon={require('@/assets/images/icon.png')}
  onPress={handleGoogleSignIn}
/>
```

### AuthLayout

Wrapper component that provides consistent padding and safe area handling.

```tsx
import { AuthLayout } from '@/components/auth';

<AuthLayout scrollable={true}>
  {/* Your content */}
</AuthLayout>
```

### AuthHeader

Title and subtitle for auth screens.

```tsx
import { AuthHeader } from '@/components/auth';

<AuthHeader
  title="Welcome Back!"
  subtitle="Let's get your cravings delivered."
/>
```

### AuthLink

Navigation links and back buttons.

```tsx
import { AuthLink } from '@/components/auth';

// Text with link
<AuthLink
  text="Don't have an account?"
  linkText="Create One"
  onPress={() => navigate('signup')}
/>

// Back button
<AuthLink
  text=""
  linkText="Go Back"
  onPress={() => navigate('previous')}
  variant="back"
/>
```

### Divider

Visual divider with optional text.

```tsx
import { Divider } from '@/components/auth';

<Divider text="or continue with" />
```

## Complete Screens

### WelcomeScreen

Entry point with three options: Sign In, Create Account, Explore as Guest.

```tsx
import { WelcomeScreen } from '@/components/auth';

<WelcomeScreen
  onSignIn={() => navigate('signin')}
  onSignUp={() => navigate('signup')}
  onExploreAsGuest={() => navigate('home')}
/>
```

### SignInScreen

Email/password login with remember me option and social login.

```tsx
import { SignInScreen } from '@/components/auth';

<SignInScreen
  onSignUp={() => navigate('signup')}
  onForgotPassword={() => navigate('forgot-password')}
  onExploreAsGuest={() => navigate('home')}
/>
```

### SignUpScreen

User registration with validation.

```tsx
import { SignUpScreen } from '@/components/auth';

<SignUpScreen
  onSignIn={() => navigate('signin')}
/>
```

### ForgotPasswordScreen

Email input for password reset.

```tsx
import { ForgotPasswordScreen } from '@/components/auth';

<ForgotPasswordScreen
  onBack={() => navigate('signin')}
  onContinue={(email) => navigate('otp', { email })}
/>
```

### OTPVerificationScreen

6-digit OTP verification with timer and resend.

```tsx
import { OTPVerificationScreen } from '@/components/auth';

<OTPVerificationScreen
  email={email}
  screenType="email-verification"
  onVerify={(otp) => handleVerification(otp)}
  onResend={() => resendOTP()}
  onBack={() => navigate('previous')}
/>
```

### SetNewPasswordScreen

New password creation with validation.

```tsx
import { SetNewPasswordScreen } from '@/components/auth';

<SetNewPasswordScreen
  onBack={() => navigate('signin')}
  onConfirm={(password) => resetPassword(password)}
/>
```

## Validation

All input components support built-in error messages:

```tsx
<TextInput
  value={email}
  onChangeText={setEmail}
  error={errors.email} // Displays error message if present
/>
```

The screens include basic validation:
- **Email**: Format validation
- **Password**: Minimum 8 characters
- **Confirm Password**: Must match password
- **OTP**: Must be 6 digits

## Theming

All components use the color system from `constants/colors.ts`. To customize colors:

1. Update `AppColors` in `constants/colors.ts`
2. All components will automatically use the new theme

## Typography

Font sizes and weights are defined in `constants/typography.ts`:

```tsx
import { FontSizes, FontWeights } from '@/constants/typography';

// Available sizes
FontSizes.xs, xs, sm, md, lg, xl, xxl, xxxl, huge

// Available weights
FontWeights.light, regular, medium, semibold, bold, extrabold
```

## Spacing

Consistent spacing throughout the app:

```tsx
import { Spacing, BorderRadius } from '@/constants/spacing';

// Spacing sizes
Spacing.xs, sm, md, lg, xl, xxl, xxxl, huge

// Border radius
BorderRadius.sm, md, lg, xl, round
```

## Accessibility

- All interactive elements are Pressable components
- Touch targets meet minimum size requirements (44x44 minimum)
- Color contrast meets WCAG standards
- Error messages clearly indicate validation issues

## Example Implementation

See `app/auth/example-flow.tsx` for a complete authentication flow implementation showing how to wire up all screens and handle navigation between them.

## Best Practices

1. **Always validate input** before submission
2. **Show loading states** during API calls
3. **Handle errors gracefully** with user-friendly messages
4. **Use AuthLayout** for consistent styling
5. **Import from barrel file** (`@/components/auth`) for cleaner imports
6. **Leverage TypeScript** for type safety in screen props

## License

Part of Dessert Wala App
