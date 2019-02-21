import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeCurrentPlayer, clearCurrentPlayer } from '../actions/currentPlayerActions';
import { addPlayer } from '../actions/playersActions';

class PlayerForm extends Component {
  constructor(props) {
    super(props);

    this.scoreProps = { min: 0, max: 100 };
    this.validation = {
      firstName: /^[A-Za-z- ]+$/,
      lastName: /^[A-Za-z- ]+$/,
      score: (value) => value >= this.scoreProps.min && value <= this.scoreProps.max,
    };
  }

  handleChange(field, { target: { value } }) {
    let isValid = true;
    const validator = this.validation[field];

    if (validator instanceof RegExp) {
      isValid = validator.test(value);
    } else if (validator instanceof Function) {
      isValid = validator(value);
    }

    this.props.changeCurrentPlayer({
      field,
      payload: {
        isPristine: !value,
        isValid,
        value
      }
    });
  }

  isDataReady() {
    let isValid = true;

    Object.keys(this.props.currentPlayer)
      .map(key => {
        if (this.props.currentPlayer[key].isValid === false) {
          isValid = false;
        }
      })

    return isValid;
  }

  handleSubmit() {
    const player = Object.keys(this.props.currentPlayer)
      .reduce((all, key) => {
        const value = this.props.currentPlayer[key].value;

        return { ...all, [key]: value };
      }, {});

    this.props.addPlayer(player);
    this.props.clearCurrentPlayer();
  }

  hasError(field) {
    return field.isValid === false && field.isPristine === false;
  }

  render() {
    return (
      <form onSubmit={ ::this.handleSubmit }>
        <div>
          <label>First name</label>
          <input
            type="text"
            value={ this.props.currentPlayer.firstName.value }
            onChange={ event => ::this.handleChange('firstName', event) } />
          { ::this.hasError(this.props.currentPlayer.firstName) ?
            <div className="error">First name should contain letters only</div> : '' }
        </div>
        <div>
          <label>Last name</label>
          <input
            type="text"
            value={ this.props.currentPlayer.lastName.value }
            onChange={ event => ::this.handleChange('lastName', event) } />
          { ::this.hasError(this.props.currentPlayer.lastName) ?
            <div className="error">Last name should contain letters only</div> : '' }
        </div>
        <div>
          <label>Score</label>
          <input
            type="number"
            value={ this.props.currentPlayer.score.value }
            onChange={ event => ::this.handleChange('score', event) }
            min={ this.scoreProps.min }
            max={ this.scoreProps.max }
          />
          { ::this.hasError(this.props.currentPlayer.score) ?
            <div className="error">
              Score must be integer between { this.scoreProps.min } and { this.scoreProps.max }
            </div> : '' }
        </div>
        { ::this.isDataReady() ? <button>Save</button> : <button disabled>Save</button> }
      </form>
    );
  }
}

export default connect(
  (state) => ({ ...state }),
  (dispatch) => bindActionCreators({
    changeCurrentPlayer, addPlayer, clearCurrentPlayer
  }, dispatch)
)(PlayerForm);
