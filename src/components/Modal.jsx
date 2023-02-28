import PropTypes from 'prop-types';

import React, { Component } from 'react';

class Modal extends Component {
  static propTypes = {
    image: PropTypes.string,
    onClose: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        console.log('escape pressed');
        this.props.onClose();
      }
    });
  }

  render() {
    return (
      <div className="Overlay">
        <div className="Modal">
          <img src={this.props.image} alt="" />
        </div>
      </div>
    );
  }
}

export default Modal;
