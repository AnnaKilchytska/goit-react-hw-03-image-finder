import PropTypes from 'prop-types';

import React, { Component } from 'react';

class ImageGalleryItem extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    large: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  render() {
    return (
      <li className="ImageGalleryItem" onClick={this.props.onClick}>
        <img
          src={this.props.url}
          alt={this.props.tags}
          className="ImageGalleryItem-image"
        />
      </li>
    );
  }
}

export default ImageGalleryItem;
