class ResetPwdStore {


  constructor() {
    this.bindActions(this.alt.getActions('resetpwd'));
  }
  onResetPasswordByAdminSuccess(success) {
    return this.setState({
      isLoading: false,
      checkValue: false,
      success: success
    });
  }

}

export default ResetPwdStore;
