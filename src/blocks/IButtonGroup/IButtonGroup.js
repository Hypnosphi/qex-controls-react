/**
 * Created by hypnos on 15/04/16.
 */

import React, { Component, PropTypes } from 'react';
import { IButton } from '../IButton';
import s from '../IButton/IButton.scss';

function IButtonGroup(props) {
  const {
    buttonProps,
    buttons,
    ButtonView,
    onAction,
    selected,
  } = props;

  return (
    <div
      className={s.group}
    >
      {buttons.map(
        (button, i) => {
          const key = button.value || i;
          const buttonObj =
            typeof button === 'string'
              ? { label: button }
              : button;
          return (
            <IButton
              key = {key}
              checked={selected.includes(key)}
              onAction={function actionHandler(e) {
                onAction(props, key, e);
              }}

              {...buttonProps}
              {...buttonObj.props}
            >
              <ButtonView {...buttonObj} />
            </IButton>
          );
        }
      )}
    </div>
  );
}

IButtonGroup.defaultProps = {
  ButtonView: ({ label }) => <span>{label}</span>,
  selected: [],
  mode: 'radio',
  onAction({
    onChange,
    mode,
    selected,
  }, key, e) {
    const includes = selected.includes(key);
    const set = new Set(selected);
    e.stopPropagation();
    switch (mode) {
      case 'radiocheck':
        onChange(includes ? [] : [key]);
        break;
      case 'check':
        set[includes ? 'delete' : 'add'](key);
        onChange([...set]);
        break;
      case 'radio':
      default:
        onChange([key]);
        break;
    }
  },

  onChange: Function.prototype,
};

IButtonGroup.propTypes = {
  buttonProps: PropTypes.shape(IButton.propTypes),
  buttons: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        props: PropTypes.shape(IButton.propTypes),
      }),
    ])
  ),
  ButtonView: PropTypes.oneOfType([
    PropTypes.instanceOf(Component),
    PropTypes.func,
  ]),
  selected: PropTypes.array,
  mode: PropTypes.oneOf(['radio', 'radiocheck', 'check']),
  onChange: PropTypes.func,
  onAction: PropTypes.func,
};

export { IButtonGroup };
