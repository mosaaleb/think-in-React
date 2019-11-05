import React, { Component } from 'react';

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <td>Name</td>
        <td>Job</td>
        <td>Remove</td>
      </tr>
    </thead>
  );
}

const TableBody = (props) => {
  const characters = props.charactersData.map((character, index) => {
    return (
      <tr key={ index }>
        <td>{ character.name }</td>
        <td>{ character.job }</td>
        <td><button onClick={() => props.removeCharacter(index)}>Delete</button></td>
      </tr>
    )
  });
  return <tbody>{characters}</tbody>
}

class Table extends Component {
  render = () => {
    const { charactersData, removeCharacter } = this.props;
    return (
      <table>
        <TableHeader />
        <TableBody charactersData={charactersData} removeCharacter={removeCharacter} />
      </table>
    );
  }
}

export default Table;