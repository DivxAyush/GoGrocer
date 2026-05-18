import React, { useState, useRef } from 'react';
import {
 View,
 Text,
 StyleSheet,
 TextInput,
 TouchableOpacity,
 KeyboardAvoidingView,
 Platform,
 ScrollView,
 ActivityIndicator,
 Image,
 Dimensions,
 StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { ShoppingCart, Leaf, Smartphone, User, ArrowRight } from 'lucide-react-native';
import { setMobileNumber } from '../../store/slices/authSlice';
import { validateMobileNumber } from '../../common/validation';
import { checkNetwork } from '../../common/network';

const { width, height } = Dimensions.get('window');

const RegisterScreen = ({ navigation }) => {
 const dispatch = useDispatch();

 const [fullName, setFullName] = useState('');
 const [phoneNumber, setPhoneNumber] = useState('');
 const [errors, setErrors] = useState({ name: '', phone: '' });
 const [isSubmitting, setIsSubmitting] = useState(false);

 const nameRef = useRef(null);
 const phoneRef = useRef(null);

 const handleNameChange = (text) => {
  setFullName(text);
  if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
 };

 const handlePhoneChange = (text) => {
  // If the user typed a single invalid character
  if (text.length === phoneNumber.length + 1 && /[^0-9]/.test(text)) {
   phoneRef.current?.setNativeProps({ text: phoneNumber });
   return;
  }

  const cleaned = text.replace(/[^0-9]/g, '');
  if (text !== cleaned) {
   phoneRef.current?.setNativeProps({ text: cleaned });
  }
  setPhoneNumber(cleaned);
  if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
 };

 const handleRegister = async () => {
  const isConnected = await checkNetwork();
  if (!isConnected) return;

  const isNameValid = fullName.trim().length >= 2;
  const phoneResult = validateMobileNumber(phoneNumber);

  if (!isNameValid || !phoneResult.valid) {
   setErrors({
    name: isNameValid ? '' : 'Full name must be at least 2 characters',
    phone: phoneResult.valid ? '' : phoneResult.message,
   });
   return;
  }

  setIsSubmitting(true);
  const cleanedPhone = phoneNumber.replace(/[\s\-]/g, '');
  dispatch(setMobileNumber(cleanedPhone));

  setTimeout(() => {
   setIsSubmitting(false);
   navigation.navigate('OTPVerification', { phone: cleanedPhone });
  }, 400);
 };

 return (
  <LinearGradient
   colors={['#2B5CE6', '#1A43BF', '#0D277A']}
   start={{ x: 0, y: 0 }}
   end={{ x: 0.3, y: 1 }}
   style={styles.container}
  >
   <StatusBar barStyle="light-content" backgroundColor="#1A43BF" />

   {/* Background circles */}
   <View style={styles.bgCircle1} />
   <View style={styles.bgCircle2} />

   <SafeAreaView style={{ flex: 1, width: '100%' }}>
    <KeyboardAvoidingView
     behavior={Platform.OS === 'ios' ? 'padding' : undefined}
     style={{ flex: 1 }}
    >
     <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
     >
      {/* ── Logo ──────────────────────────────────── */}
      <View style={styles.logoSection}>
       <View style={styles.logoWrapper}>
        <Text style={styles.logoGO}>G</Text>
        <View style={styles.logoOContainer}>
         <Text style={styles.logoO}>O</Text>
         <ShoppingCart size={16} color="#1A43BF" style={styles.cartIcon} />
         <Leaf size={16} color="#22C55E" style={styles.leafIcon} />
        </View>
       </View>
       <Text style={styles.logoGrocer}>GROCER</Text>
       <View style={styles.taglineRow}>
        <View style={styles.taglineLine} />
        <Text style={styles.tagline}>Your Daily Grocery Partner</Text>
        <View style={styles.taglineLine} />
       </View>
      </View>

      {/* ── Form Card ─────────────────────────────── */}
      <View style={styles.formCard}>
       {/* Welcome */}
       <Text style={styles.welcomeText}>Create Account</Text>
       <Text style={styles.welcomeSub}>Sign up to get started on GoGrocer</Text>

       {/* Full Name */}
       <View style={[styles.inputWrapper, errors.name ? styles.inputWrapperError : null]}>
        <User
         size={20}
         color="rgba(255,255,255,0.7)"
         style={styles.inputIcon}
        />
        <TextInput
         ref={nameRef}
         style={styles.input}
         placeholder="Full Name"
         placeholderTextColor="rgba(255,255,255,0.5)"
         value={fullName}
         onChangeText={handleNameChange}
         returnKeyType="next"
         onSubmitEditing={() => phoneRef.current?.focus()}
         selectionColor="#FFFFFF"
        />
       </View>
       {errors.name ? <Text style={styles.errorText}>⚠ {errors.name}</Text> : null}

       {/* Mobile Number */}
       <View style={[styles.inputWrapper, errors.phone ? styles.inputWrapperError : null, { marginTop: 14 }]}>
        <Smartphone
         size={20}
         color="rgba(255,255,255,0.7)"
         style={styles.inputIcon}
        />
        <Text style={styles.prefix}>+91</Text>
        <TextInput
         ref={phoneRef}
         style={styles.input}
         placeholder="Mobile Number"
         placeholderTextColor="rgba(255,255,255,0.5)"
         keyboardType="number-pad"
         value={phoneNumber}
         onChangeText={handlePhoneChange}
         maxLength={10}
         returnKeyType="done"
         onSubmitEditing={handleRegister}
         selectionColor="#FFFFFF"
        />
       </View>
       {errors.phone ? <Text style={styles.errorText}>⚠ {errors.phone}</Text> : null}

       {/* Register Button */}
       <TouchableOpacity
        style={[styles.loginBtn, { marginTop: 24 }, isSubmitting && { opacity: 0.8 }]}
        onPress={handleRegister}
        disabled={isSubmitting}
        activeOpacity={0.85}
       >
        <LinearGradient
         colors={['#4B70F5', '#2B5CE6']}
         start={{ x: 0, y: 0 }}
         end={{ x: 1, y: 0 }}
         style={styles.loginBtnGradient}
        >
         {isSubmitting ? (
          <ActivityIndicator color="#FFFFFF" size="small" />
         ) : (
          <>
           <Text style={styles.loginBtnText}>Register</Text>
           <View style={styles.loginArrowCircle}>
            <ArrowRight size={18} color="#1A43BF" />
           </View>
          </>
         )}
        </LinearGradient>
       </TouchableOpacity>

       {/* Login link */}
       <View style={styles.signupRow}>
        <Text style={styles.signupText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
         <Text style={styles.signupLink}>Login</Text>
        </TouchableOpacity>
       </View>
      </View>

      {/* ── Basket at bottom ──────────────────────── */}
      <View style={styles.basketContainer}>
       <Leaf size={24} color="#22C55E" style={styles.floatingLeafL} />
       <Leaf size={20} color="#4ADE80" style={styles.floatingLeafR} />
       <Image
        source={require('../../../assets/basket-illustration.png')}
        style={styles.basketImage}
        resizeMode="contain"
       />
      </View>
     </ScrollView>
    </KeyboardAvoidingView>
   </SafeAreaView>
  </LinearGradient>
 );
};

const styles = StyleSheet.create({
 container: {
  flex: 1,
 },
 bgCircle1: {
  position: 'absolute',
  width: width * 0.7,
  height: width * 0.7,
  borderRadius: width * 0.35,
  backgroundColor: 'rgba(255,255,255,0.05)',
  top: -width * 0.25,
  right: -width * 0.15,
 },
 bgCircle2: {
  position: 'absolute',
  width: width * 0.5,
  height: width * 0.5,
  borderRadius: width * 0.25,
  backgroundColor: 'rgba(255,255,255,0.04)',
  bottom: height * 0.1,
  left: -width * 0.15,
 },
 scrollContainer: {
  flexGrow: 1,
  alignItems: 'center',
  paddingHorizontal: 20,
  paddingBottom: 20,
 },

 // Logo
 logoSection: {
  alignItems: 'center',
  marginTop: 16,
  marginBottom: 20,
 },
 logoWrapper: {
  flexDirection: 'row',
  alignItems: 'flex-end',
 },
 logoGO: {
  fontSize: 54,
  fontWeight: '900',
  color: '#FFFFFF',
  letterSpacing: -1,
  textShadowColor: 'rgba(0,0,0,0.3)',
  textShadowOffset: { width: 2, height: 2 },
  textShadowRadius: 6,
 },
 logoOContainer: {
  position: 'relative',
  justifyContent: 'center',
  alignItems: 'center',
 },
 logoO: {
  fontSize: 54,
  fontWeight: '900',
  color: '#FFFFFF',
  letterSpacing: -1,
  textShadowColor: 'rgba(0,0,0,0.3)',
  textShadowOffset: { width: 2, height: 2 },
  textShadowRadius: 6,
 },
 cartIcon: {
  position: 'absolute',
  fontSize: 16,
  bottom: 5,
  right: -6,
 },
 leafIcon: {
  position: 'absolute',
  fontSize: 16,
  top: 1,
  right: -3,
 },
 logoGrocer: {
  fontSize: 24,
  fontWeight: '900',
  color: '#FFFFFF',
  letterSpacing: 5,
  marginTop: -6,
  textShadowColor: 'rgba(0,0,0,0.3)',
  textShadowOffset: { width: 1, height: 1 },
  textShadowRadius: 4,
 },
 taglineRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 6,
  gap: 6,
 },
 taglineLine: {
  width: 24,
  height: 1.5,
  backgroundColor: 'rgba(255,255,255,0.6)',
 },
 tagline: {
  fontSize: 11,
  color: 'rgba(255,255,255,0.85)',
  fontWeight: '500',
  letterSpacing: 0.3,
 },

 // Form card (transparent, just layout)
 formCard: {
  width: '100%',
 },
 welcomeText: {
  fontSize: 22,
  fontWeight: '800',
  color: '#FFFFFF',
  marginBottom: 4,
 },
 welcomeSub: {
  fontSize: 13,
  color: 'rgba(255,255,255,0.75)',
  marginBottom: 22,
 },

 // Inputs
 inputWrapper: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: 'rgba(255,255,255,0.15)',
  borderRadius: 14,
  paddingHorizontal: 14,
  height: 54,
  borderWidth: 1,
  borderColor: 'rgba(255,255,255,0.25)',
 },
 inputWrapperError: {
  borderColor: '#FF6B6B',
  borderWidth: 1.5,
 },
 inputIcon: {
  marginRight: 8,
 },
 prefix: {
  fontSize: 14,
  color: '#FFFFFF',
  fontWeight: '600',
  marginRight: 8,
  paddingRight: 8,
  borderRightWidth: 1,
  borderRightColor: 'rgba(255,255,255,0.3)',
 },
 input: {
  flex: 1,
  fontSize: 15,
  color: '#FFFFFF',
  paddingVertical: 0,
 },
 errorText: {
  color: '#FFB3B3',
  fontSize: 12,
  marginTop: 5,
  marginLeft: 4,
 },

 // Login button
 loginBtn: {
  borderRadius: 14,
  overflow: 'hidden',
  elevation: 4,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 8,
  marginBottom: 20,
 },
 loginBtnGradient: {
  height: 54,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: 20,
  gap: 10,
 },
 loginBtnText: {
  fontSize: 17,
  fontWeight: '700',
  color: '#FFFFFF',
  letterSpacing: 0.5,
 },
 loginArrowCircle: {
  width: 30,
  height: 30,
  borderRadius: 15,
  backgroundColor: '#FFFFFF',
  justifyContent: 'center',
  alignItems: 'center',
 },

 // Sign up
 signupRow: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 10,
 },
 signupText: {
  fontSize: 14,
  color: 'rgba(255,255,255,0.75)',
 },
 signupLink: {
  fontSize: 14,
  color: '#93C5FD',
  fontWeight: '700',
 },

 // Basket
 basketContainer: {
  width: '100%',
  alignItems: 'center',
  marginTop: 10,
  position: 'relative',
 },
 basketImage: {
  width: width * 0.78,
  height: height * 0.22,
 },
 floatingLeafL: {
  position: 'absolute',
  fontSize: 24,
  left: 10,
  top: 20,
  transform: [{ rotate: '-30deg' }],
  zIndex: 1,
 },
 floatingLeafR: {
  position: 'absolute',
  fontSize: 20,
  right: 10,
  top: 10,
  transform: [{ rotate: '25deg' }],
  zIndex: 1,
 },
});

export default RegisterScreen;
