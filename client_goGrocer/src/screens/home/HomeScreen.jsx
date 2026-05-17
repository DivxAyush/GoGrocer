import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, TYPOGRAPHY } from '../../theme';

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.locationContainer}>
            <Text style={styles.locationTitle}>Store opens at 7 AM</Text>
            <Text style={styles.locationSubtitle}>Shiva Main Road, Ashok Kunj, Shyamali...</Text>
          </View>
          <TouchableOpacity style={styles.profileIcon}>
            <Text style={{color: COLORS.textLight, fontSize: 16}}>A</Text>
          </TouchableOpacity>
        </View>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput 
            style={styles.searchInput}
            placeholder="Search for 'Milk'"
            placeholderTextColor={COLORS.textSecondary}
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Categories Row */}
        <View style={styles.categoriesRow}>
          {['All', 'Summer', 'Deals', 'Fresh', 'Rice'].map((item, index) => (
            <TouchableOpacity key={index} style={styles.categoryItem}>
              <View style={styles.categoryCircle}></View>
              <Text style={styles.categoryText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Promo Banner */}
        <View style={styles.promoBanner}>
          <Text style={styles.promoTitle}>Shop for ₹999 & Get</Text>
          <Text style={styles.promoHighlight}>₹50 FREE</Text>
          <Text style={styles.promoSubtitle}>JUST FOR YOU!</Text>
          <View style={styles.promoBadge}>
            <Text style={styles.promoBadgeText}>₹0 FEES</Text>
          </View>
        </View>

        {/* Handpicked Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Handpicked for You 💖</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All {'>'}</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
           {/* Dummy Product Cards */}
           {[1, 2, 3].map((item) => (
             <View key={item} style={styles.productCard}>
               <View style={styles.productImage}></View>
               <Text style={styles.productName}>White Crystal Sugar</Text>
               <Text style={styles.productWeight}>1 kg</Text>
               <View style={styles.priceRow}>
                 <Text style={styles.price}>₹49</Text>
                 <Text style={styles.oldPrice}>₹55</Text>
               </View>
               <TouchableOpacity style={styles.addButton}>
                 <Text style={styles.addButtonText}>ADD</Text>
               </TouchableOpacity>
             </View>
           ))}
        </ScrollView>

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
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingTop: 10,
  },
  locationContainer: {
    flex: 1,
  },
  locationTitle: {
    color: COLORS.textLight,
    fontSize: 16,
    fontWeight: 'bold',
  },
  locationSubtitle: {
    color: COLORS.textLight,
    fontSize: 12,
    opacity: 0.8,
  },
  profileIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  categoriesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: COLORS.background,
  },
  categoryItem: {
    alignItems: 'center',
  },
  categoryCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.inputBg,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  promoBanner: {
    margin: 16,
    padding: 20,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 16,
    alignItems: 'center',
  },
  promoTitle: {
    color: COLORS.textLight,
    fontSize: 14,
  },
  promoHighlight: {
    color: COLORS.secondary,
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  promoSubtitle: {
    color: COLORS.textLight,
    fontSize: 12,
    marginBottom: 12,
  },
  promoBadge: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  promoBadgeText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  viewAllText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  horizontalScroll: {
    paddingLeft: 16,
    paddingBottom: 20,
  },
  productCard: {
    width: 140,
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 12,
    marginRight: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  productImage: {
    width: '100%',
    height: 100,
    backgroundColor: COLORS.inputBg,
    borderRadius: 8,
    marginBottom: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  productWeight: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginRight: 6,
  },
  oldPrice: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textDecorationLine: 'line-through',
  },
  addButton: {
    backgroundColor: COLORS.primaryLight,
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: 'center',
  },
  addButtonText: {
    color: COLORS.textLight,
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default HomeScreen;
