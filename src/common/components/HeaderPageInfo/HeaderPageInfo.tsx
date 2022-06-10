import React, { useMemo } from 'react';
import classNames from 'classnames';

import styles from './HeaderPageInfo.module.scss';

import useTheme from 'common/hooks/useTheme/useTheme';
import {content} from './HeaderPageInfo.config';
import numberFormatter from 'utils/numberFormatter';
import useTranslation from 'common/hooks/useTranslation/useTranslation';

interface IPageSummary {
  title: string,
  fluctuation?: {
    percent: string | number,
    price: string | number,
  }
}

function HeaderPageInfo(props: IPageSummary) {
  const theme = useTheme();
  const translation = useTranslation();
  const {title, fluctuation} = props;

  const fluctuationExist = useMemo(() => {
    return fluctuation && Object.keys(fluctuation).length > 0 ? true : false;
  }, [])

  return (
    <div className={classNames(styles[theme], styles.headerPageInfoContainer)}>
      <span className={styles.secondaryTitle}>{translation.Dashboard.secondaryTitle}</span>
      <h2>${numberFormatter(title || content.title)}</h2>
      {!fluctuationExist ?? (
        <div className={styles.secondaryValue}>
          <div className={styles.value}>+{numberFormatter(content.percent)}%</div>
          <div className={classNames(styles.value, styles.percent)}>
            +${numberFormatter(content.value)}
          </div>
        </div>
      )}
    </div>
  );
}

export default HeaderPageInfo;
