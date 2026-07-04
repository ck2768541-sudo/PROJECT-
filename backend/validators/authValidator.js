const { body, validationResult } = require("express-validator");

const signupValidator = [
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full Name is required"),

  body("email")
    .isEmail()
    .withMessage("Please enter a valid email"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

const loginValidator = [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email"),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),
];

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  next();
};

module.exports = {
  signupValidator,
  loginValidator,
  validateRequest,
};