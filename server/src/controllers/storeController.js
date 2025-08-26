const { Store, User, Rating } = require('../models');
const { Op } = require('sequelize');

// @desc    Get all stores
// @route   GET /api/stores
// @access  Private
const getStores = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, sortBy = 'name', sortOrder = 'ASC' } = req.query;
    
    const offset = (page - 1) * limit;
    const whereClause = {};

    // Search filter
    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { address: { [Op.like]: `%${search}%` } }
      ];
    }

    const stores = await Store.findAndCountAll({
      where: whereClause,
      include: [{
        model: User,
        as: 'owner',
        attributes: ['id', 'name', 'email']
      }],
      order: [[sortBy, sortOrder.toUpperCase()]],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      success: true,
      data: stores.rows,
      pagination: {
        total: stores.count,
        page: parseInt(page),
        pages: Math.ceil(stores.count / limit)
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create store (Admin only)
// @route   POST /api/stores
// @access  Private/Admin
const createStore = async (req, res) => {
  try {
    const { name, email, address, ownerId } = req.body;

    // Check if store exists
    const existingStore = await Store.findOne({ where: { email } });
    if (existingStore) {
      return res.status(400).json({
        success: false,
        message: 'Store already exists'
      });
    }

    const store = await Store.create({
      name,
      email,
      address,
      ownerId
    });

    // If ownerId provided, update user's role and store relationship
    if (ownerId) {
      await User.update(
        { 
          role: 'store_owner',
          ownedStoreId: store.id 
        },
        { where: { id: ownerId } }
      );
    }

    res.status(201).json({
      success: true,
      data: store
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get store by ID
// @route   GET /api/stores/:id
// @access  Private
const getStoreById = async (req, res) => {
  try {
    const store = await Store.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'name', 'email']
        },
        {
          model: Rating,
          as: 'ratings',
          include: [{
            model: User,
            as: 'user',
            attributes: ['id', 'name']
          }]
        }
      ]
    });

    if (!store) {
      return res.status(404).json({
        success: false,
        message: 'Store not found'
      });
    }

    res.json({
      success: true,
      data: store
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update store
// @route   PUT /api/stores/:id
// @access  Private/Admin
const updateStore = async (req, res) => {
  try {
    const { name, email, address } = req.body;
    
    const store = await Store.findByPk(req.params.id);
    if (!store) {
      return res.status(404).json({
        success: false,
        message: 'Store not found'
      });
    }

    await store.update({
      name: name || store.name,
      email: email || store.email,
      address: address || store.address
    });

    res.json({
      success: true,
      data: store
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete store
// @route   DELETE /api/stores/:id
// @access  Private/Admin
const deleteStore = async (req, res) => {
  try {
    const store = await Store.findByPk(req.params.id);
    if (!store) {
      return res.status(404).json({
        success: false,
        message: 'Store not found'
      });
    }

    await store.destroy();

    res.json({
      success: true,
      message: 'Store deleted successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get stores for current user (with user's ratings)
// @route   GET /api/stores/user
// @access  Private
const getStoresForUser = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const offset = (page - 1) * limit;
    const whereClause = {};

    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { address: { [Op.like]: `%${search}%` } }
      ];
    }

    const stores = await Store.findAndCountAll({
      where: whereClause,
      include: [{
        model: Rating,
        as: 'ratings',
        where: { userId: req.user.id },
        required: false,
        attributes: ['rating']
      }],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      success: true,
      data: stores.rows,
      pagination: {
        total: stores.count,
        page: parseInt(page),
        pages: Math.ceil(stores.count / limit)
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getStores,
  createStore,
  getStoreById,
  updateStore,
  deleteStore,
  getStoresForUser
};