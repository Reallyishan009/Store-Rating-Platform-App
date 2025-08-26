const express = require('express');
const { register, login, getMe, updatePassword } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');
const { validate, registerSchema, loginSchema, passwordUpdateSchema } = require('../middlewares/validationMiddleware');

const router = express.Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.get('/me', protect, getMe);
router.put('/password', protect, validate(passwordUpdateSchema), updatePassword);

module.exports = router;