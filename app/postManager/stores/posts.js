class PostStore {

  constructor() {
    this.bindActions(this.alt.getActions('posts'));
    this.posts = [];
    this.post = { Tags: []};
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

  onUpdateEditorSuccess(newPost) {
    const posts: Array<Object> = this.posts;
    posts.forEach((post, index) => {
      if (post.id === newPost.id) {
        this.posts[index] = newPost;
        // UI select default value.
        if (newPost.EditorId === null) this.posts[index].EditorId = 0;
      }
    });

    return this.setState({posts});
  }

}

export default PostStore;
