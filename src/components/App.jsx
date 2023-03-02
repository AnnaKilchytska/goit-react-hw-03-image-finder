import React, { Component } from 'react';
import ImageGallery from './ImageGallery';
import Searchform from './Searchbar';
import requestImages from '../services/api';
import Button from './Button';
import Loader from './Loader';

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
        this.setState({ status: 'pending' });

        const result = await requestImages(this.state.request, this.state.page);

        const { data: allData } = result;
        const { hits: images } = allData;

        if (images.length === 0) {
          this.setState({ status: 'error' });
          return;
        } else {
          this.setState({
            images:
              this.state.page === 1 ? images : [...prevState.images, ...images],
            status: 'success',
            showBtn: this.state.page < Math.ceil(allData.totalHits / 12),
          });
        }
      }
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
    const { status, images, page } = this.state;

    return (
      <>
        <Searchform onSubmit={this.handleFormSubmit} />
        {status === 'idle' && (
          <h1 className="message">Start searching for images</h1>
        )}
        {status === 'error' && (
          <h1 className="message">Oops, something went wrong. Try again!</h1>
        )}

        {status === 'pending' && <Loader />}

        <div>
          <ImageGallery images={images} status={status} page={page} />
          {this.state.showBtn && <Button onClick={this.handleButtonClick} />}
        </div>
      </>
    );
    // }
  }
}

export default App;
