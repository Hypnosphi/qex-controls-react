/**
 * Created by hypnos on 15/04/16.
 */

import React, { Component, PropTypes } from 'react';
import s from './ISelect.scss';
import { IButton } from '../IButton';
import { IPopup } from '../IPopup';
import { Arrow, Check } from '../Icons.js';
import cx from 'classnames';

class ISelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      active: -1,
    };
    this.toggle = this.toggle.bind(this);
    this.keyDown = this.keyDown.bind(this);
    this.keyUp = this.keyUp.bind(this);
  }

  setActive(i) {
    this.setState({
      ...this.state,
      active: i,
    });
  }

  toggle(on) {
    this.setState({
      ...this.state,
      open: on,
      active: on ? this.state.active : -1,
    });
  }

  openWithFirst() {
    if (this.popup) {
      this.popup.toggle(true);
    }
    this.setState({
      ...this.state,
      active: 0,
    });
  }

  select(option) {
    if (this.popup) {
      this.popup.toggle(false);
    }
    this.props.onSelect(option);
  }

  focusPrev() {
    const i = this.state.active - 1;
    if (i >= 0) {
      this.setActive(i);
    } else if (this.popup) {
      this.popup.toggle(false);
    }
  }

  focusNext() {
    const i = this.state.active + 1;
    if (i === 0 && this.popup) {
      this.popup.toggle(true);
    }
    if (i < this.props.options.length) {
      this.setActive(i);
    }
  }

  selectActive() {
    const i = this.state.active;
    if (i >= 0) {
      this.select(this.props.options[i]);
    } else if (this.popup) {
      this.popup.toggle();
    }
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
      default:
    }
  }

  keyUp(e) {
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        this.selectActive();
        break;
      default:
    }
  }

  render() {
    const {
      disabled,
      loading,
      options,
      value,
      valueField,
      ButtonView,
      OptionView,
      popupProps,
      buttonClassName,
      arrow,
      allowEmpty,
    } = this.props;
    const blocked = disabled || loading || options.length === 0 && !allowEmpty;
    const selected = value && options.find(
      option => option === value || option[valueField] === value
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
          className={buttonClassName}
        >
          <ButtonView option={selected} props={this.props} />
          <div
            className={cx(
              s.arrow,
              this.state.open ? s.up : s.down,
              arrow || s.hidden
            )}
          >
            <Arrow />
          </div>
          <IPopup
            {...popupProps}
            disabled={blocked}
            onToggle={this.toggle}
            ref={el => {this.popup = el;}}
          >
            <div
              className={cx(
                s.options,
                options.length || s.hidden
              )}
              onMouseLeave={this.setActive.bind(this, -1)}
            >
              {
                options.map(
                  (option, i) => (
                    <div
                      key={option[valueField] || option}
                      className={cx(
                        s.option,
                        i === this.state.active && s.active
                      )}
                      onClick={this.select.bind(this, option)}
                      onMouseEnter={this.setActive.bind(this, i)}
                    >
                      <div className={s.check}>
                        {option === selected && <Check />}
                      </div>
                      <OptionView option={option} props={this.props} />
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

function DefaultView({ option, props: { placeholder, valueField } }) {
  return (
    <span
      className= {option ? '' : s.placeholder}
    >
      {
        option
          ? option.label || option[valueField] || option
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
  onSelect: Function.prototype,
  arrow: true,
  allowEmpty: false,
};

ISelect.propTypes = {
  ...IButton.propTypes,
  options: PropTypes.array,
  valueField: PropTypes.string,
  ButtonView: PropTypes.oneOfType([
    PropTypes.instanceOf(Component),
    PropTypes.func,
  ]),
  OptionView: PropTypes.oneOfType([
    PropTypes.instanceOf(Component),
    PropTypes.func,
  ]),
  value: PropTypes.any,
  placeholder: PropTypes.string,
  popupProps: PropTypes.shape(IPopup.propTypes),
  onSelect: PropTypes.func,
  arrow: PropTypes.bool,
  allowEmpty: PropTypes.bool,
  buttonClassName: PropTypes.string,
};

export { ISelect };
