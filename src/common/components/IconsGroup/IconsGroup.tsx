import React, {useMemo} from 'react';
import {v4 as uuidv4} from 'uuid';

import iconsObj from 'assets/icons/iconsObj';
import styles from './IconsGroup.module.scss';
import Icon from 'common/components/Icon/Icon';

export default function IconsGroup({array}) {
  const data = useMemo(() => {
    const icons = [];
    let distance = 0;

    if (array?.length > 3) {
      array?.forEach((item) => {
        icons.push({
          icon: item?.icon,
          style: {
            position: 'relative',
          },
        });
        icons.push({
          icon: iconsObj.manyAssets,
          style: {
            position: 'absolute',
            marginLeft: 13.3,
          },
        });

        return;
      });
    } else {
      array?.forEach((item) => {
        icons.push({
          icon: item?.icon,
          style: {
            marginLeft: distance,
          },
        });
        distance += 13.3;
      });
    }

    return icons;
  }, [array]);

  return (
    <div className={styles.IconsGroup}>
      {data.map((icon) => (
        <Icon key={uuidv4()} src={icon.icon} style={icon.style} className={styles.icon} />
      ))}
    </div>
  );
}
