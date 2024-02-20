import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import styles from "./CartPage.module.scss";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import BasketItem from "../../components/BasketItem/BasketItem";
import { Link } from "react-router-dom";
import DeliveryModal from "../../components/DeliveryModal/DeliveryModal";
import CreditCardModal from "../../components/PaymentModal/CreditCardModal";
import { fetchCartWithProductInfo } from "../../features/userCart/userCartSlice";
import { notification, Button } from 'antd';

const CartPage: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const [totalPrice, setTotalPrice] = useState(0);
  const [isModalVisibleCredit, setIsModalVisibleCredit] = useState(false);

  const showNotification = () => {
    notification.success({
      message: 'Заказ успешно оформлен!',
      description: 'Спасибо за ваш заказ. Мы обработаем его в ближайшее время.',
    });
  };

  const handleSaveCreditCard = (creditCardData: any) => {
    // Обработка сохранения данных карты, например, отправка на сервер
    console.log("Saved credit card data:", creditCardData);
    setIsModalVisibleCredit(false); // Закрыть модальное окно после сохранения данных
  };

  const handleModalSave = (data: any) => {
    // Здесь можно выполнить сохранение данных
    console.log("Сохранение данных о доставке:", data);
    setModalVisible(false);
  };
  const dispatch = useDispatch();
  const cartWithProductInfo = useSelector(
    (state: RootState) => state.cart
  ).cartWithProductInfo;
  const extractedItems = cartWithProductInfo.map((cartItem) => cartItem.item);

  useEffect(() => {
    dispatch(fetchCartWithProductInfo() as any);
  }, [dispatch]);

  const [cart, setCart] = useState(
    cartWithProductInfo?.map((product) => ({
      ...product,
      isSelected: true,
    }))
  );

  useEffect(() => {
    /*setCart(
      cartWithProductInfo?.map((product) => ({
        ...product,
        isSelected: true,
      })) || []
    );*/
    const totalPrice = calculateTotalPrice();
    setTotalPrice(totalPrice);
    console.log(cartWithProductInfo);
  }, [cartWithProductInfo]);

  let data = cart?.map((item) => (
    <BasketItem
      key={item.item.product._id}
      item={item.item}
      isSelected={item.isSelected}
      onToggleSelect={() => handleToggleSelect(String(item.item.product._id))}
    />
  ));

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => {
      if (item.isSelected) {
        return (
          total +
          Number(item.item.product.price_per_box) *
            Number(item.item.quantityItem)
        );
      }
      return total;
    }, 0);
  };

  const handleToggleSelect = (id: number) => {
    setCart((prevCartItems) =>
      prevCartItems.map((item) => {
        if (item.item.product._id === id) {
          console.log(id);
          return {
            ...item,
            isSelected: !item.isSelected,
          };
        }
        return item;
      })
    );
  };

  return (
    <>
      <Header />
      <div>
        {cartWithProductInfo?.length === 0 ? (
          <div className={styles.empty_basket}>
            <div className={styles.empty_basket_header}>Корзина пуста</div>
            <div className={styles.empty_basket_title}>
              Чтобы найти товары, воспользуйтесь поиском
            </div>
            <Link to="/main" className={styles.empty_basket_button}>
              За покупками
            </Link>
          </div>
        ) : (
          <div className={styles.container}>
            <h2 className={styles.header}>Корзина</h2>
            <div className={styles.block}>
              <div className={styles.order_details}>
                <ul>{data}</ul>
                <div className={styles.title}>Адрес доставки</div>
                <button
                  onClick={() => setModalVisible(true)}
                  className={styles.button}
                >
                  Добавить
                </button>
                <div className={styles.title}>Способ оплаты</div>
                <button
                  onClick={() => setIsModalVisibleCredit(true)}
                  className={styles.button}
                >
                  Добавить
                </button>
                <CreditCardModal
                  visible={isModalVisibleCredit}
                  onClose={() => setIsModalVisibleCredit(false)}
                  onSave={handleSaveCreditCard}
                />
              </div>

              <div className={styles.payment_block}>
                {cart ? (
                  <div className={styles.payment_block_header}>
                    Итого {totalPrice}$
                  </div>
                ) : null}
                <div className={styles.payment_block_title}>
                  {extractedItems?.length} товара:{" "}
                </div>
                <div className={styles.payment_block_title}>Доставка</div>
                <DeliveryModal
                  visible={modalVisible}
                  onClose={() => setModalVisible(false)}
                  onSave={handleModalSave}
                />

                <Button className={styles.payment_block_button}
        type="primary"
        onClick={() => {
          showNotification();
        }}
      >
        Оформить заказ
      </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
