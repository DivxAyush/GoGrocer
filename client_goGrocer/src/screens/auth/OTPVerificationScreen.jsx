import React, { useState, useEffect } from 'react';
import {
 View,
 Text,
 StyleSheet,
 TextInput,
 TouchableOpacity,
 KeyboardAvoidingView,
 Platform,
 Dimensions,
 StatusBar,
 ActivityIndicator,
} from 'react-native';
import Animated, { FadeInDown, FadeIn, ZoomIn } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingCart, Leaf, Shield, ArrowLeft } from 'lucide-react-native';
import { loginSuccess } from '../../store/slices/authSlice';
import { validateOTP } from '../../common/validation';
import { postProto } from '../../common/api';
import userDetailsProto from '../../../Protos/User/userDetails.proto';
import { showToast } from '../../components/GlobalToast';

const { width, height } = Dimensions.get('window');

const OTPVerificationScreen = ({ navigation, route }) => {
 const dispatch = useDispatch();
 const mobileNumber = useSelector((state) => state.auth.mobileNumber);
 const phone = route?.params?.phone || mobileNumber || '';

 const [otp, setOtp] = useState(['', '', '', '', '', '']);
 const [timer, setTimer] = useState(30);
 const [otpError, setOtpError] = useState('');
 const [isLoading, setIsLoading] = useState(false);

 // Timer countdown
 useEffect(() => {
  if (timer <= 0) return;
  const interval = setInterval(() => {
   setTimer((prev) => prev - 1);
  }, 1000);
  return () => clearInterval(interval);
 }, [timer]);

 // Auto-submit when all 6 digits entered
 useEffect(() => {
  if (otp.join('').length === 6 && !isLoading) {
   handleVerify();
  }
 }, [otp]);

 const handleOtpChange = (text) => {
  const clean = text.replace(/[^0-9]/g, '');
  const newOtp = ['', '', '', '', '', ''];
  for (let i = 0; i < Math.min(clean.length, 6); i++) {
   newOtp[i] = clean[i];
  }
  setOtp(newOtp);
  if (otpError) setOtpError('');
 };

 const handleResend = () => {
  if (timer > 0) return;
  setTimer(30);
  setOtp(['', '', '', '', '', '']);
  setOtpError('');
 };

 const handleVerify = async () => {
  const otpResult = validateOTP(otp);
  if (!otpResult.valid) {
   setOtpError(otpResult.message);
   return;
  }

  setIsLoading(true);
  try {
   const result = await postProto(
    'https://new.grahaak.com/api/RetailerApi/RT_RetailerApp_UserDetails/RetailerApp_UserDetails',
    { mobile: phone },
    userDetailsProto,
    'Retailer_V_1_0ControllerRequest',
    'Retailer_V_1_0ControllerRequestlist'
   );

   if (result?.data?.length > 0) {
    showToast({ type: 'success', message: 'OTP Verified Successfully!' });
    dispatch(loginSuccess(result.data[0]));
    setIsLoading(false);
    navigation.reset({ index: 0, routes: [{ name: 'HomeStack' }] });
   } else {
    setIsLoading(false);
    setOtp(['', '', '', '', '', '']);
    showToast({ type: 'error', message: 'Verification failed. Try again.' });
   }
  } catch (error) {
   setIsLoading(false);
   setOtp(['', '', '', '', '', '']);
   showToast({ type: 'error', message: 'Network error. Please try again.' });
  }
 };

 const formattedPhone = phone
  ? `+91 ${phone.slice(0, 5)} ${phone.slice(5)}`
  : '+91 XXXXX XXXXX';

 const filledCount = otp.join('').length;

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
     {/* ── Header ────────────────────────────────── */}
     <View style={styles.header}>
      <TouchableOpacity
       onPress={() => navigation.goBack()}
       style={styles.backBtn}
       activeOpacity={0.7}
      >
       <View style={styles.backCircle}>
        <ArrowLeft size={20} color="#FFFFFF" />
       </View>
      </TouchableOpacity>
     </View>

     <View style={styles.content}>
      {/* ── Logo ──────────────────────────────────── */}
      <Animated.View entering={FadeIn.duration(500)} style={styles.logoSection}>
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
      </Animated.View>

      {/* ── OTP Content ───────────────────────────── */}
      <Animated.View
       entering={FadeInDown.duration(600).delay(200)}
       style={styles.otpSection}
      >

       <Text style={styles.title}>OTP Verification</Text>
       <Text style={styles.subtitle}>
        Enter the 6-digit code sent to{'\n'}
        <Text style={styles.phoneHighlight}>{formattedPhone}</Text>
       </Text>

       {isLoading ? (
        <Animated.View entering={FadeIn.duration(300)} style={styles.loadingBox}>
         <ActivityIndicator size="large" color="#FFFFFF" />
         <Text style={styles.loadingText}>Verifying your OTP...</Text>
        </Animated.View>
       ) : (
        <>
         {/* Hidden input captures all digits */}
         <View style={styles.otpWrapper}>
          <TextInput
           style={styles.hiddenInput}
           value={otp.join('')}
           onChangeText={handleOtpChange}
           keyboardType="number-pad"
           maxLength={6}
           autoFocus={true}
           caretHidden={true}
           selectionColor="transparent"
          />

          {/* Visual OTP boxes */}
          <View style={styles.otpBoxRow} pointerEvents="none">
           {[0, 1, 2, 3, 4, 5].map((index) => {
            const digit = otp[index] || '';
            const isFilled = !!digit;
            const isActive = filledCount === index;

            return (
             <Animated.View
              key={index}
              style={[
               styles.otpBox,
               isFilled && styles.otpBoxFilled,
               isActive && styles.otpBoxActive,
               otpError && styles.otpBoxError,
              ]}
             >
              {digit ? (
               <Animated.Text
                entering={ZoomIn.duration(200)}
                style={styles.otpDigit}
               >
                {digit}
               </Animated.Text>
              ) : (
               <View style={[styles.otpDot, isActive && styles.otpDotActive]} />
              )}
             </Animated.View>
            );
           })}
          </View>
         </View>

         {otpError ? (
          <Animated.Text entering={FadeIn.duration(200)} style={styles.errorText}>
           ⚠ {otpError}
          </Animated.Text>
         ) : null}

         {/* Progress bar */}
         <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(filledCount / 6) * 100}%` }]} />
         </View>

         {/* Resend */}
         <View style={styles.resendRow}>
          {timer > 0 ? (
           <>
            <Text style={styles.resendText}>Resend OTP in </Text>
            <View style={styles.timerBadge}>
             <Text style={styles.timerText}>
              00:{timer < 10 ? `0${timer}` : timer}
             </Text>
            </View>
           </>
          ) : (
           <TouchableOpacity onPress={handleResend} activeOpacity={0.7}>
            <Text style={styles.resendLink}>Resend OTP</Text>
           </TouchableOpacity>
          )}
         </View>

        </>
       )}
      </Animated.View>
     </View>
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
  top: -width * 0.2,
  right: -width * 0.15,
 },
 bgCircle2: {
  position: 'absolute',
  width: width * 0.5,
  height: width * 0.5,
  borderRadius: width * 0.25,
  backgroundColor: 'rgba(255,255,255,0.04)',
  bottom: height * 0.15,
  left: -width * 0.1,
 },

 // Header
 header: {
  paddingHorizontal: 20,
  paddingTop: 10,
  paddingBottom: 8,
 },
 backBtn: {
  alignSelf: 'flex-start',
 },
 backCircle: {
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: 'rgba(255,255,255,0.2)',
  borderWidth: 1,
  borderColor: 'rgba(255,255,255,0.3)',
  justifyContent: 'center',
  alignItems: 'center',
 },

 content: {
  flex: 1,
  paddingHorizontal: 24,
 },

 // Logo
 logoSection: {
  alignItems: 'center',
  marginBottom: 24,
 },
 logoWrapper: {
  flexDirection: 'row',
  alignItems: 'flex-end',
 },
 logoGO: {
  fontSize: 46,
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
  fontSize: 46,
  fontWeight: '900',
  color: '#FFFFFF',
  letterSpacing: -1,
  textShadowColor: 'rgba(0,0,0,0.3)',
  textShadowOffset: { width: 2, height: 2 },
  textShadowRadius: 6,
 },
 cartIcon: {
  position: 'absolute',
  fontSize: 14,
  bottom: 4,
  right: -5,
 },
 leafIcon: {
  position: 'absolute',
  fontSize: 14,
  top: 1,
  right: -3,
 },
 logoGrocer: {
  fontSize: 20,
  fontWeight: '900',
  color: '#FFFFFF',
  letterSpacing: 4,
  marginTop: -4,
 },
 taglineRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 5,
  gap: 6,
 },
 taglineLine: {
  width: 20,
  height: 1.5,
  backgroundColor: 'rgba(255,255,255,0.6)',
 },
 tagline: {
  fontSize: 10,
  color: 'rgba(255,255,255,0.8)',
  fontWeight: '500',
 },

 // OTP section
 otpSection: {
  flex: 1,
  alignItems: 'center',
 },
 shieldContainer: {
  width: 60,
  height: 60,
  borderRadius: 30,
  backgroundColor: 'rgba(255,255,255,0.15)',
  borderWidth: 1.5,
  borderColor: 'rgba(255,255,255,0.3)',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 14,
 },
 shieldEmoji: {
  fontSize: 28,
 },
 title: {
  fontSize: 22,
  fontWeight: '800',
  color: '#FFFFFF',
  marginBottom: 8,
  textAlign: 'center',
 },
 subtitle: {
  fontSize: 13,
  color: 'rgba(255,255,255,0.75)',
  textAlign: 'center',
  lineHeight: 20,
  marginBottom: 28,
 },
 phoneHighlight: {
  fontWeight: '800',
  color: '#FFFFFF',
 },

 // OTP Boxes
 otpWrapper: {
  width: '100%',
  position: 'relative',
  marginBottom: 6,
 },
 hiddenInput: {
  ...StyleSheet.absoluteFillObject,
  opacity: 0,
  fontSize: 1,
  zIndex: 10,
 },
 otpBoxRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
 },
 otpBox: {
  width: (width - 48 - 60) / 6,
  height: 54,
  borderRadius: 14,
  backgroundColor: 'rgba(255,255,255,0.12)',
  borderWidth: 1.5,
  borderColor: 'rgba(255,255,255,0.25)',
  justifyContent: 'center',
  alignItems: 'center',
 },
 otpBoxFilled: {
  backgroundColor: 'rgba(255,255,255,0.25)',
  borderColor: '#FFFFFF',
  borderWidth: 2,
 },
 otpBoxActive: {
  borderColor: '#93C5FD',
  borderWidth: 2,
  backgroundColor: 'rgba(147,197,253,0.15)',
 },
 otpBoxError: {
  borderColor: '#FF6B6B',
  backgroundColor: 'rgba(255,107,107,0.1)',
 },
 otpDigit: {
  fontSize: 22,
  fontWeight: '800',
  color: '#FFFFFF',
 },
 otpDot: {
  width: 6,
  height: 6,
  borderRadius: 3,
  backgroundColor: 'rgba(255,255,255,0.3)',
 },
 otpDotActive: {
  backgroundColor: '#93C5FD',
 },
 errorText: {
  color: '#FFB3B3',
  fontSize: 12,
  marginBottom: 8,
  textAlign: 'center',
 },

 // Progress bar
 progressBar: {
  width: '100%',
  height: 3,
  backgroundColor: 'rgba(255,255,255,0.2)',
  borderRadius: 2,
  marginTop: 12,
  marginBottom: 16,
  overflow: 'hidden',
 },
 progressFill: {
  height: '100%',
  backgroundColor: '#93C5FD',
  borderRadius: 2,
 },

 // Resend
 resendRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 28,
 },
 resendText: {
  fontSize: 14,
  color: 'rgba(255,255,255,0.7)',
 },
 timerBadge: {
  backgroundColor: 'rgba(255,255,255,0.15)',
  paddingHorizontal: 10,
  paddingVertical: 3,
  borderRadius: 20,
  marginLeft: 4,
 },
 timerText: {
  fontSize: 13,
  fontWeight: '700',
  color: '#93C5FD',
 },
 resendLink: {
  fontSize: 14,
  fontWeight: '700',
  color: '#93C5FD',
  textDecorationLine: 'underline',
 },


 // Loading
 loadingBox: {
  alignItems: 'center',
  paddingVertical: 40,
  gap: 16,
 },
 loadingText: {
  fontSize: 15,
  color: 'rgba(255,255,255,0.85)',
  fontWeight: '500',
 },
});

export default OTPVerificationScreen;
