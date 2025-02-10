const { validationResult, check } = require('express-validator');

exports.validateSignup = [
  check('name').trim().notEmpty().withMessage('Name is required'),
  check('userName').trim().notEmpty().withMessage('Username is required'),
  check('email').isEmail().withMessage('Invalid email address'),
  check('password')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .withMessage('Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character'),
  check('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  }),
];

exports.validateResults = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};