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
    window.AlloyEditor.editable('AlloyeditorContent');
  }

  render() {
    return (
      <div id='AlloyeditorContent' ref='content' dangerouslySetInnerHTML={{__html: this.props.content }} >
      </div>
    );
  }

}
export default Alloyeditor;