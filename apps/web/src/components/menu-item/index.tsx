import React from 'react';
import styles from './menu-item.module.scss';

interface MenuItemProps {
  title: string;
  onClick: () => void;
}

export const MenuItem = ({ title, onClick }: MenuItemProps) => {
  return (
    <div
      className={styles.menuItemContainer}
      onClick={onClick}
      onKeyUp={() => {}}
    >
      <span className={styles.text}>{title}</span>
    </div>
  );
};
