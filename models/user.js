const bcrypt = require("bcrypt")

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      field: "name"
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      field: "password"
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      field: "email"
    },
    mobileNumber: {
      type: Sequelize.BIGINT,
      allowNull: false,
      field: "mobile_number"
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      field: "is_admin"
    }
  }, {
    freezeTableName: true,
    tableName: "user",
    modelName: 'user',
  });

  //hash password
  User.beforeCreate(function(user, options, cb){
    if(user.password){
      return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, function(err, salt){
          if(err) return err
          bcrypt.hash(user.password, salt, function(err, hash){
            if(err) return err
            user.password = hash
            return resolve(user, options)
          })
        })
      })
    }
  })

  //compare password
  User.prototype.comparePassword = function(passw, cb){
    return new Promise((resolve, reject) => {
      bcrypt.compare(passw, this.password, function(err, isMatch){
        if(err) return err
        return resolve(isMatch)
      })
    })
  }

  User.associate = function (models) {
    User.hasOne(models.category, {foreignKey: 'created_by'})
    User.hasMany(models.order, {foreignKey: 'user_id'})
    User.hasMany(models.product, {foreignKey: 'created_by'})
  }

  return User;
};