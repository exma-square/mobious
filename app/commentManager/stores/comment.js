class CommentStore {

  constructor() {
    this.bindActions(this.alt.getActions('comment'));
    this.comments = [];
  }

  onFetchSuccess(comments) {
    return this.setState({comments});
  }

  onCreateSuccess(comment) {
    const comments: Array<Object> = this.comments.slice();
    comments.push(comment);
    return this.setState({comments});
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
