import PropTypes from 'prop-types';

import React, { Component } from 'react';
import ImageGalleryItem from './ImageGalleryItem';
import Loader from './Loader';
import Modal from './Modal';

class ImageGallery extends Component {
  state = {
    modalOpen: false,
  };

  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
    status: PropTypes.string.isRequired,
  };

  handleModalClick = url => {
    this.setState(({ largeImageURL, modalOpen }) => {
      return { largeImageURL: url, modalOpen: !modalOpen };
    });
  };

  handleModalClose = () => {
    this.setState({ modalOpen: false });
  };

  render() {
    const { status, images } = this.props;

    if (status === 'idle') {
      return <h1 className="message">Start searching for images</h1>;
    }

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'error' || images.length === 0) {
      return (
        <h1 className="message">Oops, something went wrong! Try again!</h1>
      );
    }

    if (status === 'success') {
      return (
        <>
          {this.state.modalOpen === true && (
            <Modal
              image={this.state.largeImageURL}
              onClose={this.handleModalClose}
            />
          )}
          <ul className="ImageGallery">
            {this.props.images.map(image => {
              return (
                <ImageGalleryItem
                  key={image.id}
                  url={image.webformatURL}
                  alt={image.tags}
                  large={image.largeImageURL}
                  onClick={() => this.handleModalClick(image.largeImageURL)}
                />
              );
            })}
          </ul>
        </>
      );
    }
  }
}

export default ImageGallery;
