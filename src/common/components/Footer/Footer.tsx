import React from 'react';
import classNames from 'classnames';

import styles from './Footer.module.scss';

import Logo from 'common/components/Logo/Logo';
import useTheme from 'common/hooks/useTheme/useTheme';
import FooterLinks from 'common/components/FooterLinks/FooterLinks';

function Header({wrapperClassName = ''}: {wrapperClassName?: string}) {
  const theme = useTheme();

  return (
    <div className={classNames(styles.common_footer, wrapperClassName, styles[theme])}>
      <footer data-testid="footer" className={styles.footer}>
        <Logo className={styles.logo} />
        <FooterLinks className={styles.links} />
        <div className={styles.copyright}>&copy; {new Date().getFullYear()} Polyfolio</div>
      </footer>
    </div>
  );
}

export default Header;
