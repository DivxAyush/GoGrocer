export const validateMobileNumber = (mobile) => {
  if (!mobile || !mobile.trim()) return { valid: false, message: 'Mobile number is required' };
  const cleaned = mobile.replace(/[\s\-]/g, '');
  if (!/^\d{10}$/.test(cleaned)) return { valid: false, message: 'Mobile number must be 10 digits' };
  return { valid: true, message: '' };
};

export const validatePassword = (password) => {
  if (!password || !password.trim()) return { valid: false, message: 'Password is required' };
  if (password.length < 4) return { valid: false, message: 'Password must be at least 4 characters' };
  return { valid: true, message: '' };
};

export const checkPassword = (password, expected = '1234') => {
  if (password !== expected) return { valid: false, message: 'Invalid password' };
  return { valid: true, message: '' };
};

export const validateOTP = (otp, length = 4) => {
  const otpStr = Array.isArray(otp) ? otp.join('') : otp;
  if (!otpStr || !otpStr.trim()) return { valid: false, message: 'Please enter OTP' };
  if (otpStr.length !== length || !/^\d+$/.test(otpStr)) return { valid: false, message: `OTP must be ${length} digits` };
  return { valid: true, message: '' };
};

export const isEmpty = (val) => !val || val.toString().trim().length === 0;

export const validateEmail = (email) => {
  if (!email || !email.trim()) return { valid: false, message: 'Email is required' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { valid: false, message: 'Invalid email' };
  return { valid: true, message: '' };
};

export const runValidations = (validators) => {
  for (let fn of validators) {
    let res = fn();
    if (!res.valid) return res;
  }
  return { valid: true, message: '' };
};
