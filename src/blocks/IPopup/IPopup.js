/**
 * Created by hypnos on 15/04/16.
 */

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import s from './IPopup.scss';

const sideMap = {
  top: {
    start: 'left',
    end: 'right',
    width: 'width',
    minWidth: 'minWidth',
    height: 'height',
    opposite: 'bottom',
    sign: +1,
  },
  bottom: {
    start: 'left',
    end: 'right',
    width: 'width',
    minWidth: 'minWidth',
    height: 'height',
    opposite: 'top',
    sign: -1,
  },
  left: {
    start: 'top',
    end: 'bottom',
    width: 'height',
    minWidth: 'minHeight',
    height: 'width',
    opposite: 'right',
    sign: +1,
  },
  right: {
    start: 'top',
    end: 'bottom',
    width: 'height',
    minWidth: 'minHeight',
    height: 'width',
    opposite: 'left',
    sign: -1,
  },
};

function* parents(el) {
  let parent = el;
  while (parent) {
    yield parent = parent.parentElement;
  }
}

function IPopupContent(props) {
  const {
    open,
    position,
    align,
    tail,
    tailWidth,
    tailHeight,
    tailSide,
    tailOffset,
    children,
  } = props;
  const map = sideMap[tailSide];

  return (
    <div
      style={position}
      hidden={!open}
      className={s.popup}
    >
      {
        tail &&
          <div
            style={{
              [map.height]: tailHeight,
              [map.width]: tailWidth,
              [map[align]]: tailOffset - tailWidth / 2,
              [tailSide]: -tailHeight,
            }}
            className={s.tail}
          >
            <svg
              style={{
                position: 'absolute',
                [map.height]: '200%',
                [map.width]: '100%',
                [map.start]: 0,
                [tailSide]: 0,
              }}
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path
                d="M50,0 L100,50 L50,100 L0,50 Z"
              />
            </svg>
          </div>
      }
      {children}
    </div>
  );
}

IPopupContent.defaultProps = {
  open: false,
  position: {
    top: 0,
    left: 0,
  },
  align: 'start',
  tail: false,
  tailSide: 'top',
  tailWidth: 12,
  tailHeight: 6,
  tailOffset: 6,
};

IPopupContent.propTypes = {
  open: PropTypes.bool,
  position: PropTypes.shape({
    top: PropTypes.number,
    left: PropTypes.number,
  }),
  align: PropTypes.oneOf(['start', 'end']),
  tail: PropTypes.bool,
  tailSide: PropTypes.oneOf(Object.keys(sideMap)),
  tailWidth: PropTypes.number,
  tailHeight: PropTypes.number,
  tailOffset: PropTypes.number,
};

class IPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.setOwner = this.setOwner.bind(this);
    this.toggle = this.toggle.bind(this);
    this.setRects = this.setRects.bind(this);
    this.autoclose = this.autoclose.bind(this);
  }

  componentDidMount() {
    for (const el of parents(this.owner)) {
      if (el.matches(`body, .${s.root}`)) {
        this.parent = el;
        break;
      }
    }
    this.popup = document.createElement('div');
    this.popup.className = s.root;
    this.parent.appendChild(this.popup);
    window.addEventListener(
      'resize',
      this.setRects
    );
    window.addEventListener(
      'click',
      this.autoclose,
      true // use capture
    );
    this.owner.addEventListener(
      'click',
      this.toggle
    );
    this.setRects();
    this.scheduleRects();
  }

  componentDidUpdate() {
    this.renderPopup();
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.popup);
    this.parent.removeChild(this.popup);
    if (this.owner) {
      this.owner.removeEventListener(
        'click',
        this.toggle
      );
    }
    window.removeEventListener(
      'resize',
      this.setRects
    );
    window.removeEventListener(
      'click',
      this.autoclose,
      true
    );
  }

  setOwner(ref) {
    if (this.owner || !ref) {
      return;
    }
    this.owner = ref.parentElement;
  }

  setRects() {
    this.setState({
      ...this.state,
      ownerRect: this.owner.getBoundingClientRect(),
      popupRect: this.popup.getBoundingClientRect(),
    });
  }

  scheduleRects() {
    window.setTimeout(
      this.setRects,
      0
    );
  }

  autoclose(e) {
    if (
      this.popup.contains(e.target)
        || this.state.open
    ) {
      window.setTimeout(
        () => this.toggle(false),
        0
      );
    }
  }

  toggle(on) {
    const open =
      !this.props.disabled && (
        typeof on === 'boolean'
          ? on
          : !this.state.open
      );
    this.setState({
      ...this.state,
      open,
    });
    if (open) {
      this.scheduleRects();
    }
    this.props.onToggle(open);
  }

  renderPopup() {
    const {
      side,
      align,
      sideOffset,
      alignOffset,
      tail,
      tailHeight,
      tailWidth,
      tailAlign,
      tailAlignOffset,
    } = this.props;
    const map = sideMap[side];
    const alignSide = map[align];
    const {
      open,
      ownerRect,
      popupRect,
    } = this.state;

    let tailOffset;
    switch (tailAlign) {
      case 'center':
        tailOffset = ownerRect[map.width] / 2 + tailAlignOffset;
        break;
      case align:
        tailOffset = tailAlignOffset;
        break;
      default:
        tailOffset = ownerRect[map.width] - tailAlignOffset;
    }

    tailOffset = Math.max(
      tailOffset,
      tailWidth / 2
    );

    const position = {
      [map.opposite]: sideMap[map.opposite].sign * ownerRect[map.opposite]
      + ownerRect[map.height]
      + sideOffset
      + tailHeight
      - sideMap[map.opposite].sign * popupRect[map.opposite],
      [alignSide]: sideMap[alignSide].sign * ownerRect[alignSide]
      + alignOffset
      - sideMap[alignSide].sign * popupRect[alignSide],
      [map.minWidth]: tail && tailOffset + tailWidth / 2,
    };
    ReactDOM.render(
      <IPopupContent
        {...this.props}
        {...{
          open,
          position,
          tailOffset,
        }}
        tailSide={map.opposite}
      >
        {this.props.children}
      </IPopupContent>,
      this.popup
    );
  }

  render() {
    return (
      <div
        hidden
        ref={this.setOwner}
      />
    );
  }
}

IPopup.defaultProps = {
  ...IPopupContent.defaultProps,
  side: 'bottom',
  sideOffset: 6,
  alignOffset: 1,
  tailAlign: 'center',
  tailAlignOffset: 0,
  disabled: false,
  onToggle: Function.prototype,
};

IPopup.propTypes = {
  ...IPopupContent.propTypes,
  side: PropTypes.oneOf(Object.keys(sideMap)),
  sideOffset: PropTypes.number,
  alignOffset: PropTypes.number,
  tailAlign: PropTypes.oneOf(['start', 'end', 'center']),
  tailAlignOffset: PropTypes.number,
  disabled: PropTypes.bool,
  onToggle: PropTypes.func,
  children: PropTypes.any,
};

export { IPopupContent, IPopup };
