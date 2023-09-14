import React from "react";
import Header from "../../components/Header/Header";
import styles from "./OrderPage.module.scss";
type Props = {};

function OrderPage({}: Props) {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.order_block}>
          <div className={styles.order_block_header}>
            <div>
              <div className={styles.order_block_title}>
                <div className={styles.order_number}>Заказ #11232</div>
                <div className={styles.sub_orders_number}>(2 подзаказа)</div>
              </div>
              <div className={styles.order_block_delivery}>
                <div className={styles.order_address}>Заказ для магазина АВС. Автозаводская</div>
                <div className={styles.order_date}> 28 авг, 2023</div>
              </div>
            </div>
            <div className={styles.order_block_price}>
              <div className={styles.order_cost}>2720$</div>
              <div  className={styles.order_cost_title}>Сумма заказа</div>
            </div>
          </div>

          <div className={styles.order_block_details}>
            <div className={styles.order_block_details_block}>
              <div  className={styles.flexrow}>
                <div className={styles.order_block_details_title}>Адрес доставки</div>
                <div>edit</div>
              </div>
              <div>г.Минск, ул. Интернациональная, д.132</div>
            </div>

            <div className={styles.order_block_details_block}>
              <div className={styles.flexrow}>
                <div className={styles.order_block_details_title}>Желаемая дата доставки</div>
                <div>edit</div>
              </div>
              <div>11.09.2023</div>
            </div>

            <div className={styles.order_block_details_block}>
              <div  className={styles.flexrow}>
                <div className={styles.order_block_details_title}>Тип доставки</div>
                <div>edit</div>
              </div>
              <div>Самовывоз</div>
            </div>

            <div className={styles.order_block_details_block}>
              <div  className={styles.flexrow}>
                <div className={styles.order_block_details_title}>Тип оплаты</div>
                <div>edit</div>
              </div>
              <div>Платежная система</div>
            </div>
          </div>

          <div className={styles.line}></div>
          <div className={styles.order_block_summary}>
            <div className={styles.flexrow_block}>
              <div className={styles.order_block_summary_block}>
                <div className={styles.order_block_summary_title}>Бонус</div>
                <div className={styles.order_block_summary_meaning}>+25</div>
              </div>

              <div className={styles.order_block_summary_block}>
                <div className={styles.order_block_summary_title}>Экономия</div>
                <div className={styles.order_block_summary_meaning}>220$</div>
              </div>

              <div className={styles.order_block_summary_block}>
                <div className={styles.order_block_summary_title}>Товаров</div>
                <div className={styles.order_block_summary_meaning}>111</div>
              </div>

              <div className={styles.order_block_summary_block}>
                <div className={styles.order_block_summary_title}>Товаров в нагрузке</div>
                <div className={styles.order_block_summary_meaning}>11</div>
              </div>
            </div>

            <div className={styles.flexrow_block}>
              <button
                className={styles.order_block_summary_save_template_button}
              >
                Сохранить как шаблон
              </button>
              <button className={styles.order_block_summary_cancel_button}>
                Отменить заказ
              </button>
            </div>
          </div>
        </div>

        <div>Подзаказ #12313</div>
      </div>
    </>
  );
}

export default OrderPage;
