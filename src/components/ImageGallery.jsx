import PropTypes from 'prop-types';

import React, { Component } from 'react';
import ImageGalleryItem from './ImageGalleryItem';
import Loader from './Loader';
import Modal from './Modal';

class ImageGallery extends Component {
  state = {
    // images: [],
    // status: 'idle',
    // largeImageURL: '',
    // page: 1,
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

  // handleButtonClick = () => {
  //   this.setState(prevState => {
  //     return { page: prevState.page + 1 };
  //   });
  // };

  // async componentDidUpdate(prevProps, prevState) {
  //   try {
  //     if (prevProps.imageRequest !== this.props.imageRequest) {
  //       console.log('new request', this.props.imageRequest);
  //       console.log('previous image', prevProps.imageRequest);

  //       this.setState({ status: 'pending', page: 1 });

  //       const result = await requestImages(
  //         this.props.imageRequest,
  //         this.state.page
  //       );

  //       console.log(result);
  //       const { data: allData } = result;
  //       const { hits: images } = allData;

  //       this.setState({ images });

  //       console.log(images);
  //       //   console.log('state', this.state.images);
  //       if (result.status === 200) {
  //         this.setState({ status: 'success' });
  //       }
  //     }

  //     if (prevState.page !== this.state.page) {
  //       console.log('prev state page', prevState.page);
  //       console.log('this state page', this.state.page);

  //       const newData = await requestImages(
  //         this.props.imageRequest,
  //         this.state.page
  //       );

  //       const { data: images } = newData;
  //       const { hits: allImages } = images;

  //       console.log('new images', allImages);
  //       if (newData.status === 200) {
  //         this.setState({
  //           images: [...prevState.images, ...allImages],
  //           status: 'success',
  //         });

  //         console.log('new state', this.state.images);
  //       }
  //     }
  //   } catch (error) {
  //     this.setState({ status: 'error' });
  //   }
  // }

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
