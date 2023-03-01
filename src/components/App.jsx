import React, { Component } from 'react';
import ImageGallery from './ImageGallery';
import Searchform from './Searchbar';
import requestImages from '../services/api';
import Button from './Button';

class App extends Component {
  state = {
    request: '',
    images: [],
    status: 'idle',
    largeImageURL: '',
    page: 1,
    showBtn: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    try {
      if (
        prevState.request !== this.state.request ||
        prevState.page !== this.state.page
      ) {
        // console.log('new request', this.state.request);
        // console.log('previous image', prevState.request);

        this.setState({ status: 'pending' });

        const result = await requestImages(this.state.request, this.state.page);

        // console.log(result);
        const { data: allData } = result;
        const { hits: images } = allData;

        // this.setState({ images });

        // console.log('images after first request', images);
        this.setState({
          images:
            this.state.page === 1 ? images : [...prevState.images, ...images],
          status: 'success',
          showBtn: this.state.page < Math.ceil(allData.totalHits / 12),
        });
      }

      // if (
      //   prevState.page !== this.state.page &&
      //   prevState.request === this.state.request
      // ) {
      //   // console.log('prev state page', prevState.page);
      //   // console.log('this state page', this.state.page);

      //   const newData = await requestImages(
      //     this.state.request,
      //     this.state.page
      //   );

      //   const { data: images } = newData;
      //   const { hits: allImages } = images;

      //   // console.log('new images', allImages);

      //   // this.showLoadMoreButton(images);
      //   this.setState({
      //     images: [...prevState.images, ...allImages],
      //     status: 'success',
      //     showBtn: this.state.page < Math.ceil(images.totalHits / 12),
      //   });

      //   console.log('new state', this.state.images);
      // }
    } catch (error) {
      this.setState({ status: 'error' });
    }
  }

  handleFormSubmit = image => {
    this.setState({
      request: image,
      images: [],
      status: 'idle',
      largeImageURL: '',
      page: 1,
      showBtn: false,
    });
    console.log(this.state.images);
  };

  handleButtonClick = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  render() {
    return (
      <div>
        <Searchform onSubmit={this.handleFormSubmit} />
        <ImageGallery
          images={this.state.images}
          status={this.state.status}
          page={this.state.page}
        />
        {this.state.showBtn && <Button onClick={this.handleButtonClick} />}
      </div>
    );
  }
}

export default App;