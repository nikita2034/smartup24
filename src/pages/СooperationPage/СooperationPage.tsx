import React, { Component } from "react";
import Header from "../../components/Header/Header";
import styles from './СooperationPage.module.scss'
import { Link } from "react-router-dom";
import Cooperation from "../../components/Сooperation/Сooperation";
import { useSelector } from "react-redux/es/hooks/useSelector";
import type { RootState } from "../../store";

type Props = {
  path:string
};

function CooperationPage({path}:Props) {
 let title;
  const suppliers = useSelector((state: RootState) => {
    switch (path) {
      case "suppliers":
        title='Поставщики';
        return state.suppliers.suppliers;
        
      case "partners":
        title='Партнеры';
        return state.parthners.parthners;
      case "partner-requests":
        title='Заявки';
        return state.parhhnerRequests.parthnersRequest;
      default:
        return []; // или другое значение по умолчанию
    }
  });

  return (
    <div >
      <Header />

      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.header}>
        <Link to='/suppliers' className={styles.header_button}>Поставщики</Link>
          <Link to='/partners' className={styles.header_button}>Партнеры</Link>
          <Link to='/partner-requests' className={styles.header_button}>Заявки</Link>
        </div>
        <ul>
        {suppliers.map((supplier) => (
          <li key={supplier.id} className={styles.li}>
            <Cooperation
          id={supplier.id}
          logo={supplier.logo}
          name={supplier.title}
          categories={supplier.categories}
          path={path}
          onCollaborate={() => {
            alert(`Вы начали сотрудничество с ${supplier.title}`);
          }}/>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default CooperationPage;
