const User = require('./User');
const Store = require('./Store');
const Rating = require('./Rating');

// Define associations
User.hasMany(Rating, { foreignKey: 'userId', as: 'ratings' });
Rating.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Store.hasMany(Rating, { foreignKey: 'storeId', as: 'ratings' });
Rating.belongsTo(Store, { foreignKey: 'storeId', as: 'store' });

// Store owner relationship
Store.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });
User.hasOne(Store, { foreignKey: 'ownerId', as: 'ownedStore' });

module.exports = {
  User,
  Store,
  Rating
};