import React, { useState } from 'react';

import classNames from 'classnames';
import useTheme from 'common/hooks/useTheme/useTheme';
import style from './TableHeader.module.scss';
import iconsObj from 'assets/icons/iconsObj';
import Icon from 'common/components/Icon/Icon';
import Input from 'common/components/Input/Input';

function TableHeader() {
  const theme = useTheme()
  const [value, setValue] = useState<string>()

  return (
    <div className={classNames(style[theme], style.controlls)}>
      <div>
        <Input
          value={value}
          onChange={setValue}
          icon={iconsObj.search}
          wrapperClassName={classNames(style.input)}
          placeholder='Search by date or event type (ex: send)'
        />
      </div>
      <div className={style.right}>
        <div className={style.networks}>Networks - 7/7</div>
        <div className={style.pagination}>
          <Icon
            src={iconsObj.leftArrow}
            className={classNames(style.arrow, style.left)}
          />
          Page 1 of 2
          <Icon
            src={iconsObj.rightArrow}
            className={classNames(style.arrow, style.right)}
          />
        </div>
      </div>
    </div>
  )
}

export default TableHeader
