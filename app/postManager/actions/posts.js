import {baseUrl} from '../../../server/config/init';
import request from 'superagent';

class PostsActions {
  constructor() {
    this.generateActions(
      'fetchSuccess', 'createSuccess', 'fetchOneSuccess', 'updateSuccess', 'updateImgSuccess', 'updateEditorSuccess'
    );
  }
  create(params) {
    const promise: Function = (resolve) => {
      // fake xhr
      this.alt.getActions('requests').start();

      request.post(baseUrl + 'rest/post/')
      .send(params)
      .end((error, res) => {
        if (error) return resolve(error);
        let createdPost = res.body.post;
        this.actions.updateSuccess(createdPost);
        this.alt.getActions('requests').success();
        return resolve();
      }, 300);
    };
    this.alt.resolve(promise);
  }

  update(id:string, params) {
    const promise = (resolve) => {
      let that = this;
      that.alt.getActions('requests').start();
      request.put(baseUrl + 'rest/post/' + `${id}`)
      .send(params)
      .end((error, res) => {
        if (error) return resolve(error);
        let editPost = res.body.post;
        this.actions.updateSuccess(editPost);
        this.alt.getActions('requests').success();
        return resolve();
      }, 300);
    };
    this.alt.resolve(promise);
  }

  updateEditor(id:string, params) {
    const promise = (resolve) => {
      let that = this;
      that.alt.getActions('requests').start();
      request.put(baseUrl + 'rest/post/updateEditor/' + `${id}`)
      .send(params)
      .end((error, res) => {
        if (error) return resolve(error);
        this.actions.updateEditorSuccess(res.body.post);
        this.alt.getActions('requests').success();
        return resolve();
      }, 300);
    };
    this.alt.resolve(promise);
  }

  fetch() {
    const promise: Function = (resolve) => {
      let that = this;
      that.alt.getActions('requests').start();

      request.get(baseUrl + 'rest/post')
      // .set('Accept', 'application/json')
      .end((error, res) => {
        if (error) return resolve(error);
        that.actions.fetchSuccess(res.body.posts);
        that.alt.getActions('requests').success();
        return resolve();
      });
    };
    this.alt.resolve(promise);
  }

  fetchOne(id: string) {
    const promise = (resolve) => {
      this.alt.getActions('requests').start();
      request.get(baseUrl + 'rest/post/' + `${id}`)
      .end((error, res) => {
        if (error) return resolve(error);
        let tagNames = res.body.post.Tags.map((tag => {
          return tag.name;
        }));
        res.body.post.Tags = tagNames.sort();
        this.actions.fetchOneSuccess(res.body.post);
        this.alt.getActions('requests').success();
        return resolve();
      });
    };

    this.alt.resolve(promise);
  }

  uploadImg(url: string, files: Array, singlePost: Object) {
    const promise = (resolve) => {
      this.alt.getActions('requests').start();
      files.forEach((file) => {
        request.post(url)
        .attach('file', file)
        .end((err, res) => {
          if (err) return resolve(err);
          let resObj = res.body;
          singlePost.img = resObj.filename;
          this.actions.updateImgSuccess(singlePost);
          this.alt.getActions('requests').success();
        });
      });

      return resolve();
    };

    this.alt.resolve(promise);
  }


}

export default PostsActions;
