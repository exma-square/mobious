import React, {Component, PropTypes} from 'react';
import Dropzone from 'react-dropzone';

let nonImage;

if (process.env.BROWSER) {
  nonImage = require('images/no-preview.png');
}

class DropImg extends Component {

  static propTypes = {
    apiUrl: PropTypes.string.isRequired,
    flux: PropTypes.object.isRequired,
    preview: PropTypes.object
  }

  onDrop(files) {
    this.props.flux.getActions('posts').uploadImg(this.props.apiUrl, files, this.props.preview);
  }

  render() {
    let img = '';
    if (this.props.preview === undefined || this.props.preview === null) {
      img = nonImage;
    }
    else {
      img = '/assets/images/post/' + this.props.preview;
    }
    return (
        <div>
          <Dropzone onDrop={this.onDrop.bind(this)} width={200} height={100}>
            <img ref='previewImg' src={img} width={150}/>
            <div>Try dropping some files here, or click to select files to upload.</div>
          </Dropzone>
        </div>
    );
  }

}

export default DropImg;
