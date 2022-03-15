import React from 'react';
import classNames from 'classnames';

import styles from './HeaderPageInfo.module.scss';

import useTheme from 'common/hooks/useTheme/useTheme';
import {content} from './HeaderPageInfo.config';
import numberFormatter from 'utils/numberFormatter';
import useTranslation from 'common/hooks/useTranslation/useTranslation';

function HeaderPageInfo({title}) {
  const theme = useTheme();
  const translation = useTranslation();

  return (
    <div className={classNames(styles[theme], styles.headerPageInfoContainer)}>
      <span className={styles.secondaryTitle}>{translation.Dashboard.secondaryTitle}</span>
      <h2>${numberFormatter({value: title || content.title, size: 2})}</h2>
      <div className={styles.secondaryValue}>
        <div className={styles.value}>+{numberFormatter({value: content.percent, size: 2})}%</div>
        <div className={classNames(styles.value, styles.percent)}>
          +${numberFormatter({value: content.value, size: 2})}
        </div>
      </div>
    </div>
  );
}

export default HeaderPageInfo;
