'use strict';

import Alt from 'alt';
import AltResolver from 'utils/alt-resolver.js';

import RequestsActions from 'userManager/actions/requests';
import LocaleActions from 'userManager/actions/locale';
import UsersActions from 'userManager/actions/users';

import RequestsStore from 'userManager/stores/requests';
import LocaleStore from 'userManager/stores/locale';
import UsersStore from 'userManager/stores/users';

class Flux extends Alt {

  constructor(config = {}) {
    super(config);

    this._resolver = new AltResolver();

    // Register Actions
    this.addActions('requests', RequestsActions);
    this.addActions('locale', LocaleActions);
    this.addActions('users', UsersActions);

    // Register Stores
    this.addStore('requests', RequestsStore);
    this.addStore('locale', LocaleStore);
    this.addStore('users', UsersStore);
  }

  resolve(result) {
    this._resolver.resolve(result);
  }

  render(handler) {
    return this._resolver.render(handler, this);
  }
}

export default Flux;
