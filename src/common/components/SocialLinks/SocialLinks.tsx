import React from 'react';
import _map from 'lodash/map';
import classNames from 'classnames';
import {Link} from 'react-router-dom';

import styles from './SocialLinks.module.scss';

import {SocialLink} from './SocialLinks.types';
import {socialLinks} from './SocialLinks.config';
import useTheme from 'common/hooks/useTheme/useTheme';
import MaskIcon from 'common/components/MaskIcon/MaskIcon';
import navigateToExternalLink from 'utils/navigateToExternalLink';

function SocialLinks() {
  const theme = useTheme();

  return (
    <div className={classNames(styles.common_social_links, styles[theme])}>
      {_map(socialLinks, ({link, icon, isExternal}: SocialLink) => {
        return (
          <Link
            key={icon}
            onClick={(event) => navigateToExternalLink({event, link, isExternal})}
            className={styles.link}
            to={link}
          >
            <MaskIcon size={'24px'} src={icon} className={styles.icon} />
          </Link>
        );
      })}
    </div>
  );
}

export default SocialLinks;
