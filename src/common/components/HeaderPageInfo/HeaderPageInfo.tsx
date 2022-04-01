import React from 'react';
import classNames from 'classnames';

import styles from './HeaderPageInfo.module.scss';

import useTheme from 'common/hooks/useTheme/useTheme';
import {content} from './HeaderPageInfo.config';
import {toFixed} from 'utils/helpers';
import useTranslation from 'common/hooks/useTranslation/useTranslation';

function HeaderPageInfo({title}: {title: number}) {
  const theme = useTheme();
  const translation = useTranslation();

  return (
    <div className={classNames(styles[theme], styles.headerPageInfoContainer)}>
      <span className={styles.secondaryTitle}>{translation.Dashboard.secondaryTitle}</span>
      <h2>${toFixed({value: title || content.title, size: 2})}</h2>
      <div className={styles.secondaryValue}>
        <div className={styles.value}>+{toFixed({value: content.percent, size: 2})}%</div>
        <div className={classNames(styles.value, styles.percent)}>
          +${toFixed({value: content.value, size: 2})}
        </div>
      </div>
    </div>
  );
}

export default HeaderPageInfo;
