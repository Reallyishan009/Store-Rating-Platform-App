const express = require('express');
const { User, Store, Rating } = require('../models');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(protect);

// @desc    Get admin dashboard stats
// @route   GET /api/dashboard/admin
// @access  Private/Admin
router.get('/admin', authorize('admin'), async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalStores = await Store.count();
    const totalRatings = await Rating.count();

    const recentUsers = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']],
      limit: 5
    });

    const recentStores = await Store.findAll({
      order: [['createdAt', 'DESC']],
      limit: 5
    });

    const recentRatings = await Rating.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name']
        },
        {
          model: Store,
          as: 'store',
          attributes: ['name']
        }
      ],
      order: [['createdAt', 'DESC']],
      limit: 5
    });

    res.json({
      success: true,
      data: {
        stats: {
          totalUsers,
          totalStores,
          totalRatings
        },
        recent: {
          users: recentUsers,
          stores: recentStores,
          ratings: recentRatings
        }
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Get store owner dashboard stats
// @route   GET /api/dashboard/store-owner
// @access  Private/Store Owner
router.get('/store-owner', authorize('store_owner'), async (req, res) => {
  try {
    const store = await Store.findOne({
      where: { ownerId: req.user.id },
      include: [{
        model: Rating,
        as: 'ratings',
        include: [{
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email']
        }]
      }]
    });

    if (!store) {
      return res.status(404).json({
        success: false,
        message: 'Store not found'
      });
    }

    res.json({
      success: true,
      data: {
        store: {
          id: store.id,
          name: store.name,
          averageRating: store.averageRating,
          totalRatings: store.totalRatings
        },
        ratings: store.ratings
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;