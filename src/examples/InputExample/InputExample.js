import React, { Component, PropTypes } from 'react';
import s from './InputExample.scss';
import cx from 'classnames';
import {IInput} from '../../blocks';

class InputExample extends Component {

  static initialState = {
    examples: [
      {
        title: 'Simple input',
        props: {
          value: '',
          placeholder: 'Type something'
        }
      },
      {
        title: 'Disabled',
        props: {
          value: 'I am disabled',
          disabled: true
        }
      },
      {
        title: 'Textarea',
        props: {
          value: '',
          mode: 'textarea',
          placeholder: 'Type multiline text'
        }
      }
    ],
    sized: {
      'XS': '',
      'S': '',
      'M': '',
      'L': ''
    }
  };

  constructor(props) {
    super(props);
    this.state = InputExample.initialState;
  }

  onInput(i, value) {
    Object.assign(
      this.state.examples[i].props,
      {value}
    );
    this.setState(this.state);
  }

  onSizedInput(size, value) {
    Object.assign(
      this.state.sized,
      {
        [size]: value
      }
    );
    this.setState(this.state);
  }

  render() {
    return (
      <div className={s.group}>
        <h3>IInput</h3>
        {this.state.examples.map(
          ({title, props}, i) => (
            <div className={s.example}>
              <h4>{title}</h4>
              <div className={s.container}>
                <IInput
                  onInput={this.onInput.bind(this, i)}
                  {...props}
                />
              </div>
            </div>
          )
        )}
        <div className={s.example}>
          <h4>Sizing</h4>
          <div className={s.container}>
            {
              ['L', 'M', 'S', 'XS']
                .map(size => (
                  <div className={s.block}>
                    <IInput
                      value={this.state.sized[size]}
                      onInput={this.onSizedInput.bind(this, size)}
                      size={size}
                      placeholder={size}
                    />
                  </div>
                ))
            }
          </div>
        </div>
      </div>
    );
  }

}

export default InputExample;
