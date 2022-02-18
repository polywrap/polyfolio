import React from 'react';
import {Link} from 'react-router-dom';

import styles from './FooterLinks.module.scss';

import _map from 'lodash/map';
import classNames from 'classnames';

import {FooterLink} from './FooterLinks.types';
import {footerLinks} from './FooterLinks.config';
import useTheme from 'common/hooks/useTheme/useTheme';
import useTranslation from 'common/hooks/useTranslation/useTranslation';
import navigateToExternalLink from 'utils/navigateToExternalLink';

function FooterLinks({className = ''}: {className?: string}) {
  const theme = useTheme();
  const translation = useTranslation();

  return (
    <div className={classNames(styles.common_footer_links, styles[theme], className)}>
      {_map(footerLinks, ({link, title, isExternal}: FooterLink) => {
        return (
          <Link
            onClick={(event) => navigateToExternalLink({event, link, isExternal})}
            key={title}
            className={styles.link}
            to={link}
          >
            {translation.FooterLinks[title]}
          </Link>
        );
      })}
    </div>
  );
}

export default FooterLinks;
