import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';


class Img extends Component {
  static propTypes = {
    circle: PropTypes.bool,
    rounded: PropTypes.bool,
    responsive: PropTypes.bool,
    height: PropTypes.number,
    width: PropTypes.number
  }

  static defaultProps = {
    height: null,
    width: null
  }

  render() {
    let style = {};
    let classes = classNames({
      'img-circle': this.props.circle,
      'img-rounded': this.props.rounded,
      'img-responsive': this.props.responsive
    });
    if (this.props.height) {
      style.height = this.props.height;
      delete this.props.height;
    }
    if (this.props.width) {
      style.width = this.props.width;
      delete this.props.width;
    }

    let props = Object.assign({
      style: style,
      className: classes
    }, this.props);

    return (
      <img {...props} />
    );
  }
}

export default Img;
