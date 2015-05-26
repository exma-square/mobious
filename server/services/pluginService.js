
export default class PluginService {
  constructor(sequelize, router){

    this.db = {};
    this.sequelize = sequelize;
    this.router = router;

  }

  installPlugin(pluginName){

    var Plugin = require(pluginName);

    var newPlugin = {
      name: 'pluginName',
      instance: new Plugin(this.sequelize, this.router)
    }

    this.db = newPlugin.instance.db;

  }


  getDb(){
    this.db.sequelize =this.sequelize;
    return this.db;
  }



}
