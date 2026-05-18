import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Keyboard, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { WifiOff } from 'lucide-react-native';

const { width } = Dimensions.get('window');

// Globally accessible trigger
export let showNetworkPopup = () => { };

const GlobalNetworkPopup = () => {
    const [visible, setVisible] = useState(false);
    const [onDismissCallback, setOnDismissCallback] = useState(null);

    // Expose trigger dynamically
    showNetworkPopup = (onDismiss) => {
        Keyboard.dismiss();
        setOnDismissCallback(() => onDismiss);
        setVisible(true);
    };

    const handleDismiss = () => {
        setVisible(false);
        if (onDismissCallback && typeof onDismissCallback === 'function') {
            onDismissCallback();
        }
    };

    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="fade"
            onRequestClose={handleDismiss}
        >
            <View style={styles.backdrop}>
                <View style={styles.container}>
                    <LinearGradient
                        colors={['#1E3A8A', '#0D1B2A']}
                        style={styles.card}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <View style={styles.iconContainer}>
                            <WifiOff size={40} color="#FF5252" />
                        </View>

                        <Text style={styles.title}>No Internet Connection</Text>
                        <Text style={styles.subtitle}>
                            Check your internet connection. Please turn on Wi-Fi or Mobile Data to continue.
                        </Text>

                        <TouchableOpacity
                            activeOpacity={0.85}
                            onPress={handleDismiss}
                            style={styles.button}
                        >
                            <LinearGradient
                                colors={['#4B70F5', '#2B5CE6']}
                                style={styles.gradient}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                            >
                                <Text style={styles.buttonText}>Okay</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: width * 0.85,
        borderRadius: 24,
        overflow: 'hidden',
        elevation: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.4,
        shadowRadius: 20,
    },
    card: {
        padding: 28,
        alignItems: 'center',
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255, 82, 82, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 21,
        fontWeight: '800',
        color: '#FFFFFF',
        marginBottom: 10,
        textAlign: 'center',
        letterSpacing: 0.3,
    },
    subtitle: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.75)',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 24,
        paddingHorizontal: 10,
    },
    button: {
        width: '100%',
        borderRadius: 14,
        overflow: 'hidden',
    },
    gradient: {
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
});

export default GlobalNetworkPopup;
