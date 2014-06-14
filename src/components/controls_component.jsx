/** @jsx React.DOM */

'use strict';

var Bacon = require('baconjs').Bacon,
    React = require('react'),
    _     = require('lodash'),
    core  = require('../core');

module.exports = React.createClass({
  displayName: 'ControlsComponent',

  propTypes: {
    currentPlayer: React.PropTypes.object,
    stream:        React.PropTypes.instanceOf(Bacon.Observable).isRequired
  },

  didEndTurn: function() {
    this.props.stream.push({type: 'end-turn'});
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    // Don't update the component if the props haven't changed.
    return !_.isEqual(nextProps, this.props);
  },

  render: function() {
    var currentPlayer = this.props.currentPlayer ? this.props.currentPlayer.toString() : '';

    core.log('ControlsComponent#render');

    return (
      /* jshint ignore:start */
      <div className="controls">
        <span>{currentPlayer}</span>
        <button type="button" onClick={this.didEndTurn}>End Turn</button>
      </div>
      /* jshint ignore:end */
    );
  }
});