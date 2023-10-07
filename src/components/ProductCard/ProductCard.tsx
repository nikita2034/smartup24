import React from "react";
import styles from "./ProductCard.module.scss";

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
  photos: string;
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


    const imageUrl = URL.createObjectURL(new Blob([photos]));
    console.log(photos)
  return (
      <div className={styles.container} >
        <img
          src={`data:image/png;base64,${photos}`}
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
  );
}

export default ProductCard;
