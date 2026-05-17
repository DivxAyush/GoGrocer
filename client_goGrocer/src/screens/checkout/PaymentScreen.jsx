import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../theme';

const PAYMENT_METHODS = [
  { id: 'upi', title: 'UPI', icon: '📱', recommended: true },
  { id: 'cards', title: 'Credit / Debit Cards', icon: '💳' },
  { id: 'netbanking', title: 'Net Banking', icon: '🏦' },
  { id: 'wallets', title: 'Wallets', icon: '👛' },
  { id: 'cod', title: 'Cash on Delivery', icon: '💵' },
];

const PaymentScreen = ({ navigation }) => {
  const [selectedMethod, setSelectedMethod] = useState('upi');

  const handlePayment = () => {
    if (selectedMethod === 'upi') {
      navigation.navigate('UPIPayment');
    } else {
      navigation.replace('PaymentSuccess');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Amount Payable */}
        <View style={styles.amountSection}>
          <Text style={styles.amountLabel}>Amount Payable</Text>
          <Text style={styles.amountValue}>₹190</Text>
        </View>

        {/* Recommended Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended</Text>
          <TouchableOpacity 
            style={styles.paymentMethodRow}
            onPress={() => setSelectedMethod('upi')}
          >
            <View style={styles.methodIconContainer}>
              <Text>📱</Text>
            </View>
            <View style={styles.methodInfo}>
              <Text style={styles.methodTitle}>UPI</Text>
              <Text style={styles.methodSubtitle}>Pay using any UPI App</Text>
            </View>
            <View style={[styles.radioCircle, selectedMethod === 'upi' && styles.radioActive]}>
              {selectedMethod === 'upi' && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>
        </View>

        {/* All Payment Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Methods</Text>
          
          {PAYMENT_METHODS.filter(m => !m.recommended).map((method) => (
            <TouchableOpacity 
              key={method.id}
              style={styles.paymentMethodRow}
              onPress={() => setSelectedMethod(method.id)}
            >
              <View style={styles.methodIconContainer}>
                <Text>{method.icon}</Text>
              </View>
              <View style={styles.methodInfo}>
                <Text style={styles.methodTitle}>{method.title}</Text>
              </View>
              <View style={[styles.radioCircle, selectedMethod === method.id && styles.radioActive]}>
                {selectedMethod === method.id && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>

      {/* Pay Button Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.secureContainer}>
          <Text style={styles.secureIcon}>🔒</Text>
          <Text style={styles.secureText}>Secure & Encrypted Payments</Text>
        </View>
        <TouchableOpacity 
          style={styles.payButton} 
          onPress={handlePayment}
        >
          <Text style={styles.payButtonText}>Pay ₹190</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    marginRight: 16,
  },
  backIcon: {
    fontSize: 24,
    color: COLORS.textPrimary,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  amountSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.background,
    marginBottom: 8,
  },
  amountLabel: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  amountValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  section: {
    backgroundColor: COLORS.background,
    padding: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 16,
    fontWeight: '500',
  },
  paymentMethodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  methodIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: COLORS.inputBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  methodInfo: {
    flex: 1,
  },
  methodTitle: {
    fontSize: 16,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  methodSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.textSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioActive: {
    borderColor: COLORS.primary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.background,
    padding: 16,
    paddingBottom: 24, // Extra for iOS home indicator
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  secureContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  secureIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  secureText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  payButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  payButtonText: {
    color: COLORS.textLight,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PaymentScreen;
