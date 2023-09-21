import React, { useState } from 'react';
import styles from './Cooperation.module.scss'
interface CooperationProps {
  logo: string;
  name: string;
  categories: string[];
  onCollaborate: () => void;
}

const Cooperation: React.FC<CooperationProps> = ({ logo, name, categories, onCollaborate }) => {
  return (
    <div className={styles.container}>
      <img src={logo}  className={styles.company_logo}/>
      <div className={styles.flex_block}>
         <div className={styles.company_name}>{name}</div>
      <button className={styles.cooperation_button} onClick={onCollaborate}>Начать сотрудничество</button>
      </div>
     
      <div className={styles.line}></div>
      <div className={styles.categories_products}>Категории продуктов</div>
      <div>{categories.join(', ')}</div>
     
    </div>
  );
};

export default Cooperation;