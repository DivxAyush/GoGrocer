import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../theme';

// Dummy Data
const CATEGORIES = [
  { id: '1', title: 'Fresh Vegetables' },
  { id: '2', title: 'Leafy Vegetables' },
  { id: '3', title: 'Tomato, Onion & Potato' },
  { id: '4', title: 'Cucumber & Capsicum' },
  { id: '5', title: 'Brinjal & Ladies Finger' },
];

const CategoryListingScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.categoryRow}>
      <View style={styles.iconPlaceholder}></View>
      <Text style={styles.categoryTitle}>{item.title}</Text>
      <Text style={styles.arrowIcon}>{'>'}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Fresh Vegetables</Text>
      </View>

      <View style={styles.contentRow}>
        {/* Left Sidebar (Category Types) */}
        <View style={styles.sidebar}>
          {['Vegetables', 'Fruits', 'Dairy', 'Bakery'].map((cat, idx) => (
            <TouchableOpacity 
              key={idx} 
              style={[styles.sidebarItem, idx === 0 && styles.sidebarItemActive]}
            >
              <View style={styles.sidebarIconPlaceholder}></View>
              <Text style={[styles.sidebarText, idx === 0 && styles.sidebarTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Right Content Area (Subcategories List) */}
        <View style={styles.mainContent}>
          <FlatList
            data={CATEGORIES}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
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
  contentRow: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 80,
    backgroundColor: COLORS.backgroundLight,
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
  },
  sidebarItem: {
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  sidebarItemActive: {
    backgroundColor: COLORS.background,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  sidebarIconPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.inputBg,
    marginBottom: 8,
  },
  sidebarText: {
    fontSize: 10,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  sidebarTextActive: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  mainContent: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    padding: 16,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  iconPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: COLORS.inputBg,
    marginRight: 16,
  },
  categoryTitle: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  arrowIcon: {
    fontSize: 18,
    color: COLORS.textSecondary,
  },
});

export default CategoryListingScreen;
