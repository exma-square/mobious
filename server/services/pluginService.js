


export default class PluginService {
  constructor(sequelize){

    this.plugins = [];
    this.db = {};
    this.sequelize = sequelize;

  }

  addPlugin(pluginName){
    console.log("=== pluginName ===", pluginName);

    var Plugin = require(pluginName);

    var newPlugin = {
      name: 'pluginName',
      instance: new Plugin(this.sequelize)
    }

    this.db = newPlugin.instance.db;
    this.db.sequelize =this.sequelize;

    this.plugins.push(newPlugin);




  }

  getPlugin(){
    return this.piugins;
  }

  mountModels(){
    // console.log('=== mountModels ===');
    // var that = this;
    //
    // Object.keys(that.db).forEach((modelName) => {
    //   if ("associate" in that.db[modelName]) {
    //     that.db[modelName].associate(that.db);
    //   }
    // });

  }


}
