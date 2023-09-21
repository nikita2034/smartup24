import React, { useState } from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import type { RootState } from "../../store";
import { useDispatch,useSelector } from "react-redux";
import { selectPage } from "../../store/slices/pageSlice";
import {BsBasket} from 'react-icons/bs'; 
import {LiaUserSolid} from 'react-icons/lia';
type Props = {};

type LinkId = "link1" | "link2" | "link3";

function Header({}: Props) {
  const dispatch = useDispatch();

  const page=useSelector((state: RootState) => state.page).selectedPage
  const [selectedLink, setSelectedLink] = useState<LinkId | null>(page);

  const handlePageSelect = (selectedLink: LinkId) => {
    setSelectedLink(selectedLink)
    dispatch(selectPage(selectedLink));
  };
  
  return (
    <header className={styles.header}>
      <div className={styles.logotype}>
        <img src="/img\logo.png" alt="logo" className={styles.logo} />
        <div className={styles.logotype_title}>smartup24</div>
      </div>
      <div className={styles.navlink}>
        <Link
        
          className={`${styles.linka} ${
            selectedLink === "link1" ? styles.selecteda : ""
          }`}
          onClick={() => handlePageSelect("link1")}
          to="/main"
        > 
        
          <div className={styles.product_catalog_button}>
            <div className={styles.burger_menu}>
              <div className={styles.line}></div>
              <div className={styles.line}></div>
            </div>
            <div className={styles.navlink_title}>Каталог товаров</div>
          </div>
        </Link>

        <Link
          to="/orders"
        
          onClick={() => handlePageSelect("link2")}
          className={`${styles.linka} ${
            selectedLink === "link2" ? styles.selecteda : ""
          }`}
        >
        <div className={styles.navlink_title}>
            Заказы
        </div>
         </Link>

        <Link
          to="/cooperation"
          className={`${styles.linka} ${
            selectedLink === "link3" ? styles.selecteda: ""
          }`}
          onClick={() => handlePageSelect("link3")}
        >
           <div className={styles.navlink_title}>
          Сотрудничество
          </div>
        </Link>
      </div>

      <div className={styles.toolbar}>
        <input placeholder="поиск" className={styles.product_search} />
        <Link to='/cart'><BsBasket className={styles.basket_logo}/></Link>
        <div>2</div>
        <div>3</div>
        <div><LiaUserSolid className={styles.basket_logo}/></div>
      </div>
      <select className={styles.language_selector}>
        <option value="RU">RU</option>
        <option value="ENG">ENG</option>
      </select>
      <button className={styles.order_button}>Сделать заказ</button>
    </header>
  );
}
export default Header;
