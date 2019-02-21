import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { deletePlayerByIndex } from '../actions/playersActions';
import { setCurrentPlayer } from '../actions/currentPlayerActions';
import { setEditingPlayerIndex } from '../actions/editingPlayerIndexActions';
import PlayerForm from './PlayerForm';

class App extends Component {
  deletePlayer(index) {
    this.props.deletePlayerByIndex(index);
  }

  editPlayer(index, event) {
    event.preventDefault();
    this.props.setEditingPlayerIndex(index);
    this.props.setCurrentPlayer(this.props.players[index]);
  }

  render() {
    return (
      <div className="content">
        <h2>Leader board</h2>
        <table className="leader-board">
          <thead>
            <tr>
              <th>Name</th>
              <th>Score</th>
              <th/>
            </tr>
          </thead>
          <tbody>
            { this.props.players.map(({ firstName, lastName, score }, index) => (
              <tr key={ index }>
                <td>
                  <a href="#" onClick={ event => this.editPlayer(index, event) }>{ lastName }, { firstName }</a>
                </td>
                <td>{ score }</td>
                <td>
                  <button onClick={ () => this.deletePlayer(index) }>Delete</button>
                </td>
              </tr>
            )) }
          </tbody>
        </table>
        <PlayerForm/>
      </div>
    );
  }
}

export default connect(
  (state) => ({ ...state }),
  (dispatch) => bindActionCreators({
    deletePlayerByIndex, setCurrentPlayer, setEditingPlayerIndex
  }, dispatch)
)(App);
