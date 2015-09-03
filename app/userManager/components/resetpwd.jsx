import React, {Component, PropTypes} from 'react';
import {Button, Modal, Glyphicon, Input, Alert} from 'react-bootstrap';
import TimerMixin from 'react-timer-mixin';

class ResetPwd extends Component {
  static propTypes = {
    flux: PropTypes.object.isRequired,
    userId: PropTypes.object.isRequired,
    parent: PropTypes.object.isRequired
  }

  parent = this.props.parent

  mixins: [TimerMixin]


  self= this;

  state = {
    showModal: false,
    isLoading: false,
    checkValue: false,
    success: false
  }

  componentDidMount() {
    this.props.flux
    .getStore('resetpwd')
    .listen(this._handleStoreChange);
  }

  componentWillUnmount() {
    this.props.flux
    .getStore('resetpwd')
    .unlisten(this._handleStoreChange);
  }

  _handleStoreChange = (state) => {
    if (state.success) {
      self.setTimeout(() => {this.setState( { showModal: false, success: false}); }, 1500);
    }
    return this.setState(state);
  }


  close = () => {
    this.setState({ showModal: false });
  }

  open = () => {
    this.setState({ showModal: true });
  }

  handleSubmit = () => {
    this.setState({isLoading: true});

    let newPwd = {
      pwd1: this.refs.pwd1.refs.input.getDOMNode().value,
      pwd2: this.refs.pwd2.refs.input.getDOMNode().value
    };

    if (this.state.checkValue) {
      this.props.flux.getActions('resetpwd').resetPasswordByAdmin( this.props.userId, newPwd);

      // Reset checkValue
      this.setState({checkValue: false});

      // Clear Input
      this.refs.pwd1.refs.input.getDOMNode().value = '';
      this.refs.pwd2.refs.input.getDOMNode().value = '';
    }
  }

  handleCheckValue() {
    let newPwd = {
      pwd1: this.refs.pwd1.refs.input.getDOMNode().value,
      pwd2: this.refs.pwd2.refs.input.getDOMNode().value
    };

    this.setState({checkValue: false});
    // Not Empty
    if (newPwd.pwd1 !== '' || newPwd.pwd2 !== '') {
      // Check Password
      if (newPwd.pwd1 === newPwd.pwd2) {
        this.setState({checkValue: true});
      }
    }
  }

  render() {
    let isLoading = this.state.isLoading;
    let btnStyle = this.state.checkValue ? 'primary' : '';
    let btnText = isLoading ? this.parent._getIntlMessage('userManager.resetPassword.resetting') : this.parent._getIntlMessage('userManager.resetPassword.reset');


    let inputStyle = this.state.checkValue ? 'success' : '';
    return (
      <Button
        bsStyle='primary'
        bsSize='small'
        onClick={this.open}>
        <Glyphicon glyph='refresh'/>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>{this.parent._getIntlMessage('userManager.resetPassword.title')}</Modal.Title>

          </Modal.Header>
          <Modal.Body>
            {()=> {
              if (this.state.success) {
                return (
                  <Alert bsStyle='success'>
                    <strong>{this.parent._getIntlMessage('userManager.resetPassword.success')}</strong>
                  </Alert>
                );
              }
              else {
                return (
                  <form className='form-horizontal' onChange={this.handleCheckValue.bind(this)}>
                    <Input bsStyle={inputStyle} disabled={isLoading} hasFeedback type='password' ref='pwd1' label={this.parent._getIntlMessage('userManager.resetPassword.password')} labelClassName='col-xs-3' wrapperClassName='col-xs-9' />
                    <Input bsStyle={inputStyle} disabled={isLoading} hasFeedback type='password' ref='pwd2' label={this.parent._getIntlMessage('userManager.resetPassword.password_again')} labelClassName='col-xs-3' wrapperClassName='col-xs-9' />
                  </form>
                );
              }
            }()}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>{this.parent._getIntlMessage('userManager.resetPassword.close')}</Button>
            <Button bsStyle={btnStyle} disabled={!this.state.checkValue} onClick={this.handleSubmit.bind(this)}>{btnText}</Button>
          </Modal.Footer>
        </Modal>

      </Button>


    );
  }
}

export default ResetPwd;
