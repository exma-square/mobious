import Alt from 'alt';
import AltResolver from './alt-resolver.js';

class Flux extends Alt {

  constructor(config = {}) {
    super(config);

    this._resolver = new AltResolver();

    // Register Actions
    this.addActions('users', require('userManager/actions/users'));
    this.addActions('posts', require('postManager/actions/posts'));
    this.addActions('bean', require('beanManager/actions/bean'));
    this.addActions('comment', require('commentManager/actions/comment'));

    // Register Stores
    this.addStore('users', require('userManager/stores/users'));
    this.addStore('posts', require('postManager/stores/posts'));
    this.addStore('bean', require('beanManager/stores/bean'));
    this.addStore('comment', require('commentManager/stores/comment'));

    ['requests', 'locale', 'page-title', 'auth']
      .map(this.registerCouple);
  }


  registerCouple = ::this.registerCouple
  registerCouple(name) {
    this.addActions(name, require(`actions/${name}`));
    this.addStore(name, require(`stores/${name}`));
  }

  resolve(result) {
    this._resolver.resolve(result);
  }

  render(handler) {
    return this._resolver.render(handler, this);
  }
}

export default Flux;
