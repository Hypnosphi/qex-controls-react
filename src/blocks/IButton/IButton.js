/**
 * Created by hypnos on 15/04/16.
 */

import React, { PropTypes } from 'react';
import s from './IButton.scss';
import cx from 'classnames';

function IButton(props) {
  const {
    size,
    disabled,
    loading,
    onAction,
    onKeyDown,
    onKeyUp,
    children,
    fake,
    className,
  } = props;
  const blocked = disabled || loading;
  const TagName = fake ? 'div' : 'button';

  return (
    <TagName
      type="button"
      tabIndex={blocked ? '-1' : '0'}
      disabled={blocked}
      className={cx(
        s.button,
        ...['checked', 'loading', 'action']
          .filter(name => props[name])
          .map(name => s[name]),
        s[`size-${size}`],
        className
      )}
      onClick={onAction}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
    >
      {children}
    </TagName>
  );
}

IButton.defaultProps = {
  size: 'M',
  checked: false,
  disabled: false,
  loading: false,
  action: false,
  fake: false,
  onAction: e => e.stopPropagation(),
  onKeyDown: Function.prototype,
  onKeyUp: Function.prototype,
};

IButton.propTypes = {
  size: PropTypes.oneOf(['XS', 'S', 'M', 'L']),
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  action: PropTypes.bool,
  fake: PropTypes.bool,
  onAction: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.any,
};

export { IButton };
