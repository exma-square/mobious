
import UserService from './user';


export default class Services {

    constructor () {
      this.user = new UserService();
    }

}
