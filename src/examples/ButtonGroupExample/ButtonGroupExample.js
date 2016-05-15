import React, { Component, PropTypes } from 'react';
import s from './ButtonGroupExample.scss';
import cx from 'classnames';
import {IButtonGroup} from '../../blocks';

function Status({value, count}) {
  return (
    <div className={s.status}>
      {value}
      <span
        className={cx(
          s.count,
          s[`count-${value}`]
        )}
      >
        {count}
      </span>
    </div>
  )
}

class ButtonGroupExample extends Component {

  static initialState = {
    examples: [
      {
        title: 'Radio mode (default)',
        props: {
          buttons: ['One', 'Two', 'Three']
        }
      },
      {
        title: 'Radiocheck mode',
        props: {
          buttons: ['One', 'Two', 'Three'],
          mode: 'radiocheck'
        }
      },
      {
        title: 'Check mode',
        props: {
          buttons: ['One', 'Two', 'Three'],
          mode: 'check'
        }
      },
      {
        title: 'Custom template',
        props: {
          buttons: [
            {
              'value': 'running',
              'count': 2
            },
            {
              'value': 'completed',
              'count': 10
            },
            {
              'value': 'failed',
              'count': 3
            }
          ],
          ButtonView: Status
        }
      }
    ]
  };

  constructor(props) {
    super(props);
    this.state = ButtonGroupExample.initialState;
  }

  onChange(i, selected) {
    Object.assign(
      this.state.examples[i].props,
      {selected}
    );
    this.setState(this.state);
  }

  render() {
    return (
      <div className={s.group}>
        <h3>IButtonGroup</h3>
        {this.state.examples.map(
          ({title, props}, i) => (
            <div className={s.example}>
              <h4>{title}</h4>
              <div className={s.container}>
                <IButtonGroup
                  onChange={this.onChange.bind(this, i)}
                  {...props}
                />
              </div>
            </div>
          )
        )}
      </div>
    );
  }

}

export default ButtonGroupExample;
