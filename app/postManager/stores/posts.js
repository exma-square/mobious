class PostStore {

  constructor() {
    this.bindActions(this.alt.getActions('posts'));
    this.posts = [];
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
    return this.setState({post});
  }


}

export default PostStore;
