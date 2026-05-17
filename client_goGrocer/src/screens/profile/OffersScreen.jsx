import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../theme';

const { width } = Dimensions.get('window');

const OFFERS = [
  { id: '1', title: 'Flat ₹50 OFF', desc: 'On minimum order of ₹299', code: 'WELCOME50', color: '#6366F1' },
  { id: '2', title: 'Flat 20% OFF', desc: 'On Fruits & Vegetables', code: 'FRESH20', color: '#10B981' },
  { id: '3', title: 'Flat 15% OFF', desc: 'On Grocery items', code: 'GROCERY15', color: '#3B82F6' },
];

const OffersScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Offers for you</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.tabsContainer}>
          <TouchableOpacity style={[styles.tab, styles.tabActive]}>
            <Text style={styles.tabTextActive}>Coupons</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Bank Offers</Text>
          </TouchableOpacity>
        </View>

        {OFFERS.map((offer) => (
          <View key={offer.id} style={styles.offerCard}>
            <View style={[styles.offerCardLeft, { backgroundColor: offer.color }]}>
              <Text style={styles.offerTitle}>{offer.title}</Text>
              <Text style={styles.offerDesc}>{offer.desc}</Text>
              <View style={styles.offerCodeContainer}>
                <Text style={styles.offerCodeText}>{offer.code}</Text>
              </View>
            </View>
            <View style={styles.offerCardRight}>
              <View style={styles.offerImagePlaceholder}></View>
              <TouchableOpacity style={styles.applyBtn}>
                <Text style={styles.applyBtnText}>APPLY</Text>
              </TouchableOpacity>
            </View>
            {/* Cutout effects */}
            <View style={styles.cutoutTop} />
            <View style={styles.cutoutBottom} />
          </View>
        ))}

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
    padding: 16,
    paddingBottom: 40,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: COLORS.inputBg,
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  tabActive: {
    backgroundColor: COLORS.background,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  tabTextActive: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  offerCard: {
    flexDirection: 'row',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: COLORS.background,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  offerCardLeft: {
    flex: 2,
    padding: 20,
    justifyContent: 'center',
  },
  offerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.textLight,
    marginBottom: 8,
  },
  offerDesc: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 16,
  },
  offerCodeContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    borderStyle: 'dashed',
  },
  offerCodeText: {
    color: COLORS.textLight,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  offerCardRight: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderLeftWidth: 1,
    borderLeftColor: COLORS.inputBg,
    borderStyle: 'dashed',
  },
  offerImagePlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: COLORS.inputBg,
    borderRadius: 30,
    marginBottom: 10,
  },
  applyBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primaryLight,
  },
  applyBtnText: {
    color: COLORS.textLight,
    fontWeight: 'bold',
    fontSize: 12,
  },
  cutoutTop: {
    position: 'absolute',
    top: -10,
    right: '31%',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.backgroundLight,
  },
  cutoutBottom: {
    position: 'absolute',
    bottom: -10,
    right: '31%',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.backgroundLight,
  },
});

export default OffersScreen;
