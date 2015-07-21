class CommentStore {

  constructor() {
    this.bindActions(this.alt.getActions('comment'));
    this.comment = [];
  }

  onFetchSuccess(comment) {
    return this.setState({comment});
  }

  // static getBySeed(id) {
  //   const comment: Array<Object> = this.getState().comment;
  //   let singleComment = this.getState().comment;
  //   if (singleComment === null) singleComment = comment.find((comment) => comment.id.toString() === id.toString());
  //   return {comment: singleComment};
  // }
  //
  // onFetchOneSuccess(comment) {
  //   return this.setState({comment});
  // }


}

export default CommentStore;
