const db = require('../lib/sequelize')
module.exports = db.defineModel('order', {
  id: {
    type: db.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  order_num: {
    type: db.BIGINT.UNSIGNED,
    unique: true
  },
  total_fee: {
    type: db.BIGINT.UNSIGNED,
    set: function (val) {
      this.setDataValue('total_fee', parseInt(val * 100))
    },
    get: function () {
      const price = this.getDataValue('total_fee')
      return price / 100
    }
  },
  should_fee: {
    type: db.BIGINT.UNSIGNED,
    set: function (val) {
      this.setDataValue('should_fee', parseInt(val * 100))
    },
    get: function () {
      const price = this.getDataValue('should_fee')
      return price / 100
    }
  },
  actual_fee: {
    type: db.BIGINT.UNSIGNED,
    allowNull: true,
    set: function (val) {
      this.setDataValue('actual_fee', parseInt(val * 100))
    },
    get: function () {
      const price = this.getDataValue('actual_fee')
      return price / 100
    }
  },
  status: {
    type: db.ENUM,
    values: ['0', '1', '2'], // 0未支付 1已支付 2已失效
    defaultValue: '0',
    get: function () {
      switch (this.getDataValue('status')) {
        case '0':
          return {status: '0', info: '未支付'}
        case '1':
          return {status: '1', info: '已支付'}
        case '2':
          return {status: '2', info: '已失效'}
        default:
          return {status: '0', info: '未支付'}
      }
    }
  },
  type: {
    type: db.ENUM,
    values: ['0', '1', '2'], // 0 代表还未支付 1 代表金钱支付 2代表激活码支付
    defaultValue: '0',
    get: function () {
      switch (this.getDataValue('type')) {
        case '0':
          return {type: '0', info: '未支付'}
        case '1':
          return {type: '1', info: '微信付'}
        case '2':
          return {type: '2', info: '激活码'}
        default:
          return {type: '0', info: '未支付'}
      }
    }
  },
  count: db.BIGINT.UNSIGNED,
  card_id: db.BIGINT.UNSIGNED,
  coupon_id: {
    type: db.BIGINT.UNSIGNED,
    allowNull: true
  },
  coupon_restaurant_id: {
    type: db.BIGINT.UNSIGNED,
    allowNull: true
  },
  user_name: {
    type: db.STRING,
    allowNull: true
  },
  tel_number: {
    type: db.STRING,
    allowNull: true
  },
  national_code: {
    type: db.STRING,
    allowNull: true
  },
  postal_code: {
    type: db.STRING,
    allowNull: true
  },
  province_name: {
    type: db.STRING,
    allowNull: true
  },
  city_name: {
    type: db.STRING,
    allowNull: true
  },
  country_name: {
    type: db.STRING,
    allowNull: true
  },
  detail_info: {
    type: db.STRING,
    allowNull: true
  },
  user_id: db.BIGINT.UNSIGNED,
  created_at: db.BIGINT.UNSIGNED,
  updated_at: db.BIGINT.UNSIGNED,
  deleted_at: db.BIGINT.UNSIGNED,
  version: db.INTEGER.UNSIGNED
}, {
  // defaultScope instance not be deleted
  defaultScope: {
    where: {
      deleted_at: null
    },
    attributes: ['id', 'total_fee', 'should_fee', 'actual_fee', 'order_num', 'type', 'count', 'status', 'coupon_restaurant_id', 'coupon_id', 'user_name', 'tel_number', 'national_code', 'postal_code', 'city_name', 'country_name', 'province_name', 'detail_info', 'card_id', 'user_id', 'created_at', 'updated_at']
  }
})
