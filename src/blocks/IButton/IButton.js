/**
 * Created by hypnos on 15/04/16.
 */

import {Component, PropTypes:{bool, oneOf, func}} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './IButton.scss';
import cx from 'classnames';

function IButton(props) {
  var {
        size,
        disabled,
        loading,
        onAction,
        children
      } = props;

  return (
    <button
      type="button"
      disabled={disabled || loading}
      className={cx(
        s.root,
        ...[checked, loading, action]
          .filter(name => props.name)
          .map(name => s.name),
        s[`size-@{size}`]
      )}
      onClick={onAction}
    >
      <div className={s.face}>
        {children}
      </div>
    </button>
  );
  }
}

IButton.defaultProps = {
  size: 'M',
  checked:  false,
  disabled: false,
  loading:  false,
  action: false
}

IButton.propTypes = {
  size: oneOf(['XS', 'S', 'M', 'L']),
  checked: bool,
  disabled: bool,
  loading: bool,
  action: bool,
  onAction: func
}
