import React from 'react/addons';
import Flux from 'utils/flux';

import reactRouterStub from '../../utils/stub-router-context';
import injectLang from '../../utils/inject-lang';

import App from 'components/app';

const should = chai.should();

describe('App', () => {
  let node;
  let instance;
  let flux;
  const TestUtils = React.addons.TestUtils;

  // Inject language
  beforeEach(() => {
    flux = new Flux();
    injectLang(flux);
  });

  beforeEach(() => {
    const Stubbed = reactRouterStub(App, {flux});
    const element = React.createElement(Stubbed);
    node = window.document.createElement('div');
    instance = React.render(element, node);
  });

  afterEach(function() {
    if (instance) React.unmountComponentAtNode(node);
  });

  it('should render header correctly', () => {
    const header = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'header');
    header.length.should.eql(1);
  });

  it('should render logo correctly', () => {
    const logo = TestUtils.findRenderedDOMComponentWithClass(instance, 'app-logo');
    should.exist(logo);
  });

  it('should change page title', function() {
    flux.getActions('page-title').set('foobar');
    document.title.should.eql('ISO-ReactJS | foobar');
  });

  it('should handle locale change', function(done) {
    const handleChange = function({locales}) {
      locales[0].should.eql('fr');
      flux.getStore('locale').getLocale().should.eql('fr');
      flux.getStore('locale').unlisten(handleChange);
      return done();
    };
    flux.getStore('locale').listen(handleChange);
    flux.getActions('locale').switchLocale('fr');
  });
});
