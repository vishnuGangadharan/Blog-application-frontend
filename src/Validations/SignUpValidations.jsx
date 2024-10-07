import * as Yup from 'yup';


export const signupValidationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required('Name is required'),

  email: Yup.string()
    .trim()
    .email('Invalid email address')
    .required('Email is required'),

  phone: Yup.string()
    .trim()
    .matches(
      /^(\+\d{1,3}[- ]?)?\d{10}$/,
      'Phone number must be 10 digits '
    )
    .required('Phone number is required'),

  password: Yup.string()
    .trim()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),

  confirmPassword: Yup.string()
    .trim()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});
