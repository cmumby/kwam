"use strict";

module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define('Post', {
    user_id: DataTypes.INTEGER,
    kwam_id: DataTypes.INTEGER,
    message_type: DataTypes.STRING,
    message: DataTypes.TEXT
  },
  {
    getterMethods   : {
        user_id     : function()  { return this.getDataValue('user_id');},
        kwam_id     : function()  { return this.getDataValue('kwam_id');},
        message_type      : function()  { return this.getDataValue('message_type');},
        message       : function()  { return this.getDataValue('message');}
    },
    setterMethods   : {
        user_id       : function(v) { this.setDataValue('user_id', v); },
        kwam_id     : function(v) { this.setDataValue('kwam_id', v); },
        message_type      : function(v) { this.setDataValue('message_type',v); },
        message      : function(v) { this.setDataValue('message',v); }
    },
    freezeTableName: true, 
    timestamps: false
  });

  return Post;
};