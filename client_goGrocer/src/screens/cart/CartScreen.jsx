import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { COLORS } from '../../theme';
import { PRODUCTS_CATALOG } from '../../data/products';
import { incrementItem, decrementItem } from '../../store/slices/cartSlice';

const { width } = Dimensions.get('window');

const CartScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items || {});

  // Build items list dynamically based on global state
  const CART_ITEMS = PRODUCTS_CATALOG.filter(product => cart[product.id] > 0).map(product => ({
    ...product,
    qty: cart[product.id]
  }));

  const itemTotal = CART_ITEMS.reduce((sum, item) => sum + item.price * item.qty, 0);
  const savings = CART_ITEMS.reduce((sum, item) => sum + (item.oldPrice ? (item.oldPrice - item.price) * item.qty : 0), 0);
  const deliveryFee = itemTotal > 0 ? 20 : 0;
  const toPay = itemTotal + deliveryFee;

  if (CART_ITEMS.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Cart</Text>
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>🛒</Text>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySubtitle}>Add items to start shopping!</Text>
          <TouchableOpacity 
            style={styles.startShoppingBtn} 
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.startShoppingBtnText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Cart</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Items List */}
        <View style={styles.section}>
          <Text style={styles.itemsCount}>{CART_ITEMS.length} Item{CART_ITEMS.length > 1 ? 's' : ''}</Text>
          
          {CART_ITEMS.map((item, index) => (
            <View key={item.id} style={styles.cartItem}>
              <View style={[styles.itemImage, { backgroundColor: item.color, justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ fontSize: 24 }}>{item.emoji}</Text>
              </View>
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemWeight}>{item.weight}</Text>
                <View style={styles.priceRow}>
                  <Text style={styles.itemPrice}>₹{item.price}</Text>
                  {item.oldPrice && <Text style={styles.itemOldPrice}>₹{item.oldPrice}</Text>}
                </View>
              </View>
              <View style={styles.qtyControl}>
                <TouchableOpacity style={styles.qtyBtn} onPress={() => dispatch(decrementItem(item.id))}>
                  <Text style={styles.qtyBtnText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.qtyText}>{item.qty}</Text>
                <TouchableOpacity style={styles.qtyBtn} onPress={() => dispatch(incrementItem(item.id))}>
                  <Text style={styles.qtyBtnText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Coupon Section */}
        <View style={styles.couponSection}>
          <Text style={styles.couponText}>Apply Coupon</Text>
          <TouchableOpacity>
            <Text style={styles.applyText}>APPLY</Text>
          </TouchableOpacity>
        </View>

        {/* Order Summary */}
        <View style={styles.summarySection}>
          {savings > 0 && (
            <Text style={styles.savingsText}>You saved ₹{savings} on this order</Text>
          )}
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Item Total</Text>
            <Text style={styles.summaryValue}>₹{itemTotal}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee</Text>
            <Text style={styles.summaryValue}>₹{deliveryFee}</Text>
          </View>
          
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>To Pay</Text>
            <Text style={styles.totalValue}>₹{toPay}</Text>
          </View>
        </View>

      </ScrollView>

      {/* Checkout Bar */}
      <View style={styles.checkoutBar}>
        <View style={styles.checkoutPriceInfo}>
          <Text style={styles.checkoutTotalLabel}>To Pay</Text>
          <Text style={styles.checkoutTotalValue}>₹{toPay}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton} onPress={() => navigation.navigate('Checkout')}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
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
    paddingBottom: 100,
  },
  section: {
    backgroundColor: COLORS.background,
    padding: 16,
    marginBottom: 8,
  },
  itemsCount: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 16,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  itemImage: {
    width: 60,
    height: 60,
    backgroundColor: COLORS.inputBg,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  itemWeight: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginRight: 8,
  },
  itemOldPrice: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textDecorationLine: 'line-through',
  },
  qtyControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  qtyBtn: {
    paddingHorizontal: 8,
  },
  qtyBtnText: {
    color: COLORS.textLight,
    fontSize: 16,
    fontWeight: 'bold',
  },
  qtyText: {
    color: COLORS.textLight,
    fontSize: 14,
    fontWeight: 'bold',
    marginHorizontal: 8,
  },
  couponSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: 16,
    marginBottom: 8,
  },
  couponText: {
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  applyText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primaryLight,
  },
  summarySection: {
    backgroundColor: COLORS.background,
    padding: 16,
  },
  savingsText: {
    fontSize: 12,
    color: COLORS.success,
    marginBottom: 16,
    fontWeight: '500',
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
  checkoutBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.background,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  checkoutPriceInfo: {
    flex: 1,
  },
  checkoutTotalLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  checkoutTotalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  checkoutButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  checkoutButtonText: {
    color: COLORS.textLight,
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    backgroundColor: COLORS.background,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 24,
    textAlign: 'center',
  },
  startShoppingBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  startShoppingBtnText: {
    color: COLORS.textLight,
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default CartScreen;
