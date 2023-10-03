import React from 'react'
import Header from '../../components/Header/Header'
import styles from './FavoritesPage.module.scss'
import ProductCard from "../../components/ProductCard/ProductCard";
import { Link } from 'react-router-dom';
 function FavoritesPage() {
    let products=[{},{}]
    let listProducts=products.map((product) => (
        <Link className={styles.link} to='/favorites'>
        {/* <ProductCard
          id={1}
          title={}
          trademark={}
          caviar={}
          barcode={}
          supplier={}
          price_per_box={}
          weight={}
          quantity_per_box={}
          photos={}
        /> */}
        </Link>
      ));

  return (
    <>
    <Header/>
    <div className={styles.product_gallery}>
              {listProducts}
    </div>
    </>
  )
}
export default FavoritesPage