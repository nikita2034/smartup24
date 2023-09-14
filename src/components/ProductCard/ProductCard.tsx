import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./ProductCard.module.scss";
import { useDispatch } from "react-redux";
import { addIdProduct } from '../../store/slices/productsSlice';
import { useNavigate } from "react-router-dom";
type Props = {
  id: number;
  title: string;
  trademark: string;
  caviar: string;
  barcode: string;
  supplier: string;
  price_per_box: number;
  weight: number;
  quantity_per_box:number;
  photos: [string];
};

function ProductCard({
  id,
  title,
  trademark,
  caviar,
  barcode,
  supplier,
  price_per_box,
  weight,
  quantity_per_box,
  photos}: Props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    function savingtIdRedux(id:number){
      dispatch(
        addIdProduct(id-1)
      );
      navigate("/product");
      console.log(id)
    }
  return (
    // <Link onClick={(id)=>savingtIdRedux} to="/product" className={styles.link} >
      <div className={styles.container} onClick={()=>savingtIdRedux(id)}>
        <img
          src="/img\milka.jpg"
          alt="product photo"
          className={styles.product_photo}
        />
        <div className={styles.product_tags}>
          <div className={styles.product_tags_novelty}>Новинка</div>
          <div className={styles.product_tags_promotion}>Акция</div>
          <div className={styles.product_tags_hit}>Хит</div>
        </div>

        <div className={styles.product_name}>
         {title}
        </div>

        <div className={styles.product_information}>
          <div className={styles.product_information_block}>
            <div>вес</div>
            <div>{weight} кг</div>
          </div>
          <div className={styles.product_information_block}>
            <div>в ящике</div>
            <div>{ quantity_per_box}</div>
          </div>
          <div className={styles.product_information_block}>
            <div>Цена</div>
            <div>{price_per_box}$</div>
          </div>
        </div>
      </div>
    // </Link>
  );
}

export default ProductCard;
