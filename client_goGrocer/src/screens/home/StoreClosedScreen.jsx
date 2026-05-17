import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Moon } from 'lucide-react-native';
import { COLORS } from '../../theme';

const StoreClosedScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[COLORS.primaryLight, COLORS.primary, COLORS.primaryDark]}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <Moon size={48} color="#FFFFFF" style={styles.moonIcon} />

          <View style={styles.storeIllustrationContainer}>
            {/* Store Illustration Placeholder */}
            <View style={styles.storePlaceholder}>
              <Text style={{ color: COLORS.primary, fontWeight: 'bold' }}>GO GROCER</Text>
            </View>
          </View>

          <Text style={styles.title}>Store Opens at 7 AM</Text>
          <Text style={styles.subtitle}>
            We are closed right now.{'\n'}You can place your order after
          </Text>

          {/* Countdown Timer */}
          <View style={styles.timerContainer}>
            <View style={styles.timerBlock}>
              <Text style={styles.timerValue}>07</Text>
              <Text style={styles.timerLabel}>Hours</Text>
            </View>
            <Text style={styles.timerColon}>:</Text>
            <View style={styles.timerBlock}>
              <Text style={styles.timerValue}>53</Text>
              <Text style={styles.timerLabel}>Mins</Text>
            </View>
            <Text style={styles.timerColon}>:</Text>
            <View style={styles.timerBlock}>
              <Text style={styles.timerValue}>21</Text>
              <Text style={styles.timerLabel}>Secs</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.notifyButton}>
            <Text style={styles.notifyButtonText}>Notify Me</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>Back To Home</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryDark,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  moonIcon: {
    fontSize: 60,
    marginBottom: 40,
  },
  storeIllustrationContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  storePlaceholder: {
    width: 200,
    height: 150,
    backgroundColor: COLORS.backgroundLight,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#4B70F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textLight,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  timerBlock: {
    alignItems: 'center',
    width: 60,
  },
  timerValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.textLight,
  },
  timerLabel: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 4,
  },
  timerColon: {
    fontSize: 24,
    color: COLORS.textLight,
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginTop: -15,
  },
  notifyButton: {
    backgroundColor: COLORS.background,
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  notifyButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    paddingVertical: 12,
  },
  backButtonText: {
    color: COLORS.textLight,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default StoreClosedScreen;
