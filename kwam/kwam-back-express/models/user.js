"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.TEXT,
    avatar: DataTypes.TEXT,
    email: DataTypes.TEXT,
    password: DataTypes.TEXT
  },
  {
    getterMethods   : {
        username     : function()  { return this.getDataValue('username');},
        avatar     : function()  { return this.getDataValue('avatar');},
        email      : function()  { return this.getDataValue('email');},
        password       : function()  { return this.getDataValue('password');}
    },
    setterMethods   : {
        username       : function(v) { this.setDataValue('username', v); },
        avatar     : function(v) { this.setDataValue('avatar', v); },
        email      : function(v) { this.setDataValue('email',v); },
        password      : function(v) { this.setDataValue('password',v); }
    },
    freezeTableName: true,
    timestamps: false 
  });

  return User;
};