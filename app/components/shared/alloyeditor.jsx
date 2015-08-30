import React, {Component, PropTypes} from 'react';

if (process.env.BROWSER) {
  window.React = React;
  window.CKEDITOR_BASEPATH = '/alloyeditor/';
  require('alloyeditor/dist/alloy-editor/alloy-editor-all.js');
  require('alloyeditor/dist/alloy-editor/assets/alloy-editor-ocean.css');
}

class Alloyeditor extends Component {
  static propTypes = {
    content: PropTypes.string
  }

  componentDidMount() {
    setTimeout(this._initAlloyEditor, 500);
  }

  _initAlloyEditor = () => {
    window.AlloyEditor.editable('AlloyeditorContent', {
    uiNode: 'uiNode'});
  }

  render() {
    let contentSytle = {
      'minHeight': '5px',
      border: '1px solid #ccc',
      'borderRadius': '4px'
    };
    let body = null;
    if (this.props.label !== undefined) {
      body = (
        <div className='form-group'>
          <label className={this.props.labelClassName + ' control-label'}>{this.props.label}</label>
          <div id='uiNode'></div>
          <div className={this.props.wrapperClassName}>
            <div id='AlloyeditorContent' ref='content' dangerouslySetInnerHTML={{__html: this.props.content }} style={contentSytle}></div>
          </div>
        </div>
      );
    }
    else {
      body = (
        <div>
          <div id='uiNode'></div>
          <div id='AlloyeditorContent' ref='content' dangerouslySetInnerHTML={{__html: this.props.content }} style={contentSytle}></div>
        </div>
      );
    }
    return body;
  }

}
export default Alloyeditor;
