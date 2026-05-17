import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../theme';

const CheckoutScreen = ({ navigation }) => {
  const [selectedPayment, setSelectedPayment] = useState('upi');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
      </View>

      {/* Progress Bar (Address -> Payment -> Place Order) */}
      <View style={styles.progressContainer}>
        <View style={styles.stepContainer}>
          <View style={[styles.stepCircle, styles.stepActive]}><Text style={styles.stepTextActive}>1</Text></View>
          <Text style={styles.stepLabelActive}>Address</Text>
        </View>
        <View style={styles.progressLine} />
        <View style={styles.stepContainer}>
          <View style={styles.stepCircle}><Text style={styles.stepText}>2</Text></View>
          <Text style={styles.stepLabel}>Payment</Text>
        </View>
        <View style={styles.progressLine} />
        <View style={styles.stepContainer}>
          <View style={styles.stepCircle}><Text style={styles.stepText}>3</Text></View>
          <Text style={styles.stepLabel}>Place Order</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Delivery Address Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Deliver to Home</Text>
            <TouchableOpacity><Text style={styles.changeText}>Change</Text></TouchableOpacity>
          </View>
          <Text style={styles.addressText}>Shiva Main Road, Ashok Kunj, Shyamali Colony, Ranchi</Text>
        </View>

        {/* Delivery Slot Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Delivery Slot</Text>
            <TouchableOpacity><Text style={styles.changeText}>Change</Text></TouchableOpacity>
          </View>
          <Text style={styles.slotText}>Today, 7 AM - 9 AM</Text>
        </View>

        {/* Payment Methods Section (Preview) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Methods</Text>
          
          <TouchableOpacity 
            style={styles.paymentOptionRow}
            onPress={() => setSelectedPayment('upi')}
          >
            <View style={styles.paymentIconContainer}><Text>💳</Text></View>
            <Text style={styles.paymentOptionText}>UPI / Cards / Wallets</Text>
            <View style={[styles.radioCircle, selectedPayment === 'upi' && styles.radioActive]}>
              {selectedPayment === 'upi' && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.paymentOptionRow}
            onPress={() => setSelectedPayment('cod')}
          >
            <View style={styles.paymentIconContainer}><Text>💵</Text></View>
            <Text style={styles.paymentOptionText}>Cash on Delivery</Text>
            <View style={[styles.radioCircle, selectedPayment === 'cod' && styles.radioActive]}>
              {selectedPayment === 'cod' && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>
        </View>

        {/* Order Summary Preview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.summaryItemRow}>
            <Text style={styles.summaryItemName}>Amul Fresh Paneer 200g</Text>
            <Text style={styles.summaryItemPrice}>₹88</Text>
          </View>
          <View style={styles.summaryItemRow}>
            <Text style={styles.summaryItemName}>Steam Katarni Loose Rice 1 kg</Text>
            <Text style={styles.summaryItemPrice}>₹53</Text>
          </View>
          <View style={styles.summaryItemRow}>
            <Text style={styles.summaryItemName}>Tata Salt - 1kg</Text>
            <Text style={styles.summaryItemPrice}>₹29</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Item Total</Text>
            <Text style={styles.summaryValue}>₹170</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee</Text>
            <Text style={styles.summaryValue}>₹20</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>To Pay</Text>
            <Text style={styles.totalValue}>₹190</Text>
          </View>
        </View>

      </ScrollView>

      {/* Continue to Payment Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.secureContainer}>
          <Text style={styles.secureIcon}>🔒</Text>
          <Text style={styles.secureText}>Secure & Encrypted Payments</Text>
        </View>
        <TouchableOpacity 
          style={styles.continueButton} 
          onPress={() => navigation.navigate('Payment')}
        >
          <Text style={styles.continueButtonText}>Continue to Payment</Text>
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
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  stepContainer: {
    alignItems: 'center',
  },
  stepCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.inputBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  stepActive: {
    backgroundColor: COLORS.primary,
  },
  stepText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: 'bold',
  },
  stepTextActive: {
    fontSize: 12,
    color: COLORS.textLight,
    fontWeight: 'bold',
  },
  stepLabel: {
    fontSize: 10,
    color: COLORS.textSecondary,
  },
  stepLabelActive: {
    fontSize: 10,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  progressLine: {
    flex: 1,
    height: 2,
    backgroundColor: COLORS.inputBg,
    marginHorizontal: 8,
    marginTop: -16, // Align with circles
  },
  scrollContent: {
    paddingBottom: 120,
  },
  section: {
    backgroundColor: COLORS.background,
    padding: 16,
    marginBottom: 8,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  changeText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
  },
  addressText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  slotText: {
    fontSize: 14,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  paymentOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  paymentIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: COLORS.inputBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  paymentOptionText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textPrimary,
    fontWeight: '500',
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
  summaryItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryItemName: {
    fontSize: 12,
    color: COLORS.textSecondary,
    flex: 1,
  },
  summaryItemPrice: {
    fontSize: 12,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  summaryValue: {
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
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
  continueButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  continueButtonText: {
    color: COLORS.textLight,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CheckoutScreen;
