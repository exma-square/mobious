class PostStore {

  constructor() {
    this.bindActions(this.alt.getActions('posts'));
    this.posts = [];
    this.post = [];
    this.view = [];
    this.preview = 'no-preview.png';
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
    posts.forEach((post) => {
      if (post.img === null) post.img = 'no-preview.png';
    });
    return this.setState({posts});
  }

   static getBySeed(id) {
    const posts: Array<Object> = this.getState().posts;
    let singlePost = this.getState().post;
    // console.log(singlePost);
    if (singlePost === null) singlePost = posts.find((post) => post.id.toString() === id.toString());
    console.log('get by seed post is ', singlePost);
    if (singlePost.img === null) singlePost.img = this.getState().preview = 'no-preview.png';
    return {post: singlePost, preview: this.getState().preview};
  }

  onFetchOneSuccess(post) {
    return this.setState({post: post});
  }

  updateImgSuccess(preview) {
    console.log(preview);
    this.preview = preview;
    return this.setState({preview});
  }


}

export default PostStore;
