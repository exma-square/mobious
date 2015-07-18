"use strict";

import {connection} from '../config/init';

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");

export default class Models {

  constructor() {
    var sequelize = new Sequelize(connection.database, connection.username, connection.password, connection);

    var db = {};

    fs
      .readdirSync(__dirname)
      .filter((file) => {
        return (file.indexOf('.') !== 0) && (file !== 'index.js');
      })
      .forEach((file) => {
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
      });

    Object.keys(db).forEach((modelName) => {
      if ('associate' in db[modelName]) {
        db[modelName].associate(db);
      }
    });

    this.db = db;
    this.db.sequelize = sequelize;

  }

  getDb() {
    return this.db;
  }
}
