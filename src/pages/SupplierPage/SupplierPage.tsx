import React from "react";
import Header from "../../components/Header/Header";
import styles from "./SupplierPage.module.scss";
import {useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import type { RootState } from "../../store";

type Props={
  path:string;
}

function SupplierPage({path}:Props) {
 
  const { id } = useParams();
  // const supplier=useSelector(
  //   (state: RootState) => state.suppliers.suppliers[Number(id)-1]
  // );

  const supplier = useSelector((state: RootState) => {
    switch (path) {
      case "suppliers":
        return state.suppliers.suppliers[Number(id)-1];
      case "partners":
        return state.parthners.parthners[Number(id)-1];
      case "partner-requests":
        return state.parhhnerRequests.parthnersRequest[Number(id)-1];
      default:
        return {}; // или другое значение по умолчанию
    }
  })as {
    title: string; // Add the expected properties and their types here
    description: string;
    // Add other properties as needed
  };
 console.log(supplier);
  return (
    <div>
      <Header />
      <div className={styles.container}>
        <img src="/img\img1.jpg" alt="background" className={styles.supplier_promo_photo}/>
        <img src="/img\company.png" alt="logo supplier" className={styles.supplier_logo} />
        <div className={styles.supplier_horizontal_list}>
          <div className={styles.supplier_main_desc}>
          
            <div className={styles.supplier_header}>
              <div className={styles.supplier_title}>{supplier.title}</div>
              <div className={styles.supplier_evaluation}>Количество звезд</div>
            </div>
            <div className={styles.supplier_inn}>ИНН:3213124234234</div>
            <div className={styles.supplier_description}>
             {supplier.description}
            </div>
            <button className={styles.supplier_show_more_desc}>Развернуть</button>
            <div className={styles.supplier_button}>
              <button className={styles.supplier_button_cooperation}>Сотрудничать</button>
              <button className={styles.supplier_button_complain}>Пожаловаться</button>
            </div>
          </div>
          <div className={styles.supplier_add_desc}>
            <div className={styles.supplier_block}>
            <div className={styles.supplier_}>Продукты питания</div>
            <div className={styles.supplier_product_categories}> сыр молочные продукты коколад мясные продукты</div>
            </div>
            <div className={styles.supplier_block}>
            <div className={styles.supplier_advantage}>5%</div>
            <div className={styles.supplier_advantage_desc}>
              Преимущество по отношению к цене с цчетом аналогичных товаров
            </div>
            </div>
          </div>
        </div>

        <div className={styles.line}></div>
        <div className={styles.supplier_additional_information}>
          <button className={styles.supplier_additional_information_button}>Продукты</button>
          <button className={styles.supplier_button}>Документы</button>
          <button className={styles.supplier_button}>Контакты</button>
          <button className={styles.supplier_button}>Отзывы(19)</button>
        </div>
      </div>
    </div>
  );
}

export default SupplierPage;
