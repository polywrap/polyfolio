import React from 'react';
import classNames from 'classnames';

import styles from './HeaderPageInfo.module.scss';

import useTheme from 'common/hooks/useTheme/useTheme';
import {content} from './HeaderPageInfo.config';
import numberFormatter from 'utils/numberFormatter';
import useTranslation from 'common/hooks/useTranslation/useTranslation';

function HeaderPageInfo({title}: {title: string}) {
  const theme = useTheme();
  const translation = useTranslation();

  return (
    <div className={classNames(styles[theme], styles.headerPageInfoContainer)}>
      <span className={styles.secondaryTitle}>{translation.Dashboard.secondaryTitle}</span>
      <h2>${numberFormatter(title || content.title)}</h2>
      <div className={styles.secondaryValue}>
        <div className={styles.value}>+{numberFormatter(content.percent)}%</div>
        <div className={classNames(styles.value, styles.percent)}>
          +${numberFormatter(content.value)}
        </div>
      </div>
    </div>
  );
}

export default HeaderPageInfo;
