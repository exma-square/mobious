'use strict';

import Alt from 'alt';
import AltResolver from 'utils/alt-resolver.js';

import RequestsActions from 'actions/requests';
import LocaleActions from 'actions/locale';
import UsersActions from 'userManager/actions/users';
import BeanActions from 'beanManager/actions/bean';

import RequestsStore from 'stores/requests';
import LocaleStore from 'stores/locale';
import UsersStore from 'userManager/stores/users';
import BeanStore from 'beanManager/stores/bean';

class Flux extends Alt {

  constructor(config = {}) {
    super(config);

    this._resolver = new AltResolver();

    // Register Actions
    this.addActions('requests', RequestsActions);
    this.addActions('locale', LocaleActions);
    this.addActions('users', UsersActions);
    this.addActions('bean', BeanActions);

    // Register Stores
    this.addStore('requests', RequestsStore);
    this.addStore('locale', LocaleStore);
    this.addStore('users', UsersStore);
    this.addStore('bean', BeanStore);
  }

  resolve(result) {
    this._resolver.resolve(result);
  }

  render(handler) {
    return this._resolver.render(handler, this);
  }
}

export default Flux;
