import React, { useState } from 'react';
import styles from './Cooperation.module.scss'
import { Link } from 'react-router-dom';
interface CooperationProps {
  id:number;
  logo: string;
  name: string;
  categories: string[];
  onCollaborate: () => void;
  path:string;
}


const Cooperation: React.FC<CooperationProps> = ({id, logo, name, categories, onCollaborate,path }) => {

  return (
    <Link className={styles.container} to={`/supplier/${id}`}>
      <img src={logo}  className={styles.company_logo}/>
      <div className={styles.flex_block}>
         <div className={styles.company_name}>{name}</div>
      <button className={styles.cooperation_button} onClick={onCollaborate}>Начать сотрудничество</button>
      </div>
     
      <div className={styles.line}></div>
      <div className={styles.categories_products}>Категории продуктов</div>
      <div>{categories.join(', ')}</div>
    </Link>
  );
};

export default Cooperation;