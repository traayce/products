import * as React from 'react';
import * as styles from './style.scss';

const Footer: React.SFC<{}> = (props) => {
  return (
    <footer className={styles.footer}>
      <p>🎉 Presentational App </p>
    </footer>
  );
};

export default Footer;
