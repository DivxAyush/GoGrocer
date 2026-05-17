import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ShoppingCart, Leaf, Zap, CheckCircle2, ShieldCheck } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const basketAnim = useRef(new Animated.Value(60)).current;
  const basketOpacity = useRef(new Animated.Value(0)).current;
  const featureAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Logo fade in
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Basket slides up
      Animated.parallel([
        Animated.timing(basketAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(basketOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Features fade in
        Animated.timing(featureAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }).start();
      });
    });

    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2800);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient
      colors={['#2B5CE6', '#1A43BF', '#0D277A']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.3, y: 1 }}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="#1A43BF" />

      {/* Background decorative circles */}
      <View style={styles.bgCircle1} />
      <View style={styles.bgCircle2} />

      {/* ── Logo Section ─────────────────────────────── */}
      <Animated.View
        style={[
          styles.logoSection,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        {/* GO GROCER Logo */}
        <View style={styles.logoWrapper}>
          <Text style={styles.logoGO}>G</Text>
          <View style={styles.logoOContainer}>
            <Text style={styles.logoO}>O</Text>
            {/* Cart icon inside O */}
            <ShoppingCart size={22} color="#1A43BF" style={styles.cartIcon} />
            {/* Leaf on top */}
            <Leaf size={22} color="#22C55E" style={styles.leafIcon} />
          </View>
        </View>
        <Text style={styles.logoGrocer}>GROCER</Text>
        <View style={styles.taglineRow}>
          <View style={styles.taglineLine} />
          <Text style={styles.tagline}>Your Daily Grocery Partner</Text>
          <View style={styles.taglineLine} />
        </View>
      </Animated.View>

      {/* ── Basket Illustration ──────────────────────── */}
      <Animated.View
        style={[
          styles.basketSection,
          {
            opacity: basketOpacity,
            transform: [{ translateY: basketAnim }],
          },
        ]}
      >
        <Image
          source={require('../../../assets/basket-illustration.png')}
          style={styles.basketImage}
          resizeMode="contain"
        />
        {/* Floating leaves */}
        <Leaf size={28} color="#22C55E" style={styles.leafFloat1} />
        <Leaf size={22} color="#4ADE80" style={styles.leafFloat2} />
        <Leaf size={18} color="#22C55E" style={styles.leafFloat3} />
      </Animated.View>

      {/* ── Feature Strip ────────────────────────────── */}
      <Animated.View style={[styles.featuresRow, { opacity: featureAnim }]}>
        <View style={styles.featureItem}>
          <View style={styles.featureIconCircle}>
            <Zap size={20} color="#FFFFFF" />
          </View>
          <Text style={styles.featureTitle}>Fast Delivery</Text>
          <Text style={styles.featureSub}>Lightning fast{'\n'}delivery</Text>
        </View>
        <View style={styles.featureDivider} />
        <View style={styles.featureItem}>
          <View style={styles.featureIconCircle}>
            <CheckCircle2 size={20} color="#FFFFFF" />
          </View>
          <Text style={styles.featureTitle}>Best Quality</Text>
          <Text style={styles.featureSub}>Top quality{'\n'}products</Text>
        </View>
        <View style={styles.featureDivider} />
        <View style={styles.featureItem}>
          <View style={styles.featureIconCircle}>
            <ShieldCheck size={20} color="#FFFFFF" />
          </View>
          <Text style={styles.featureTitle}>Safe & Secure</Text>
          <Text style={styles.featureSub}>100% safe{'\n'}payments</Text>
        </View>
      </Animated.View>

      {/* Bottom indicator */}
      <View style={styles.bottomBar} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
  },
  bgCircle1: {
    position: 'absolute',
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: width * 0.35,
    backgroundColor: 'rgba(255,255,255,0.04)',
    top: -width * 0.2,
    right: -width * 0.15,
  },
  bgCircle2: {
    position: 'absolute',
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: width * 0.25,
    backgroundColor: 'rgba(255,255,255,0.04)',
    bottom: height * 0.15,
    left: -width * 0.1,
  },

  // Logo
  logoSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  logoWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  logoGO: {
    fontSize: 72,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -2,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
  },
  logoOContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoO: {
    fontSize: 72,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -2,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
  },
  cartIcon: {
    position: 'absolute',
    fontSize: 22,
    bottom: 6,
    right: -8,
  },
  leafIcon: {
    position: 'absolute',
    fontSize: 22,
    top: 0,
    right: -4,
  },
  logoGrocer: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 6,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 4,
    marginTop: -8,
  },
  taglineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 8,
  },
  taglineLine: {
    width: 30,
    height: 1.5,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  tagline: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '500',
    letterSpacing: 0.5,
  },

  // Basket
  basketSection: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginTop: 10,
  },
  basketImage: {
    width: width * 0.82,
    height: height * 0.36,
  },
  leafFloat1: {
    position: 'absolute',
    fontSize: 28,
    top: '10%',
    left: '8%',
    transform: [{ rotate: '-20deg' }],
  },
  leafFloat2: {
    position: 'absolute',
    fontSize: 22,
    top: '5%',
    right: '10%',
    transform: [{ rotate: '30deg' }],
  },
  leafFloat3: {
    position: 'absolute',
    fontSize: 18,
    bottom: '15%',
    right: '5%',
    transform: [{ rotate: '10deg' }],
  },

  // Features
  featuresRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
    width: '100%',
  },
  featureItem: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  featureIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.5)',
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureIconText: {
    fontSize: 20,
  },
  featureTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  featureSub: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    lineHeight: 14,
  },
  featureDivider: {
    width: 1,
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginHorizontal: 4,
  },

  bottomBar: {
    width: 120,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginTop: 12,
    marginBottom: 6,
  },
});

export default SplashScreen;
