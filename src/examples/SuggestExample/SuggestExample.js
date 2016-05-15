import React, { Component } from 'react';
import s from './SuggestExample.scss';
import { ISuggest } from '../../blocks';

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

class SuggestExample extends Component {

  static initialState = {
    examples: [
      {
        title: 'Array',
        props: {
          options: ['One', 'Two', 'Three'],
        },
      },
      {
        title: 'URL',
        props: {
          url: 'http://jsonplaceholder.typicode.com/users',
          valueField: 'name',
        },
      },
      {
        title: 'HTTP query',
        props: {
          url: 'http://jsonplaceholder.typicode.com/users?_limit=5',
          param: 'q',
          placeholder: 'Name, company etc.',
          valueField: 'name',
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
    this.state = SuggestExample.initialState;
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
        <h3>ISuggest</h3>
        {this.state.examples.map(
          ({ title, props }, i) => (
            <div className={s.example}>
              <h4>{title}</h4>
              <div className={s.container}>
                <ISuggest
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

export default SuggestExample;
