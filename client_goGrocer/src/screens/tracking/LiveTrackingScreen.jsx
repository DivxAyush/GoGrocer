import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../theme';

const { height } = Dimensions.get('window');

const LiveTrackingScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order #GG1234567890</Text>
      </View>

      {/* Map Placeholder */}
      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <Text style={{color: COLORS.textSecondary}}>Map View (react-native-maps)</Text>
          
          {/* Dummy route graphics */}
          <View style={styles.dummyRoute} />
          <View style={styles.dummyMarkerStart} />
          <View style={styles.dummyMarkerEnd} />
          
          <View style={styles.etaBadge}>
            <Text style={styles.etaText}>12 mins away</Text>
          </View>
        </View>
      </View>

      {/* Bottom Sheet UI */}
      <View style={styles.bottomSheet}>
        <Text style={styles.arrivalText}>Arriving in 12 mins</Text>
        
        {/* Status Timeline */}
        <View style={styles.timelineContainer}>
          <View style={styles.timelineItem}>
            <View style={[styles.timelineDot, styles.timelineDotActive]} />
            <Text style={styles.timelineLabel}>Confirmed</Text>
          </View>
          <View style={styles.timelineLineActive} />
          
          <View style={styles.timelineItem}>
            <View style={[styles.timelineDot, styles.timelineDotActive]} />
            <Text style={styles.timelineLabel}>Packed</Text>
          </View>
          <View style={styles.timelineLineActive} />
          
          <View style={styles.timelineItem}>
            <View style={[styles.timelineDot, styles.timelineDotActive, styles.timelineDotCurrent]} />
            <Text style={[styles.timelineLabel, styles.timelineLabelCurrent]}>On the way</Text>
          </View>
          <View style={styles.timelineLineInactive} />
          
          <View style={styles.timelineItem}>
            <View style={styles.timelineDotInactive} />
            <Text style={styles.timelineLabelInactive}>Delivered</Text>
          </View>
        </View>

        {/* Rider Info Card */}
        <View style={styles.riderCard}>
          <View style={styles.riderImagePlaceholder}><Text>🏍️</Text></View>
          <View style={styles.riderInfo}>
            <Text style={styles.riderName}>Aman Kumar</Text>
            <View style={styles.riderRatingRow}>
              <Text style={styles.starIcon}>★</Text>
              <Text style={styles.riderRating}>4.8</Text>
              <Text style={styles.riderVehicle}> • MH01 AB 1234</Text>
            </View>
          </View>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionBtn}><Text>📞</Text></TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}><Text>💬</Text></TouchableOpacity>
          </View>
        </View>
        
        <TouchableOpacity style={styles.detailsButton} onPress={() => navigation.navigate('OrderDetails')}>
          <Text style={styles.detailsButtonText}>View Order Details</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.primary,
    zIndex: 10,
  },
  backButton: {
    marginRight: 16,
  },
  backIcon: {
    fontSize: 24,
    color: COLORS.textLight,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textLight,
  },
  mapContainer: {
    flex: 1,
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: COLORS.inputBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dummyRoute: {
    position: 'absolute',
    width: 2,
    height: 150,
    backgroundColor: COLORS.primaryLight,
    transform: [{ rotate: '45deg'}],
  },
  dummyMarkerStart: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    top: '40%',
    left: '40%',
  },
  dummyMarkerEnd: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.success,
    bottom: '40%',
    right: '40%',
  },
  etaBadge: {
    position: 'absolute',
    top: 20,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  etaText: {
    color: COLORS.textLight,
    fontWeight: 'bold',
    fontSize: 14,
  },
  bottomSheet: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 20,
    marginTop: -20, // Overlap map
  },
  arrivalText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 24,
  },
  timelineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  timelineItem: {
    alignItems: 'center',
    width: 60,
  },
  timelineDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  timelineDotActive: {
    backgroundColor: COLORS.primary,
  },
  timelineDotInactive: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.border,
    marginBottom: 8,
  },
  timelineDotCurrent: {
    borderWidth: 4,
    borderColor: COLORS.primaryLight,
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  timelineLabel: {
    fontSize: 10,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  timelineLabelCurrent: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  timelineLabelInactive: {
    fontSize: 10,
    color: COLORS.textSecondary,
  },
  timelineLineActive: {
    flex: 1,
    height: 2,
    backgroundColor: COLORS.primary,
    marginHorizontal: 4,
    marginTop: -20,
  },
  timelineLineInactive: {
    flex: 1,
    height: 2,
    backgroundColor: COLORS.border,
    marginHorizontal: 4,
    marginTop: -20,
  },
  riderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundLight,
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
  },
  riderImagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.inputBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  riderInfo: {
    flex: 1,
  },
  riderName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  riderRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    fontSize: 12,
    color: COLORS.warning,
    marginRight: 4,
  },
  riderRating: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  riderVehicle: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  actionButtons: {
    flexDirection: 'row',
  },
  actionBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailsButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  detailsButtonText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default LiveTrackingScreen;
