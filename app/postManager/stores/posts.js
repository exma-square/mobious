class PostStore {

  constructor() {
    this.bindActions(this.alt.getActions('posts'));
    this.posts = [];
    this.post = [];
    this.view = [];
  }

  onCreateSuccess(post) {
    const posts: Array<Object> = this.posts.slice();
    posts.push(post);
    return this.setState({posts});
  }

  onUpdateSuccess(post) {
    return this.setState({post});
  }

  onFetchSuccess(posts) {
    return this.setState({posts});
  }

   static getBySeed(id) {
    const posts: Array<Object> = this.getState().posts;
    let singlePost = this.getState().post;
    if (singlePost === null) singlePost = posts.find((post) => post.id.toString() === id.toString());
    return {post: singlePost};
  }

  onFetchOneSuccess(post) {
    return this.setState({post: post});
  }

  updateImgSuccess(post) {
    return this.setState({post});
  }


}

export default PostStore;
