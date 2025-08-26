const express = require('express');
const {
  getStores,
  createStore,
  getStoreById,
  updateStore,
  deleteStore,
  getStoresForUser
} = require('../controllers/storeController');
const { protect, authorize } = require('../middlewares/authMiddleware');
const { validate, storeSchema } = require('../middlewares/validationMiddleware');

const router = express.Router();

router.use(protect); // All routes are protected

router.get('/user', getStoresForUser); // Must be before /:id route

router
  .route('/')
  .get(getStores)
  .post(authorize('admin'), validate(storeSchema), createStore);

router
  .route('/:id')
  .get(getStoreById)
  .put(authorize('admin'), updateStore)
  .delete(authorize('admin'), deleteStore);

module.exports = router;