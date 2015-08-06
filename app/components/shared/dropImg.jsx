/*eslint-disable*/
import React, {Component, PropTypes} from 'react';
import Dropzone from 'react-dropzone';

class DropImg extends Component {

  static propTypes: {
    apiUrl: React.PropTypes.string,
    flux: React.PropTypes.object,
    preview: React.PropTypes.object
  }



  onDrop(files) {
    this.props.flux.getActions('posts').uploadImg(this.props.apiUrl, files, this.props.preview);
  }

  render() {
    let img = '/assets/images/post/no-preview.png';
    if(this.props.preview.img === undefined || this.props.preview.img === null) {
      img = '/assets/images/post/no-preview.png';
    } else {
      img = '/assets/images/post/' + this.props.preview.img;
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
