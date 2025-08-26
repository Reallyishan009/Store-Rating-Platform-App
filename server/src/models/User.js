const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(60),
    allowNull: false,
    validate: {
      len: [10, 60]
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [8, 16],
      is: /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])/
    }
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      len: [1, 400]
    }
  },
  role: {
    type: DataTypes.ENUM('admin', 'user', 'store_owner'),
    allowNull: false,
    defaultValue: 'user'
  },
  ownedStoreId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'Stores',
      key: 'id'
    }
  }
}, {
  timestamps: true,
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, 12);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        user.password = await bcrypt.hash(user.password, 12);
      }
    }
  }
});

User.prototype.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = User;