import {baseUrl} from '../../../server/config/init';
import request from 'superagent';

class PostsActions {
  constructor() {
    this.generateActions(
      'fetchSuccess', 'createSuccess', 'fetchOneSuccess', 'updateSuccess'
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

  update(params) {
    const promise = (resolve) => {
      let that = this;
      that.alt.getActions('requests').start();

      request.put(baseUrl + 'rest/post/')
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
        // const post: Object = res.body.post;
        let tagNames = res.body.post.Tags.map((tag => {
          return tag.name;
        }));
        res.body.post.Tags = tagNames;

        this.actions.fetchOneSuccess(res.body.post);
        this.alt.getActions('requests').success();
        return resolve();
      });
    };

    this.alt.resolve(promise);
  }


}

export default PostsActions;
