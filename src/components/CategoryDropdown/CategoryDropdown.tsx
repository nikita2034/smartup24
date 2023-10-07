import React, { useState } from 'react';
import styles from './CategoryDropdown.module.scss'
import {LiaAngleUpSolid,LiaAngleDownSolid} from 'react-icons/lia'
import {TbSquare,TbSquareMinusFilled,TbSquareCheckFilled} from 'react-icons/tb'

type Company={
  title: string;
  selected: boolean;
}
type Props = {
    title:string
    categories:Company[]
};
function CategoryDropdown({title,categories}: Props){

const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className={styles.category_dropdown}>
      <div className={styles.category_heading} onClick={toggleDropdown}>
        <div className={styles.title}>{title} </div> 
        <div className={styles.block}>{isDropdownOpen && (<LiaAngleUpSolid className={styles.icon}/>)}</div>
      </div>
      {isDropdownOpen && (
        <ul className={styles.category_list}>
          {categories.map((category, index) => (
            <li key={index} className={styles.li}>
              <label className={styles.label}>
               < TbSquareMinusFilled className={styles.icon}/>
                {category.title}
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryDropdown;