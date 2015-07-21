import {baseUrl} from '../../../server/config/init';
import request from 'superagent';

class CommentActions {
  constructor() {
    this.generateActions(
      'fetchSuccess', 'createSuccess', 'fetchOneSuccess'
    );
  }
  create(params) {
    const promise: Function = (resolve) => {
      // fake xhr
      this.alt.getActions('requests').start();

      request.post(baseUrl + 'rest/comment/')
      .send(params)
      .end((error, res) => {
        if (error) return resolve(error);

        let createdComment = res.body.comment;
        this.actions.createSuccess(createdComment);
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

      request.get(baseUrl + 'rest/comment/')
      // .set('Accept', 'application/json')
      .end((error, res) => {
        if (error) return resolve(error);
        that.actions.fetchSuccess(res.body.comments);
        that.alt.getActions('requests').success();
        return resolve();
      });
    };
    this.alt.resolve(promise);
  }

  fetchOne(id: string) {
    const promise = (resolve) => {
      this.alt.getActions('requests').start();
      request.get(baseUrl + 'rest/comment/' + `${id}`)
      .end((error, res) => {
        if (error) return resolve(error);
        const comment: Object = res.body.comment;
        this.actions.fetchOneSuccess(comment);
        this.alt.getActions('requests').success();
        return resolve();
      });
    };

    this.alt.resolve(promise);
  }


}

export default CommentActions;
