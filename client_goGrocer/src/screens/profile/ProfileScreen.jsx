import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { ArrowDownToLine, ShoppingCart, Coins, ChevronRight } from 'lucide-react-native';
import { COLORS } from '../../theme';
import { logout } from '../../store/slices/authSlice';

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileImage}><Text style={{fontSize: 24, color: COLORS.textLight}}>A</Text></View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Ayush</Text>
            <Text style={styles.profilePhone}>+91 12345 67890</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Wallet Balance Card */}
        <View style={styles.walletCard}>
          <Text style={styles.walletLabel}>Wallet Balance</Text>
          <View style={styles.walletBalanceRow}>
            <Text style={styles.walletAmount}>₹245.00</Text>
            <TouchableOpacity style={styles.addMoneyBtn}>
              <Text style={styles.addMoneyText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Transaction History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Transaction History</Text>
          
          <View style={styles.transactionRow}>
            <View style={styles.transactionIconContainer}>
              <ArrowDownToLine size={20} color={COLORS.success} />
            </View>
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionTitle}>Added Money</Text>
              <Text style={styles.transactionDate}>16 May 2026</Text>
            </View>
            <Text style={styles.transactionAmountPos}>+₹200</Text>
          </View>

          <View style={styles.transactionRow}>
            <View style={styles.transactionIconContainer}>
              <ShoppingCart size={20} color={COLORS.primary} />
            </View>
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionTitle}>Order Payment</Text>
              <Text style={styles.transactionDate}>15 May 2026</Text>
            </View>
            <Text style={styles.transactionAmountNeg}>-₹150</Text>
          </View>

          <View style={styles.transactionRow}>
            <View style={styles.transactionIconContainer}>
              <Coins size={20} color="#F59E0B" />
            </View>
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionTitle}>Cashback</Text>
              <Text style={styles.transactionDate}>12 May 2026</Text>
            </View>
            <Text style={styles.transactionAmountPos}>+₹35</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {['My Orders', 'Saved Addresses', 'Offers & Coupons', 'Notifications', 'Settings', 'Help & Support'].map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <Text style={styles.menuItemText}>{item}</Text>
              <ChevronRight size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
          ))}
          
          <TouchableOpacity style={[styles.menuItem, { borderBottomWidth: 0, marginTop: 20 }]} onPress={handleLogout}>
            <Text style={[styles.menuItemText, { color: COLORS.error }]}>Log Out</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  header: {
    padding: 16,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.background,
    marginBottom: 8,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  profilePhone: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  editButton: {
    padding: 8,
  },
  editText: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  walletCard: {
    margin: 16,
    padding: 24,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
  },
  walletLabel: {
    color: COLORS.textLight,
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 8,
  },
  walletBalanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  walletAmount: {
    color: COLORS.textLight,
    fontSize: 32,
    fontWeight: 'bold',
  },
  addMoneyBtn: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addMoneyText: {
    color: COLORS.textLight,
    fontSize: 24,
    marginTop: -2,
  },
  section: {
    backgroundColor: COLORS.background,
    padding: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 16,
  },
  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  transactionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: COLORS.inputBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 14,
    color: COLORS.textPrimary,
    fontWeight: '500',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  transactionAmountPos: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.success,
  },
  transactionAmountNeg: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.error,
  },
  menuSection: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuItemText: {
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  menuItemArrow: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
});

export default ProfileScreen;
