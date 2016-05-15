/**
 * Created by hypnos on 15/04/16.
 */

import React, {Component, PropTypes} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './IButton.scss';
import cx from 'classnames';

function IButton(props) {
  var {
        size,
        disabled,
        loading,
        onAction,
        children,
        fake
      } = props,
      blocked = disabled || loading,
      TagName = fake ? 'div' : 'button';

  return (
    <TagName
      type="button"
      tabIndex={blocked ? "-1" : "0"}
      disabled={blocked}
      className={cx(
        s.root,
        ...['checked', 'loading', 'action']
          .filter(name => props[name])
          .map(name => s[name]),
        s[`size-${size}`]
      )}
      onClick={onAction}
    >
      <div className={s.face}>
        {children}
      </div>
    </TagName>
  );
}

IButton.defaultProps = {
  size: 'M',
  checked:  false,
  disabled: false,
  loading:  false,
  action: false,
  onAction: e => e.stopPropagation()
}

IButton.propTypes = {
  size: PropTypes.oneOf(['XS', 'S', 'M', 'L']),
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  action: PropTypes.bool,
  onAction: PropTypes.func
}

let styled = withStyles(IButton, s);

export {styled as IButton};
