import React, { useEffect } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreenExpo from 'expo-splash-screen';
import { store, persistor } from './src/store';
import SplashScreen from './src/screens/auth/SplashScreen.jsx';
import OnboardingScreen from './src/screens/auth/OnboardingScreen.jsx';
import LoginScreen from './src/screens/auth/LoginScreen.jsx';
import OTPVerificationScreen from './src/screens/auth/OTPVerificationScreen.jsx';
import TabNavigator from './src/navigation/TabNavigator.jsx';
import SearchScreen from './src/screens/home/SearchScreen.jsx';
import CategoryListingScreen from './src/screens/product/CategoryListingScreen.jsx';
import ProductDetailsScreen from './src/screens/product/ProductDetailsScreen.jsx';
import CheckoutScreen from './src/screens/checkout/CheckoutScreen.jsx';
import PaymentScreen from './src/screens/checkout/PaymentScreen.jsx';
import PaymentSuccessScreen from './src/screens/checkout/PaymentSuccessScreen.jsx';
import UPIPaymentScreen from './src/screens/checkout/UPIPaymentScreen.jsx';
import LiveTrackingScreen from './src/screens/tracking/LiveTrackingScreen.jsx';
import OrderDetailsScreen from './src/screens/orders/OrderDetailsScreen.jsx';
import OffersScreen from './src/screens/profile/OffersScreen.jsx';
import StoreClosedScreen from './src/screens/home/StoreClosedScreen.jsx';
import GlobalToast from './src/components/GlobalToast.jsx';

// Keep expo splash hidden as soon as JS runs — we show our own SplashScreen
SplashScreenExpo.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
      <Stack.Screen name="HomeStack" component={TabNavigator} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="CategoryListing" component={CategoryListingScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="UPIPayment" component={UPIPaymentScreen} />
      <Stack.Screen name="PaymentSuccess" component={PaymentSuccessScreen} />
      <Stack.Screen name="LiveTracking" component={LiveTrackingScreen} />
      <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} />
      <Stack.Screen name="Offers" component={OffersScreen} />
      <Stack.Screen name="StoreClosed" component={StoreClosedScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  useEffect(() => {
    // Hide expo splash immediately when our app loads
    SplashScreenExpo.hideAsync();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
          <GlobalToast />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}
