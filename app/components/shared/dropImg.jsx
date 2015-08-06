/*eslint-disable*/
import React, {Component, PropTypes} from 'react';
import Dropzone from 'react-dropzone';

class DropImg extends Component {

  static propTypes: {
    apiUrl: React.PropTypes.string,
    flux: React.PropTypes.object,
    preview: React.PropTypes.string
  }

  onDrop(files) {
    this.props.flux.getActions('posts').uploadImg(this.props.apiUrl, files);
  }

  render() {
    return (
        <div>
          <Dropzone onDrop={this.onDrop.bind(this)} width={150} height={100}>
            <img src={'/assets/images/post/' + this.props.preview} width={150}/>
            <div>Try dropping some files here, or click to select files to upload.</div>
          </Dropzone>
        </div>
    );
  }

}

export default DropImg;
