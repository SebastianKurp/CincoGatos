import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
        <div className="App-header">
          <div>
            <h2>Welcome to React</h2>
          </div>
          <div>
            {this.props.children}
          </div>

        </div>
    );
  }
}

export default App;
