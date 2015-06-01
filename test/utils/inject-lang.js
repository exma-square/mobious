'use strict';

export default (flux, locale='en') => {
  const {messages} = require(`plugins/mobious_plugin_sample/data/${locale}`);

  flux
    .getActions('locale')
    .switchLocaleSuccess({locale, messages});

  return flux.getStore('locale').getState();
};
