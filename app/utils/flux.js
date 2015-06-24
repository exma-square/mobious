import Alt from 'alt';
import AltResolver from './alt-resolver.js';

class Flux extends Alt {

  constructor(config = {}) {
    super(config);

    this._resolver = new AltResolver();

    // Register Actions
    this.addActions('requests', require('actions/requests'));
    this.addActions('locale', require('actions/locale'));
    this.addActions('users', require('userManager/actions/users'));
    this.addActions('page-title', require('actions/page-title'));

    this.addActions('bean', require('beanManager/actions/bean'));

    // Register Stores
    this.addStore('requests', require('stores/requests'));
    this.addStore('locale', require('stores/locale'));
    this.addStore('users', require('userManager/stores/users'));
    this.addStore('page-title', require('stores/page-title'));

    this.addStore('bean', require('beanManager/stores/bean'));
  }

  resolve(result) {
    this._resolver.resolve(result);
  }

  render(handler) {
    return this._resolver.render(handler, this);
  }
}

export default Flux;
