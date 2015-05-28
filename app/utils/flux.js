'use strict';

import Alt from 'alt';
import AltResolver from './alt-resolver.js';

import RequestsActions from 'plugins/temp_plugin/actions/requests';
import LocaleActions from 'plugins/temp_plugin/actions/locale';
import UsersActions from 'plugins/temp_plugin/actions/users';

import RequestsStore from 'plugins/temp_plugin/stores/requests';
import LocaleStore from 'plugins/temp_plugin/stores/locale';
import UsersStore from 'plugins/temp_plugin/stores/users';

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
