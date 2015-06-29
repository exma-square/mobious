class PostStore {

  constructor() {
    this.bindActions(this.alt.getActions('posts'));
    this.posts = [];
  }

  onFetchSuccess(posts) {
    return this.setState({posts});
  }
}

export default PostStore;
