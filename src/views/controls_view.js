import ButtonView from './button_view'
import React from 'react'
import styles from '../stylesheets/styles.scss'

export default class ControlsView extends React.PureComponent {
  render () {
    const {bus, currentPlayer} = this.props
    const text = currentPlayer ? `It's ${currentPlayer}'s turn.` : ''

    return (
      <div className={styles.controls}>
        <span>{text}</span>
        <ButtonView
          disabled={currentPlayer && !currentPlayer.human}
          onClick={() => bus.emit('end-turn')}
        >End Turn</ButtonView>
      </div>
    )
  }
}
