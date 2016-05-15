/**
 * Created by hypnos on 15/04/16.
 */

import React, {Component, PropTypes} from 'react';
import s from './ISelect.scss';
import {IButton} from '../IButton';
import {IPopup} from '../IPopup';
import {Arrow, Check} from '../Icons.js';
import cx from 'classnames';

class ISelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      active: -1
    };
    this.toggle = this.toggle.bind(this);
    this.keyDown = this.keyDown.bind(this);
    this.keyUp = this.keyUp.bind(this);
  }

  toggle(on) {
    this.setState({
      ...this.state,
      open: on,
      active: on ? this.state.active : -1
    });
  }

  setActive(i) {
    this.setState({
      ...this.state,
      active: i
    });
  }

  select(option) {
    this.popup && this.popup.toggle(false);
    this.props.onSelect(option);
  }

  focusPrev() {
    let i = this.state.active - 1;
    i >= 0
      ? this.setActive(i)
      : this.popup && this.popup.toggle(false);
  }

  focusNext() {
    let i = this.state.active + 1;
    i == 0 && this.popup && this.popup.toggle(true);
    i < this.props.options.length && this.setActive(i);
  }

  selectActive() {
    let i = this.state.active;
    i >= 0
      ? this.select(this.props.options[i])
      : this.popup && this.popup.toggle();
  }

  keyDown(e) {
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        e.stopPropagation();
        this.focusPrev();
        break;
      case 'ArrowDown':
        e.preventDefault();
        e.stopPropagation();
        this.focusNext();
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        break;
    }
  }

  keyUp(e) {
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        this.selectActive();
        break;
    }
  }

  render() {
    let {
          disabled,
          loading,
          options,
          value,
          valueField,
          ButtonView,
          OptionView,
          placeholder,
          popupProps,
          onSelect,
        } = this.props,
        blocked = disabled || loading || options.length == 0,
        selected = value && options.find(
          option => option == value || option[valueField] == value
        );

    return (
      <div
        disabled={blocked}
        className={s.select}
      >
        <IButton
          {...this.props}
          fake
          onKeyDown={this.keyDown}
          onKeyUp={this.keyUp}
        >
          <ButtonView option={selected} placeholder={placeholder}/>
          <div
            className={cx(
            s.arrow,
            this.state.open ? s.up : s.down
          )}
          >
            <Arrow />
          </div>
          <IPopup
            {...popupProps}
            disabled={blocked}
            onToggle={this.toggle}
            ref={el => this.popup = el}
          >
            <div
              className={s.options}
              onMouseLeave={this.setActive.bind(this, -1)}
            >
              {
                options.map(
                  (option, i) => (
                    <div
                      key={option[valueField] || option}
                      className={cx(
                        s.option,
                        i == this.state.active && s.active
                      )}
                      onClick={this.select.bind(this, option)}
                      onMouseEnter={this.setActive.bind(this, i)}
                    >
                      <div className={s.check}>
                        {option == selected && <Check />}
                      </div>
                      <OptionView option={option} />
                    </div>
                  )
                )
              }
            </div>
          </IPopup>
        </IButton>
      </div>
    );
  }
}

function DefaultView({option, placeholder}) {
  return (
    <span
      className= {option ? '' : s.placeholder}
    >
      {
        option
          ? option.label || option
          : placeholder
      }
    </span>
  );
}

ISelect.defaultProps = {
  ...IButton.defaultProps,
  options: [],
  value: null,
  valueField: 'value',
  ButtonView: DefaultView,
  OptionView: DefaultView,
  placeholder: 'None',
  popupProps: {},
  onSelect: Function.prototype
};

ISelect.propTypes = {
  ...IButton.propTypes,
  options: PropTypes.array,
  valueField: PropTypes.string,
  ButtonView: PropTypes.oneOfType([
    PropTypes.instanceOf(Component),
    PropTypes.func
  ]),
  OptionView: PropTypes.oneOfType([
    PropTypes.instanceOf(Component),
    PropTypes.func
  ]),
  placeholder: PropTypes.string,
  popupProps: PropTypes.shape(IPopup.propTypes),
  onSelect: PropTypes.func
};

export {ISelect};
