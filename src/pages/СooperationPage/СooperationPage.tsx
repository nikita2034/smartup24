import React from "react";
import CooperationList from "../../components/CooperationList/CooperationList";
import Header from "../../components/Header/Header";
import styles from './СooperationPage.module.scss'
const CooperationPage: React.FC = () => {
  // Пример данных о поставщиках
  const suppliersData = [
    {
      logo: '/img/company.png',
      name: "Поставщик 1",
      categories: ["Категория 1", "Категория 2"],
    },
    {
      logo: "/img/company.png",
      name: "Поставщик 2",
      categories: ["Категория 3", "Категория 4"],
    },
    // Добавьте данные о других поставщиках
  ];

  return (
    <div >
      <Header />

      <div className={styles.container}>
        <h2 className={styles.title}>Поставщики</h2>
        <div className={styles.header}>
          <button className={styles.header_button}>Партнеры</button>
          <button className={styles.header_button}>Заявки</button>
        </div>
        <CooperationList suppliers={suppliersData} />
      </div>
    </div>
  );
};

export default CooperationPage;
