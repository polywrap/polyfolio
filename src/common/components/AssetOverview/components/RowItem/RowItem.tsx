import React from 'react';

import classNames from 'classnames';
import useTheme from 'common/hooks/useTheme/useTheme';
import style from './RowItem.module.scss';

import iconsObj from 'assets/icons/iconsObj';
import Icon from 'common/components/Icon/Icon';
import Skeleton from 'common/components/Loaders/Skeleton';

function RowItem({label, content, type}) {
  const theme = useTheme();

  return (
    <div className={classNames(style[theme], style.parent, type === 'main' ? style.main : '')}>
      {type === 'main' ? <Icon src={iconsObj.profile} className={style.img} /> : ''}
      <div className={style.text}>
        <div className={style.label}>{label}</div>
        <div
          className={classNames(
            style.content,
            type === 'profit' ? style.profit : '',
            type === 'loss' ? style.loss : '',
          )}
        >
          {content ? content : <Skeleton width={190} height={64} />}
        </div>
      </div>
    </div>
  );
}

export default RowItem;
