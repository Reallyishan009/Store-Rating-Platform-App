const express = require('express');
const {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/userController');
const { protect, authorize } = require('../middlewares/authMiddleware');
const { validate, registerSchema } = require('../middlewares/validationMiddleware');

const router = express.Router();

router.use(protect); // All routes are protected

router
  .route('/')
  .get(authorize('admin'), getUsers)
  .post(authorize('admin'), validate(registerSchema), createUser);

router
  .route('/:id')
  .get(authorize('admin'), getUserById)
  .put(authorize('admin'), updateUser)
  .delete(authorize('admin'), deleteUser);

module.exports = router;