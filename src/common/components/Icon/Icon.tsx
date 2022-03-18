import React, {ImgHTMLAttributes} from 'react';
import classNames from 'classnames';

import styles from './Icon.module.scss';

export interface IconProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string;
}

function Icon({src, className = '', ...others}: IconProps) {
  return <img src={src} {...others} className={classNames(className, [styles.common_icon])} />;
}

export default Icon;
