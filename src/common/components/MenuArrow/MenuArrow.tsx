import React from 'react';
import classNames from 'classnames';

import styles from './MenuArrow.module.scss';
import iconsObj from 'assets/icons/iconsObj';
import useTheme from 'common/hooks/useTheme/useTheme';
import MaskIcon from 'common/components/MaskIcon/MaskIcon';

export interface CLMenuArrowProps {
  startPosition?: 'up' | 'down' | 'right' | 'left' | 'none';
  className?: string;
  size?: string;
}

function MenuArrow({startPosition = 'none', className = '', size = '10px'}: CLMenuArrowProps) {
  const theme = useTheme();

  return (
    <MaskIcon
      src={iconsObj.menuArrow}
      size={size}
      className={classNames(
        styles.common_menu_arrow,
        styles[theme],
        styles[startPosition],
        className,
      )}
    />
  );
}

export default MenuArrow;
