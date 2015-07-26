import React from 'react/addons';
import Flux from 'utils/flux';
import objectAssign from 'react/lib/Object.assign';

import reactRouterStub from '../../utils/stub-router-context';
import injectLang from '../../utils/inject-lang';

import Header from 'components/header';

chai.should();

describe('Header', () => {
  let node;
  let instance;
  let flux;
  const TestUtils = React.addons.TestUtils;

  beforeEach(() => {
    flux = new Flux();

    const props = objectAssign({flux}, injectLang(flux));
    const Stubbed = reactRouterStub(Header, props);

    node = window.document.createElement('div');
    instance = React.render(React.createElement(Stubbed), node);
  });

  afterEach(() => {
    if (instance) React.unmountComponentAtNode(node);
  });

  it('should render lang picker correctly', () => {
    const langs = TestUtils.findRenderedDOMComponentWithClass(instance, 'lang--picker');
    langs.props.children.length.should.eql(2);
  });

  it('should handle requests change', function() {
    flux.getActions('requests').start();
    const spinner = TestUtils.findRenderedDOMComponentWithClass(instance, 'app--spinner');
    spinner.props.className.indexOf('active').should.not.eql(-1);

    flux.getActions('requests').fail();
    spinner.props.className.indexOf('active').should.eql(-1);
  });
});
