import React, { useState,useEffect } from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import type { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { selectPage } from "../../store/slices/pageSlice";
import { BsBasket } from "react-icons/bs";
import { LiaUserSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
import {MdFavoriteBorder} from 'react-icons/md'
import axios from "axios";
import { productsLoaded } from "../../features/products/ProductsSlice";

type Props = {};

type LinkId = "link1" | "link2" | "link3";

function Header({}: Props) {
  const dispatch = useDispatch();
  // const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>();
  const navigate = useNavigate()
  const page = useSelector((state: RootState) => state.page).selectedPage;

  const [isHovered, setIsHovered] = useState(false);
  const [selectedLink, setSelectedLink] = useState<LinkId | null>(page);

  const handlePageSelect = (selectedLink: LinkId) => {
    setSelectedLink(selectedLink);
    dispatch(selectPage(selectedLink));
  };

  const logOut = ()  => {
    localStorage.removeItem('userData');
    navigate('/')
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };


  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3500/products/search?query=${query}`);
      dispatch(productsLoaded(response.data));
    } catch (error) {
      console.error('Error searching for products:', error);
    }
  };

  useEffect(() => {
    if (query) {
      handleSearch();
    } else {
      setResults([]);
    }
  }, [query]);

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
          <div className={styles.navlink_title}>Заказы</div>
        </Link>

        <Link
          to="/suppliers"
          className={`${styles.linka} ${
            selectedLink === "link3" ? styles.selecteda : ""
          }`}
          onClick={() => handlePageSelect("link3")}
        >
          <div className={styles.navlink_title}>Сотрудничество</div>
        </Link>
      </div>

      <div className={styles.toolbar}>
        <input placeholder="поиск" className={styles.product_search} 
           value={query}
           onChange={(e) => setQuery(e.target.value)}
          />
       
        <Link to="/cart">
          <BsBasket className={styles.basket_logo} />
        </Link>
        <Link to='/favorites'><MdFavoriteBorder className={styles.basket_logo}/></Link>
        <div
          className={styles.user_icon}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <LiaUserSolid className={styles.basket_logo} />
          {isHovered && (
            <div className={styles.user_info_popup}>
             <div>Никита Евтух</div>
              <button onClick={()=>logOut()} className={styles.user_info_popup_button_exit}>Выйти</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
export default Header;
