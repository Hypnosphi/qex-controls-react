/**
 * Created by hypnos on 15/04/16.
 */

import React, { PropTypes } from 'react';
import { Cross } from '../Icons.js';
import s from './IInput.scss';
import cx from 'classnames';

function IInput(props) {
  const {
    size,
    disabled,
    value,
    placeholder,
    loading,
    onChange,
    onInput,
    onKey,
    mode: TagName,
    className,
    autoFocus,
  } = props;
  let input;

  return (
    <div
      className={cx(
        s.root,
        ...['disabled', 'loading']
          .filter(name => props[name])
          .map(name => s[name]),
        s[`size-${size}`],
        className
      )}
    >
      <TagName
        {
          ...{
            disabled,
            loading,
            value,
            placeholder,
          }
        }
        ref={function ref(el) {
          input = el;
          autoFocus(el && el.focus.bind(el));
        }}

        onChange={function changeHandler(e) {
          onChange(props, e);
        }}

        onKeyUp={onKey}
        onKeyDown={onKey}
        className={s.input}
      />
      <div
        className={s.clear}
        onClick={function clickHandler() {
          if (input) {
            input.focus();
          }

          onInput('');
        }}

        hidden={!value || disabled || loading}
      >
        <Cross />
      </div>
      <div
        className={s.loader}
        hidden={!loading}
      >
        <svg>
          <circle
            cx="50%" cy="50%"
            r="20%"
          />
        </svg>
      </div>
    </div>
  );
}

IInput.defaultProps = {
  size: 'M',
  disabled: false,
  loading: false,
  mode: 'input',
  onChange({ onInput }, e) {
    onInput(e.target.value);
  },

  onInput: Function.prototype,
  onKey: Function.prototype,
  autoFocus: Function.prototype,
};

IInput.propTypes = {
  size: PropTypes.oneOf(['XS', 'S', 'M', 'L']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onInput: PropTypes.func,
  onKey: PropTypes.func,
  mode: PropTypes.oneOf(['input', 'textarea']),
  autoFocus: PropTypes.func,
  className: PropTypes.string,
};

export { IInput };
