import React from 'react';
import s from './PopupExample.scss';
import { IPopup } from '../../blocks';

function Popup({
  ownerLabel,
  contentLabel,
  children,
  side,
}) {
  return (
    <div className={s.owner}>
      {ownerLabel}
      <IPopup tail side={side}>
        <div className={s.popup}>
          {contentLabel}
          {children && children()}
        </div>
      </IPopup>
    </div>
  );
}

function PopupExample() {
  return (
    <div className={s.group}>
      <h3>IPopup</h3>
      <div className={s.example}>
        <h4>Simple</h4>
        <div className={s.container}>
          <Popup
            ownerLabel="Popup owner"
            contentLabel="Popup content"
          />
        </div>
      </div>
      <div className={s.example}>
        <h4>Nested</h4>
        <div className={s.container}>
          <Popup
            ownerLabel="Parent's owner"
            contentLabel="Parent's content"
          >
            {() =>
              <Popup
                ownerLabel="Child's owner"
                contentLabel="Child's content"
                side="left"
              />
            }
          </Popup>
        </div>
      </div>
    </div>
  );
}

export default PopupExample;
