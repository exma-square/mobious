import React, {Component, PropTypes} from 'react';
import Dropzone from 'react-dropzone';
import {Col} from 'react-bootstrap';

let nonImage;

if (process.env.BROWSER) {
  nonImage = require('images/no-preview.png');
}

class DropImg extends Component {

  static propTypes = {
    apiUrl: PropTypes.string.isRequired,
    flux: PropTypes.object.isRequired,
    preview: PropTypes.string
  }

  onDrop(files) {
    this.props.flux.getActions('posts').uploadImg(this.props.apiUrl, files, this.props.preview);
  }

  render() {
    let img = '';
    if (this.props.preview === undefined || this.props.preview === '') {
      img = nonImage;
    }
    else {
      img = '/assets/images/post/' + this.props.preview;
    }
    return (
        <Col style={{display: 'inline-block', marginBottom: '3%'}}>
          <Dropzone onDrop={this.onDrop.bind(this)} width={'100%'} height={'10%'}>
            <img ref='previewImg' src={img} width={'100%'}/>
            <div>點擊或拖拉圖片至此區塊以上載圖片</div>
          </Dropzone>
        </Col>
    );
  }

}

export default DropImg;
