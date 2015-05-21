
export default class PluginService {
  constructor(sequelize){

    this.db = {};
    this.sequelize = sequelize;

  }

  installPlugin(pluginName){

    var Plugin = require(pluginName);

    var newPlugin = {
      name: 'pluginName',
      instance: new Plugin(this.sequelize)
    }

    this.db = newPlugin.instance.db;

  }


  getDb(){
    this.db.sequelize =this.sequelize;
    return this.db;
  }



}
