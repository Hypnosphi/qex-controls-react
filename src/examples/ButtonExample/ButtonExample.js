import React, { Component, PropTypes } from 'react';
import s from './ButtonExample.scss';
import {IButton} from '../../blocks';

class ButtonExample extends Component {

  static initialState = {
    count: 0,
    on: false,
    loading: false,
    loaded: false,
    changed: false
  };

  constructor(props) {
    super(props);
    this.state = ButtonExample.initialState;
    this.increment = this.increment.bind(this);
    this.toggle = this.toggle.bind(this);
    this.load = this.load.bind(this);
    this.loaded = this.loaded.bind(this);
    this.reset = this.reset.bind(this);
  }

  increment() {
    this.setState({
      ...this.state,
      count: this.state.count + 1,
      changed: true
    });
  }

  toggle() {
    this.setState({
      ...this.state,
      on: !this.state.on,
      changed: true
    });
  }

  load() {
    this.setState({
      ...this.state,
      loading: true,
      changed: true
    });
    window.setTimeout(
      this.loaded,
      1000
    );
  }

  loaded() {
    this.state.changed && this.setState({
      ...this.state,
      loading: false,
      loaded: true
    });
  }

  reset() {
    this.setState(ButtonExample.initialState);
  }

  render() {
    return (
      <div className={s.group}>
        <h3>IButton</h3>

        <div className={s.example}>
          <h4>Simple counter</h4>
          <div className={s.container}>
            <IButton onAction={this.increment}>
              Click me
            </IButton>
          </div>
          <div className={s.container}>
            {this.state.count}
          </div>
        </div>

        <div className={s.example}>
          <h4>Check mode</h4>
          <div className={s.container}>
            <IButton onAction={this.toggle} checked={this.state.on}>
              Turn me on
            </IButton>
          </div>
          <div className={s.container}>
            {this.state.on ? 'On' : 'Off'}
          </div>
        </div>

        <div className={s.example}>
          <h4>Disabled</h4>
          <div className={s.container}>
            <IButton disabled>
              I'm disabled
            </IButton>
          </div>
        </div>

        <div className={s.example}>
          <h4>Loading</h4>
          <div className={s.container}>
            <IButton onAction={this.load} loading={this.state.loading}>
              Load me
            </IButton>
          </div>
          <div className={s.container}>
            {
              this.state.loading
                ? 'Loading...'
                : this.state.loaded
                ? 'Loaded'
                : 'Not loaded'
            }
          </div>
        </div>

        <div className={s.example}>
          <h4>Sizing</h4>
          <div className={s.container}>
            {
              ['L', 'M', 'S', 'XS']
                .map(size => (
                  <div className={s.block}>
                    <IButton key={size} size={size}>
                      {size}
                    </IButton>
                  </div>
                ))
            }
          </div>
        </div>

        <div className={s.example}>
          <h4>Main action</h4>
          <div className={s.container}>
            <IButton
              onAction={this.reset}
              action
              disabled={!this.state.changed}
            >
              Reset all
            </IButton>
          </div>
        </div>
      </div>
    );
  }

}

export default ButtonExample;
