import React, { Component } from 'react';
import Table from './Table';

class App extends Component {
  state = {
    characters: []
  };

  removeCharacter = (index) => {
    const { characters } = this.state

    this.setState({
      characters: characters.filter((_character, i) => {
        return i !== index
      }),
    })
  }

  render = () => {
    const { characters } = this.state;
    return (
      <div className='App'>
        <Table charactersData={ characters } removeCharacter={ this.removeCharacter } />
      </div>
    );
  }
}

export default App;
