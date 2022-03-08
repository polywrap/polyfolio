import React from 'react';
import useTheme from 'common/hooks/useTheme/useTheme';
import useTranslation from 'common/hooks/useTranslation/useTranslation';
import classNames from 'classnames';
import styles from './ButtonCsv.module.scss';
import Icon from '../Icon/Icon';
import iconsObj from 'assets/icons/iconsObj';

function ButtonCsv(className) {
  const theme = useTheme();
  const translation = useTranslation();

  return (
    <button className={classNames(styles[theme], className, styles.btn)}>
      <Icon className={styles.icon} src={iconsObj.exportIcon} />
      {translation.Buttons.exportAsCSV}
    </button>
  );
}

export default ButtonCsv;
