import PropTypes from 'prop-types';

import React, { Component } from 'react';

class Button extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  };

  render() {
    return (
      <button type="button" className="Button" onClick={this.props.onClick}>
        Load more
      </button>
    );
  }
}

export default Button;
