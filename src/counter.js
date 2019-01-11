import React from 'react';

export default class Counter extends React.Component {
  state = {
    count: 0,
  };

  constructor(props) {
    super(props);
  }

  climb = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  render() {
    return (
      <div onClick={this.climb}>
        <h1>Count: {this.state.count}</h1>;
      </div>
    );
  }
}
