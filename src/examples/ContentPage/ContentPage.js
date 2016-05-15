/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import s from './ContentPage.scss';
import Introduction from '../Introduction';
import ButtonExample from '../ButtonExample';
import ButtonGroupExample from '../ButtonGroupExample';
import InputExample from '../InputExample';
import PopupExample from '../PopupExample';
import SelectExample from '../SelectExample';
import SuggestExample from '../SuggestExample';

function ContentPage() {
  return (
    <div className={s.root}>
      <Introduction />
      <ButtonExample />
      <PopupExample />
      <SelectExample />
      <InputExample />
      <SuggestExample />
      <ButtonGroupExample />
    </div>
  );
}

export default ContentPage;
