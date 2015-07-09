import {baseUrl} from '../../../server/config/init';
import request from 'superagent';

class PostsActions {
  constructor() {
    this.generateActions(
      'fetchSuccess', 'createSuccess', 'fetchOneSuccess'
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
        this.actions.createSuccess(createdPost);
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
        const post: Object = res.body.post;
        console.log('res.body', res.body);
        this.actions.fetchOneSuccess(post);
        this.alt.getActions('requests').success();
        return resolve();
      });
    };

    this.alt.resolve(promise);
  }


}

export default PostsActions;
