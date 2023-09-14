import React, { useState } from 'react';
import styles from './CategoryDropdown.module.scss'
import {LiaAngleUpSolid,LiaAngleDownSolid} from 'react-icons/lia'
import {TbSquare,TbSquareMinusFilled,TbSquareCheckFilled} from 'react-icons/tb'
interface Category {
  name: string;
  isChecked: boolean;
}
type Props = {
    title:string
};
function CategoryDropdown({title}: Props){
  const [categories, setCategories] = useState<Category[]>([
    { name: 'Помидоры', isChecked: false },
    { name: 'Огурцы', isChecked: false },
    { name: 'Перец', isChecked: false },
    // Add more categories as needed
  ]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleCheckbox = (index: number) => {
    const updatedCategories = [...categories];
    updatedCategories[index].isChecked = !updatedCategories[index].isChecked;
    setCategories(updatedCategories);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className={styles.category_dropdown}>
      <div className={styles.category_heading} onClick={toggleDropdown}>
        <div >{title} </div> 
        <div className={styles.block}>{isDropdownOpen && (<LiaAngleUpSolid className={styles.icon}/>)}</div>
      </div>
      {isDropdownOpen && (
        <ul className={styles.category_list}>
          {categories.map((category, index) => (
            <li key={index} className={styles.li}>
              <label className={styles.label}>
               < TbSquareMinusFilled className={styles.icon}/>
                {category.name}
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryDropdown;