'use strict';

export default (flux, locale='en') => {
  const {messages} = require(`plugins/temp_plugin/data/${locale}`);

  flux
    .getActions('locale')
    .switchLocaleSuccess({locale, messages});

  return flux.getStore('locale').getState();
};
