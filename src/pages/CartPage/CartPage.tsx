import React, { useState } from "react";
import Header from "../../components/Header/Header";
import styles from "./CartPage.module.scss";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "@/store";
import BasketItem from "../../components/BasketItem/BasketItem";
import { Link } from "react-router-dom";
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const CartPage: React.FC = () => {
  const selectedproducts=[{}];
  // const selectedproducts = useSelector(
  //   (state: RootState) => state.user.cart.orders
  // );

  // const calculateTotal = () => {
  //   return selectedproduct.reduce((total, item) => total + item.price * item.quantity, 0);
  // };

  return (
    <>
      <Header />
      <div >
      {selectedproducts.length === 0 ? (
      <div className={styles.empty_basket}>
        <div className={styles.empty_basket_header}>
        Корзина пуста
        </div>
        <div className={styles.empty_basket_title}>Чтобы найти товары, воспользуйтесь поиском</div>
        <Link to='/main' className={styles.empty_basket_button}>За покупками</Link>
      </div>):
        (
        <div className={styles.container}>
          <h2 className={styles.header}>Корзина</h2>
          <div className={styles.block}> 
          <div className={styles.order_details}>
            <div>
              {/* {selectedproducts.map((item)=>BasketItem(item))} */}
            </div>
            <div className={styles.title}>Адрес доставки</div>
            <button className={styles.button}>Добавить</button>
            <div className={styles.title}>Способ оплаты</div>
            <button className={styles.button}>Добавить</button>
          </div>
      
        <div className={styles.payment_block}>
          <div className={styles.payment_block_header}>Итого </div> 
          <div className={styles.payment_block_title}>3 товара: </div>
          <div className={styles.payment_block_title}>Доставка</div>
          <div></div>
          <button className={styles.payment_block_button}>Оплатить</button>
        </div> 
        </div>
        </div>)}
      </div>
    </>
  );
};

export default CartPage;
