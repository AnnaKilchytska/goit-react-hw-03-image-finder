import React, { Component } from 'react';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Button from './Button';
import Searchform from './Searchbar';

class App extends Component {
  state = {
    request: '',
  };

  handleFormSubmit = image => {
    console.log(image);
    this.setState({ request: image });
  };

  render() {
    return (
      <div>
        <Searchform onSubmit={this.handleFormSubmit} />
        <ImageGallery imageRequest={this.state.request} />
      </div>
    );
  }
}

export default App;
