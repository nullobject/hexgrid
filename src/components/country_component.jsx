import * as core from '../core';
import * as Bacon from 'baconjs';
import * as F from 'fkit';
import * as React from 'react/addons';

var cx = React.addons.classSet;

export default React.createClass({
  displayName: 'CountryComponent',

  propTypes: {
    country:  React.PropTypes.object.isRequired,
    nearby:   React.PropTypes.bool.isRequired,
    selected: React.PropTypes.bool.isRequired,
    stream:   React.PropTypes.instanceOf(Bacon.Observable).isRequired
  },

  didSelectCountry(country) {
    this.props.stream.push({type: 'select-country', country: country});
  },

  classes() {
    var player = this.props.country.player,
        color  = player ? player.toString() : '';

    return F.set(color, true, {
      country:  true,
      nearby:   this.props.nearby,
      selected: this.props.selected
    });
  },

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.country !== this.props.country ||
      nextProps.nearby !== this.props.nearby ||
      nextProps.selected !== this.props.selected;
  },

  render() {
    var country = this.props.country;

    core.log('CountryComponent#render (' + country + ')');

    return (
      /* jshint ignore:start */
      <g>
        <polygon
          className={cx(this.classes())}
          points={country.polygon}
          onClick={this.didSelectCountry.bind(this, country)}
        />
        {this.renderSlots(country)}
      </g>
      /* jshint ignore:end */
    );
  },

  renderSlots(country) {
    return country.slots.map(this.renderSlot(country));
  },

  renderSlot: F.curry((country, polygon, index) => {
    var classes = {
      selected: index < country.armies,
      slot:     true
    };

    return (
      /* jshint ignore:start */
      <polygon className={cx(classes)} key={index} points={polygon} />
      /* jshint ignore:end */
    );
  }),
});
