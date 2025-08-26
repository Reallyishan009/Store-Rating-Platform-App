const { Rating, Store, User } = require('../models');
const { sequelize } = require('../config/db');

// @desc    Submit or update rating
// @route   POST /api/ratings
// @access  Private
const submitRating = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { storeId, rating } = req.body;
    const userId = req.user.id;

    // Check if store exists
    const store = await Store.findByPk(storeId);
    if (!store) {
      await transaction.rollback();
      return res.status(404).json({
        success: false,
        message: 'Store not found'
      });
    }

    // Check if user already rated this store
    let existingRating = await Rating.findOne({
      where: { userId, storeId }
    });

    if (existingRating) {
      // Update existing rating
      await existingRating.update({ rating }, { transaction });
    } else {
      // Create new rating
      await Rating.create({ userId, storeId, rating }, { transaction });
    }

    // Recalculate store's average rating
    const ratings = await Rating.findAll({
      where: { storeId },
      transaction
    });

    const totalRatings = ratings.length;
    const averageRating = ratings.reduce((sum, r) => sum + r.rating, 0) / totalRatings;

    await store.update({
      averageRating: Math.round(averageRating * 10) / 10,
      totalRatings
    }, { transaction });

    await transaction.commit();

    res.json({
      success: true,
      message: existingRating ? 'Rating updated successfully' : 'Rating submitted successfully',
      data: {
        rating: existingRating ? existingRating.rating : rating,
        storeAverageRating: Math.round(averageRating * 10) / 10
      }
    });
  } catch (error) {
    await transaction.rollback();
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get user's rating for a store
// @route   GET /api/ratings/store/:storeId
// @access  Private
const getUserRatingForStore = async (req, res) => {
  try {
    const { storeId } = req.params;
    const userId = req.user.id;

    const rating = await Rating.findOne({
      where: { userId, storeId }
    });

    res.json({
      success: true,
      data: rating
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all ratings for a store (Store Owner)
// @route   GET /api/ratings/store/:storeId/all
// @access  Private/Store Owner
const getStoreRatings = async (req, res) => {
  try {
    const { storeId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    // Check if user owns this store or is admin
    if (req.user.role !== 'admin' && req.user.ownedStoreId !== storeId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view these ratings'
      });
    }

    const ratings = await Rating.findAndCountAll({
      where: { storeId },
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email']
      }],
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      success: true,
      data: ratings.rows,
      pagination: {
        total: ratings.count,
        page: parseInt(page),
        pages: Math.ceil(ratings.count / limit)
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all ratings (Admin only)
// @route   GET /api/ratings
// @access  Private/Admin
const getAllRatings = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const ratings = await Rating.findAndCountAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email']
        },
        {
          model: Store,
          as: 'store',
          attributes: ['id', 'name', 'address']
        }
      ],
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      success: true,
      data: ratings.rows,
      pagination: {
        total: ratings.count,
        page: parseInt(page),
        pages: Math.ceil(ratings.count / limit)
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete rating
// @route   DELETE /api/ratings/:id
// @access  Private
const deleteRating = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const rating = await Rating.findByPk(req.params.id);
    
    if (!rating) {
      await transaction.rollback();
      return res.status(404).json({
        success: false,
        message: 'Rating not found'
      });
    }

    // Check if user owns this rating or is admin
    if (req.user.role !== 'admin' && rating.userId !== req.user.id) {
      await transaction.rollback();
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this rating'
      });
    }

    const storeId = rating.storeId;
    await rating.destroy({ transaction });

    // Recalculate store's average rating
    const remainingRatings = await Rating.findAll({
      where: { storeId },
      transaction
    });

    const store = await Store.findByPk(storeId);
    const totalRatings = remainingRatings.length;
    const averageRating = totalRatings > 0 
      ? remainingRatings.reduce((sum, r) => sum + r.rating, 0) / totalRatings 
      : 0;

    await store.update({
      averageRating: Math.round(averageRating * 10) / 10,
      totalRatings
    }, { transaction });

    await transaction.commit();

    res.json({
      success: true,
      message: 'Rating deleted successfully'
    });
  } catch (error) {
    await transaction.rollback();
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  submitRating,
  getUserRatingForStore,
  getStoreRatings,
  getAllRatings,
  deleteRating
};