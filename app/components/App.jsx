import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { deletePlayerByIndex } from '../actions/playersActions';
import PlayerForm from './PlayerForm';

class App extends Component {
  deletePlayer(index) {
    this.props.deletePlayerByIndex(index);
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
                <td>{ lastName }, { firstName }</td>
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
    deletePlayerByIndex
  }, dispatch)
)(App);
