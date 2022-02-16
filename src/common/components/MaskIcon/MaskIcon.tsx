import React, {CSSProperties} from 'react';

import styles from './MaskIcon.module.scss';

import classNames from 'classnames';
import useTheme from 'common/hooks/useTheme/useTheme';

export interface CLMaskIconProps {
  src: string;
  className?: string;
  onClick?: (e?: React.MouseEvent) => void;
  onMouseDown?: (e?: React.MouseEvent) => void;
  size?: string;
  bgColor?: string;
}

function CLMaskIcon({src, className = '', onClick, bgColor, onMouseDown, size}: CLMaskIconProps) {
  const theme = useTheme();
  const style: CSSProperties = {
    WebkitMask: `url(${src}) no-repeat center/contain`,
  };

  if (bgColor) {
    style.backgroundColor = bgColor;
  }

  if (size) {
    style.width = size;
    style.height = size;
  }

  return (
    <div
      className={classNames([styles.common_mask_icon], styles[theme], className)}
      style={style}
      onClick={onClick}
      onMouseDown={onMouseDown}
    />
  );
}

export default CLMaskIcon;
