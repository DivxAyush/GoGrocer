import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, TYPOGRAPHY } from '../../theme';

const UPIPaymentScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePay = () => {
    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      navigation.replace('PaymentSuccess');
    }, 2000);
  };

  const upiApps = [
    { id: 'gpay', name: 'Google Pay', icon: '💎' },
    { id: 'phonepe', name: 'PhonePe', icon: '📱' },
    { id: 'paytm', name: 'Paytm', icon: '💰' },
    { id: 'amazon', name: 'Amazon Pay', icon: '📦' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>UPI Payment</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.amountCard}>
          <Text style={styles.amountLabel}>Amount to Pay</Text>
          <Text style={styles.amountValue}>₹1,249.00</Text>
        </View>

        <Text style={styles.sectionTitle}>Select UPI App</Text>
        
        {upiApps.map((app) => (
          <TouchableOpacity 
            key={app.id} 
            style={styles.upiItem}
            onPress={handlePay}
            disabled={loading}
          >
            <View style={styles.upiIconContainer}>
              <Text style={styles.upiIconText}>{app.icon}</Text>
            </View>
            <Text style={styles.upiName}>{app.name}</Text>
            <Text style={styles.chevron}>{'>'}</Text>
          </TouchableOpacity>
        ))}

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.divider} />
        </View>

        <TouchableOpacity style={styles.upiIdContainer}>
          <Text style={styles.upiIdLabel}>Enter UPI ID / VPA</Text>
          <View style={styles.upiIdInputPlaceholder}>
            <Text style={styles.upiIdText}>example@upi</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.payButton, loading && styles.payButtonDisabled]}
          onPress={handlePay}
          disabled={loading}
        >
          <Text style={styles.payButtonText}>
            {loading ? 'Processing...' : 'Verify & Pay'}
          </Text>
        </TouchableOpacity>

        <View style={styles.securityNote}>
          <Text style={styles.securityText}>🔒 100% Secure Payments</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    fontSize: 24,
    color: COLORS.textPrimary,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: TYPOGRAPHY.fonts.semiBold,
    color: COLORS.textPrimary,
  },
  content: {
    padding: 20,
  },
  amountCard: {
    backgroundColor: COLORS.primaryLight,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 30,
  },
  amountLabel: {
    color: COLORS.textLight,
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 8,
  },
  amountValue: {
    color: COLORS.textLight,
    fontSize: 32,
    fontFamily: TYPOGRAPHY.fonts.headingBold,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: TYPOGRAPHY.fonts.semiBold,
    color: COLORS.textPrimary,
    marginBottom: 16,
  },
  upiItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundLight,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  upiIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  upiIconText: {
    fontSize: 20,
  },
  upiName: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textPrimary,
    fontFamily: TYPOGRAPHY.fonts.medium,
  },
  chevron: {
    color: COLORS.textSecondary,
    fontSize: 18,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    paddingHorizontal: 12,
    color: COLORS.textSecondary,
    fontSize: 12,
    fontFamily: TYPOGRAPHY.fonts.medium,
  },
  upiIdContainer: {
    backgroundColor: COLORS.backgroundLight,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 30,
  },
  upiIdLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  upiIdInputPlaceholder: {
    height: 24,
    justifyContent: 'center',
  },
  upiIdText: {
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  payButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  payButtonDisabled: {
    opacity: 0.6,
  },
  payButtonText: {
    color: COLORS.textLight,
    fontSize: 16,
    fontFamily: TYPOGRAPHY.fonts.semiBold,
    fontWeight: 'bold',
  },
  securityNote: {
    alignItems: 'center',
    marginTop: 20,
  },
  securityText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
});

export default UPIPaymentScreen;
