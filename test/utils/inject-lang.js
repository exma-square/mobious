'use strict';

export default (flux, locale='en') => {
  const {messages} = require(`userManager/data/${locale}`);

  flux
    .getActions('locale')
    .switchLocaleSuccess({locale, messages});

  return flux.getStore('locale').getState();
};
