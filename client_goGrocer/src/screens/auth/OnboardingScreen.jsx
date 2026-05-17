import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, TYPOGRAPHY } from '../../theme';

const { width, height } = Dimensions.get('window');

const OnboardingScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    navigation.replace('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.skipButton} onPress={handleNext}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <View style={styles.illustrationContainer}>
        {/* Placeholder for the basket illustration */}
        <View style={styles.basketPlaceholder}>
          <Text style={{color: COLORS.textSecondary}}>[Basket Illustration]</Text>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Fresh Groceries{'\n'}Delivered Fast</Text>
        <Text style={styles.subtitle}>
          Your favorite groceries at your{'\n'}doorstep in minutes.
        </Text>

        <View style={styles.dotsContainer}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  skipButton: {
    alignSelf: 'flex-end',
    padding: 20,
  },
  skipText: {
    color: COLORS.primary,
    fontFamily: TYPOGRAPHY.fonts.medium,
    fontSize: TYPOGRAPHY.sizes.md,
  },
  illustrationContainer: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  basketPlaceholder: {
    width: width * 0.7,
    height: width * 0.7,
    backgroundColor: COLORS.inputBg,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  title: {
    fontFamily: TYPOGRAPHY.fonts.headingBold,
    fontSize: 28,
    color: COLORS.primary,
    textAlign: 'center',
    lineHeight: 36,
    fontWeight: 'bold', // Fallback
  },
  subtitle: {
    fontFamily: TYPOGRAPHY.fonts.regular,
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 15,
    lineHeight: 22,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 40,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: COLORS.primary,
    width: 24,
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextButtonText: {
    color: COLORS.textLight,
    fontFamily: TYPOGRAPHY.fonts.semiBold,
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: '600', // Fallback
  },
});

export default OnboardingScreen;
