import React, { Component } from 'react';
import s from './SelectExample.scss';
import { ISelect } from '../../blocks';

function City({ option: { city, countryCode } }) {
  return (
    <div className={s.city}>
      {city}
      <span className={s.country}>
        {countryCode}
      </span>
    </div>
  );
}

class SelectExample extends Component {

  static initialState = {
    examples: [
      {
        title: 'Simple',
        props: {
          options: ['One', 'Two', 'Three'],
        },
      },
      {
        title: 'Custom template',
        props: {
          value: 'Paris',
          valueField: 'city',
          OptionView: City,
          ButtonView: City,
          options: [
            {
              city: 'London',
              countryCode: 'GB',
            },
            {
              city: 'Paris',
              countryCode: 'FR',
            },
            {
              city: 'Moscow',
              countryCode: 'RU',
            },
          ],
        },
      },
    ],
  };

  constructor(props) {
    super(props);
    this.state = SelectExample.initialState;
  }

  onSelect(i, value) {
    const props = this.state.examples[i].props;
    Object.assign(
      props,
      { value }
    );
    this.setState(this.state);
  }

  render() {
    return (
      <div className={s.group}>
        <h3>ISelect</h3>
        {this.state.examples.map(
          ({ title, props }, i) => (
            <div className={s.example}>
              <h4>{title}</h4>
              <div className={s.container}>
                <ISelect
                  onSelect={this.onSelect.bind(this, i)}
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

export default SelectExample;
