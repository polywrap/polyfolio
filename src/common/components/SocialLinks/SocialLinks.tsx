import React, {useCallback} from 'react';
import _map from 'lodash/map';
import classNames from 'classnames';
import {Link} from 'react-router-dom';

import styles from './SocialLinks.module.scss';

import {SocialLink} from './SocialLinks.types';
import {socialLinks} from './SocialLinks.config';
import useTheme from 'common/hooks/useTheme/useTheme';
import MaskIcon from 'common/components/MaskIcon/MaskIcon';
import navigateToExternalLink from 'utils/navigateToExternalLink';
import useSearch from 'common/hooks/useSearch/useSearch';

function SocialLinks() {
  const theme = useTheme();
  const {search, setSearch} = useSearch();

  const handleClick = useCallback(
    (event, link, isExternal) => {
      if (search) {
        setSearch(null);
      }
      navigateToExternalLink({event, link, isExternal});
    },
    [search, setSearch],
  );

  return (
    <div className={classNames(styles.common_social_links, styles[theme])}>
      {_map(socialLinks, ({link, icon, isExternal}: SocialLink) => {
        return (
          <Link
            key={icon}
            onClick={(event) => handleClick(event, link, isExternal)}
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
