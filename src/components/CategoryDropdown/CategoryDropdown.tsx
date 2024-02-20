import React, { useState,useEffect } from 'react';
import styles from './CategoryDropdown.module.scss'
import {LiaAngleUpSolid,LiaAngleDownSolid} from 'react-icons/lia'
import {BsCheckSquare,BsSquare} from 'react-icons/bs'

type Company={
  title: string;
  selected: boolean;
}
type HandleInputChange = (
  property: keyof FilterOptions,
  value: string
) => void;

type Props = {
    title:string
    categories:Company[]
    handleInputChange:HandleInputChange
};
interface FilterOptions {
  minPrice?: number;
  maxPrice?: number;
  categories?: string[];
  manufacturers?: string[];
  suppliers?: string[];
}


function CategoryDropdown({title,categories,handleInputChange}: Props){

const [isDropdownOpen, setIsDropdownOpen] = useState(false);
const [selectedCategories, setSelectedCategories] = useState<string[]>([]);


  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleCategory = (category: string) => {
    handleInputChange(title,category)
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <div className={styles.category_dropdown}>
      <div className={styles.category_heading} onClick={toggleDropdown}>
        <div className={styles.title}>{title} </div> 
        <div className={styles.block}>{isDropdownOpen ? <LiaAngleUpSolid className={styles.icon}/>:< LiaAngleDownSolid/>}</div>
      </div>
      {isDropdownOpen && (
        <ul className={styles.category_list}>
          {categories.map((category, index) => (
            <li key={index} className={styles.li} onClick={()=>toggleCategory(category.title)}>
              <label className={styles.label}>
               {selectedCategories.includes(category.title)?<BsCheckSquare className={styles.icon}/>:<BsSquare className={styles.icon}/>}
               <div> {category.title}</div>
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryDropdown;