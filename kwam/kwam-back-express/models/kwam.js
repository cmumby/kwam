"use strict";

module.exports = function(sequelize, DataTypes) {
  var Kwam = sequelize.define('Kwam', {
    topic: DataTypes.STRING(2048),
    user_id: DataTypes.INTEGER,
    reason: DataTypes.TEXT,
    main_picture: DataTypes.TEXT
  },
  {
    getterMethods   : {
        topic       : function()  { return this.getDataValue('topic');},
        user_id     : function()  { return this.getDataValue('user_id');},
        reason      : function()  { return this.getDataValue('reason');},
        main_picture       : function()  { return this.getDataValue('main_picture');}
    },
    setterMethods   : {
        topic       : function(v) { this.setDataValue('topic', v); },
        user_id     : function(v) { this.setDataValue('user_id', v); },
        reason      : function(v) { this.setDataValue('reason',v); },
        main_picture      : function(v) { this.setDataValue('main_picture',v); }
    },
    freezeTableName: true, 
  });

  return Kwam;
};