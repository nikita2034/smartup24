import { useState } from "react";
import { BsCheckSquare, BsSquare } from "react-icons/bs";
import styles from "./BasketItem.module.scss";
import { Product } from "../../store/slices/userSlice";

function BasketItem(item: Product) {
  const [chooseProduct, setChooseProduct] = useState(false);

  return (
    <div className={styles.selected_product} key={item.id}>
      <div className={styles.block}>
        <img src={item.photos[0]} className={styles.selected_product_image} />
        <div className={styles.flex_block}>
          <div className={styles.selected_product_title}>{item.title}</div>
          <div className={styles.selected_product_provider}>
            {item.trademark}
          </div>

          <div className={styles.selected_product_quantity_selection}>
            <div>-</div>
            <div>{item.quantity}</div>
            <div>+</div>
          </div>
        </div>
      </div>
      <div className={styles.block}>
        <div className={styles.selected_product_price}>
          {item.price_per_box}$
        </div>
        {chooseProduct ? (
          <BsCheckSquare
            className={styles.icon}
            onClick={() => setChooseProduct(!chooseProduct)}
          />
        ) : (
          <BsSquare
            className={styles.icon}
            onClick={() => setChooseProduct(!chooseProduct)}
          />
        )}
      </div> 
    </div>
  );
}

export default BasketItem;
