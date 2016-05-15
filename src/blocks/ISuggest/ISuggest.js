/**
 * Created by hypnos on 15/04/16.
 */

import React, { Component, PropTypes } from 'react';
import s from './ISuggest.scss';
import { ISelect } from '../ISelect';
import { IInput } from '../IInput';
import 'whatwg-fetch';

class ISuggest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: null,
      loading: false,
      inputValue: '',
    };
    this.onInput = this.onInput.bind(this);
  }

  componentDidMount() {
    if (this.props.url) {
      this.fetch();
    }
    this.focusable = this.props.value;
  }

  componentDidUpdate() {
    if (
      !this.props.value
        && this.focusable
        && this.focus
    ) {
      this.focus();
    }
    this.focusable = this.props.value;
  }

  onInput(inputValue) {
    this.setState({
      ...this.state,
      inputValue,
    });
    if (this.props.url && this.props.param) {
      this.debouncedFetch(50);
    }
    this.select.openWithFirst();
  }

  async fetch() {
    this.setState({
      ...this.state,
      loading: true,
    });

    const {
      param,
      url,
      } = this.props;
    const hasQuery = url.includes('?');
    const input = encodeURIComponent(this.state.inputValue);
    const fetchUrl = param
      ? `${url}${hasQuery ? '&' : '?'}${param}=${input}`
      : url;
    const request = this.request = fetch(fetchUrl);
    const response = await request;
    const data = await response.json();

    if (this.request === request) {// use only latest request data
      this.setState({
        ...this.state,
        options: data,
        loading: false,
      });
    }
  }

  debouncedFetch(delay) {
    if (this.fetchTO) {
      window.clearTimeout(this.fetchTO);
    }

    this.fetchTO = window.setTimeout(
      () => {
        delete this.fetchTO;
        this.fetch();
      },
      delay
    );
  }

  render() {
    const {
      options,
      value,
      valueField,
      ValueView,
      InputView,
      ButtonView,
      arrow,
      onSelect,
      param,
    } = this.props;
    return (
      <ISelect
        {...this.props}
        arrow={value ? arrow : false}
        allowEmpty
        autoFocus={func => {this.focus = func;}}
        inputValue={this.state.inputValue}
        inputLoading={this.state.loading}
        options={
          (this.state.options || options)
            .filter(
              option => {
                const txt = (option[valueField] || option).toLowerCase();
                return param && (!this.state.loading)
                  || txt.startsWith(this.state.inputValue.toLowerCase());
              }
            )
        }
        buttonClassName={value ? '' : s.inputButton}
        ButtonView={value ? ValueView : InputView}
        OriginalButtonView={ButtonView}
        onInput={this.onInput}
        onSelect={
          (option) => {
            if (!option) {
              this.onInput('');
            }
            onSelect(option);
          }
        }
        onKey={e => e.key === ' ' && e.stopPropagation()}
        ref={select => {this.select = select;}}
      />
    );
  }
}

ISuggest.defaultProps = {
  ...ISelect.defaultProps,
  url: '',
  param: '',
  InputView: ({ props }) => (
    <IInput
      {...props}
      value={props.inputValue}
      loading={props.inputLoading}
      className={s.input}
    />
  ),
  ValueView: obj => {
    const {
      OriginalButtonView,
      onSelect,
    } = obj.props;
    return (
      <div
        className={s.value}
        onClick={() => onSelect(null)}
      >
        <OriginalButtonView {...obj} />
      </div>
    );
  },
};

ISuggest.propTypes = {
  ...ISelect.propTypes,
  url: PropTypes.string,
  param: PropTypes.string,
  InputView: PropTypes.oneOfType([
    PropTypes.instanceOf(Component),
    PropTypes.func,
  ]),
};

export { ISuggest };
