import fse from 'fs-extra';

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
    };

    this.db = newPlugin.instance.db;

  }


  getDb(){
    this.db.sequelize = this.sequelize;
    return this.db;
  }


  static async installApp(pluginName) {

    var pluginAppPath = `node_modules/${pluginName}/dist/app`;
    var pluginAppHomePath =`app/plugins/${pluginName}`;


    await new Promise((resolve) => {

      fse.copy(pluginAppPath, pluginAppHomePath, (error) => {
        if(error){
          resolve(error);
        } else {
          resolve('ok');
        }
      });

    });

  }

}
