const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Rating = sequelize.define('Rating', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  storeId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Stores',
      key: 'id'
    }
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  }
}, {
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['userId', 'storeId']
    }
  ]
});

module.exports = Rating;