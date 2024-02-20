import React from 'react';
import styles from './Cooperation.module.scss'
import { Link } from 'react-router-dom';
interface CooperationProps {
  id:Object;
  logo: string;
  name: string;
  categories: string[];
  onCollaborate: (id:string) => void;
  path:string
}


const Cooperation: React.FC<CooperationProps> = ({path, id, logo, name, categories, onCollaborate }) => {

  return (
    <Link className={styles.container} to={`/${path}/${id}`}>
      <img src={logo}  className={styles.company_logo}/>
      <div className={styles.flex_block}>
         <div className={styles.company_name}>{name}</div>
      <button className={styles.cooperation_button} onClick={()=>onCollaborate(String(id))}>Начать сотрудничество</button>
      </div>
     
      <div className={styles.line}></div>
      <div className={styles.categories_products}>Категории продуктов</div>
      {/* <div>{categories.join(', ')}</div> */}
    </Link>
  );
};

export default Cooperation;