import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  runOnJS,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../theme';

export let showToast = () => {};

const GlobalToast = () => {
  const insets = useSafeAreaInsets();
  const [toastConfig, setToastConfig] = useState({ type: 'info', message: '' });
  
  const translateY = useSharedValue(150); 
  const opacity = useSharedValue(0);

  showToast = (config) => {
    setToastConfig(config);
    opacity.value = withTiming(1, { duration: 300 });
    translateY.value = withSequence(
      withTiming(0, { duration: 300 }), // Smooth slide up
      withDelay(
        2000, // Show for exactly 2 seconds
        withTiming(150, { duration: 300 }, () => {
          runOnJS(setToastConfig)({ type: 'info', message: '' });
        }) // Smooth slide down
      )
    );
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      opacity: opacity.value,
    };
  });

  if (!toastConfig.message) return null;

  const backgroundColor = 
    toastConfig.type === 'success' ? '#10B981' : // Modern green
    toastConfig.type === 'error' ? '#EF4444' :   // Modern red
    toastConfig.type === 'warning' ? '#F59E0B' : // Modern orange
    '#374151'; // Compact dark info

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.container,
        animatedStyle,
        { 
          backgroundColor, 
          bottom: insets.bottom > 0 ? insets.bottom + 10 : 30 
        }
      ]}
    >
      <Text style={styles.text}>{toastConfig.message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30, // Compact pill shape
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    zIndex: 9999,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.3,
  }
});

export default GlobalToast;
