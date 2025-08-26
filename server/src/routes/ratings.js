const express = require('express');
const {
  submitRating,
  getUserRatingForStore,
  getStoreRatings,
  getAllRatings,
  deleteRating
} = require('../controllers/ratingController');
const { protect, authorize } = require('../middlewares/authMiddleware');
const { validate, ratingSchema } = require('../middlewares/validationMiddleware');

const router = express.Router();

router.use(protect); // All routes are protected

router
  .route('/')
  .get(authorize('admin'), getAllRatings)
  .post(validate(ratingSchema), submitRating);

router.get('/store/:storeId', getUserRatingForStore);
router.get('/store/:storeId/all', authorize('admin', 'store_owner'), getStoreRatings);

router.delete('/:id', deleteRating);

module.exports = router;