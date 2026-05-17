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
import { ShoppingCart, Leaf, Smartphone, Lock, Eye, EyeOff, ArrowRight, Apple } from 'lucide-react-native';
import { setMobileNumber } from '../../store/slices/authSlice';
import { validateMobileNumber, validatePassword, checkPassword } from '../../common/validation';

const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
 const dispatch = useDispatch();

 const [phoneNumber, setPhoneNumber] = useState('');
 const [password, setPassword] = useState('');
 const [showPassword, setShowPassword] = useState(false);
 const [errors, setErrors] = useState({ phone: '', password: '' });
 const [isSubmitting, setIsSubmitting] = useState(false);

 const phoneRef = useRef(null);
 const passwordRef = useRef(null);

 const handlePhoneChange = (text) => {
  setPhoneNumber(text);
  if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
 };

 const handlePasswordChange = (text) => {
  setPassword(text);
  if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
 };

 const handleLogin = () => {
  const phoneResult = validateMobileNumber(phoneNumber);
  const pwdResult = validatePassword(password);

  if (!phoneResult.valid || !pwdResult.valid) {
   setErrors({
    phone: phoneResult.valid ? '' : phoneResult.message,
    password: pwdResult.valid ? '' : pwdResult.message,
   });
   return;
  }

  const pwdCheck = checkPassword(password);
  if (!pwdCheck.valid) {
   setErrors({ phone: '', password: pwdCheck.message });
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
       <Text style={styles.welcomeText}>Welcome Back</Text>
       <Text style={styles.welcomeSub}>Login to continue to your account</Text>

       {/* Mobile Number */}
       <View style={[styles.inputWrapper, errors.phone ? styles.inputWrapperError : null]}>
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
         keyboardType="phone-pad"
         value={phoneNumber}
         onChangeText={handlePhoneChange}
         maxLength={10}
         returnKeyType="next"
         onSubmitEditing={() => passwordRef.current?.focus()}
        />
       </View>
       {errors.phone ? <Text style={styles.errorText}>⚠ {errors.phone}</Text> : null}

       {/* Password */}
       <View style={[styles.inputWrapper, errors.password ? styles.inputWrapperError : null, { marginTop: 14 }]}>
        <Lock
         size={20}
         color="rgba(255,255,255,0.7)"
         style={styles.inputIcon}
        />
        <TextInput
         ref={passwordRef}
         style={[styles.input, { flex: 1 }]}
         placeholder="Password"
         placeholderTextColor="rgba(255,255,255,0.5)"
         secureTextEntry={!showPassword}
         value={password}
         onChangeText={handlePasswordChange}
         returnKeyType="done"
         onSubmitEditing={handleLogin}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
         {showPassword ? (
          <Eye size={20} color="rgba(255,255,255,0.7)" />
         ) : (
          <EyeOff size={20} color="rgba(255,255,255,0.7)" />
         )}
        </TouchableOpacity>
       </View>
       {errors.password ? <Text style={styles.errorText}>⚠ {errors.password}</Text> : null}

       {/* Forgot Password */}
       <TouchableOpacity style={styles.forgotBtn}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
       </TouchableOpacity>

       {/* Login Button */}
       <TouchableOpacity
        style={[styles.loginBtn, isSubmitting && { opacity: 0.8 }]}
        onPress={handleLogin}
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
           <Text style={styles.loginBtnText}>Login</Text>
           <View style={styles.loginArrowCircle}>
            <ArrowRight size={18} color="#1A43BF" />
           </View>
          </>
         )}
        </LinearGradient>
       </TouchableOpacity>

       {/* Divider */}
       <View style={styles.dividerRow}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>or continue with</Text>
        <View style={styles.divider} />
       </View>

       {/* Social Buttons */}
       <View style={styles.socialRow}>
        <TouchableOpacity style={styles.socialBtn} activeOpacity={0.8}>
         <Text style={styles.googleG}>G</Text>
         <Text style={styles.socialBtnText}>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.socialBtn, styles.appleBtnDark]} activeOpacity={0.8}>
         <Apple size={18} color="#FFFFFF" fill="#FFFFFF" />
         <Text style={[styles.socialBtnText, { color: '#FFFFFF' }]}>Apple</Text>
        </TouchableOpacity>
       </View>

       {/* Sign Up link */}
       <View style={styles.signupRow}>
        <Text style={styles.signupText}>Don't have an account? </Text>
        <TouchableOpacity>
         <Text style={styles.signupLink}>Sign Up</Text>
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
 eyeBtn: {
  padding: 4,
 },
 errorText: {
  color: '#FFB3B3',
  fontSize: 12,
  marginTop: 5,
  marginLeft: 4,
 },
 forgotBtn: {
  alignSelf: 'flex-end',
  marginTop: 10,
  marginBottom: 20,
 },
 forgotText: {
  color: '#93C5FD',
  fontSize: 13,
  fontWeight: '600',
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

 // Divider
 dividerRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 16,
  gap: 8,
 },
 divider: {
  flex: 1,
  height: 1,
  backgroundColor: 'rgba(255,255,255,0.25)',
 },
 dividerText: {
  fontSize: 12,
  color: 'rgba(255,255,255,0.65)',
 },

 // Social
 socialRow: {
  flexDirection: 'row',
  gap: 12,
  marginBottom: 20,
 },
 socialBtn: {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  height: 50,
  borderRadius: 14,
  backgroundColor: 'rgba(255,255,255,0.92)',
  borderWidth: 1,
  borderColor: 'rgba(255,255,255,0.4)',
 },
 appleBtnDark: {
  backgroundColor: '#1E1E1E',
  borderColor: 'rgba(255,255,255,0.2)',
 },
 googleG: {
  fontSize: 16,
  fontWeight: '900',
  color: '#4285F4',
 },
 socialBtnText: {
  fontSize: 14,
  fontWeight: '600',
  color: '#1E293B',
 },

 // Sign up
 signupRow: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
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

export default LoginScreen;
