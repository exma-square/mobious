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
    }

    this.db = newPlugin.instance.db;

  }


  getDb(){
    this.db.sequelize =this.sequelize;
    return this.db;
  }


  static async installApp(pluginName) {

    var pluginAppPath = `${global.HOME_PATH}/node_modules/${pluginName}/dist/app`;


    var pluginAppInstallPath = this.getInstallAppPath(pluginName);


    var result = await new Promise((resolve, reject) => {

      fse.copy(pluginAppPath, pluginAppInstallPath, (error) => {
        if(error){
          resolve(error);
        } else {
          resolve("ok");
        }
      });

    });

  }

  static getInstallAppPath(pluginName) {
    var pluginAppInstallPath = `${global.HOME_PATH}/app/plugins/${pluginName}`;

    return pluginAppInstallPath;
  }

}
