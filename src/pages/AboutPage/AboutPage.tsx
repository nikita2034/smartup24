import React from "react";
import HeaderStartPage from "../../components/HeaderStartPage/HeaderStartPage";
import styles from "./AboutPage.module.scss";
import Footer from "../../components/Footer/Footer";
function AboutPage() {
  return (
    <>
      <div className={styles.container}>
        <HeaderStartPage />
        <div className={styles.company_info}>
          <h1>О нашей компании</h1>
          <p className={styles.descr}>
            Мы - это современная B2B платформа, предоставляющая уникальные
            возможности для бизнеса. Наша миссия - сделать процесс закупок и
            продаж более эффективным и выгодным для наших клиентов.
          </p>
          <h2>Наши ценности:</h2>
          <ul>
            <li className={styles.advantages_li}>Профессионализм и ответственность</li>
            <li className={styles.advantages_li}>Инновации и развитие</li>
            <li className={styles.advantages_li}>Уважение к клиентам и партнерам</li>
            <li className={styles.advantages_li}>Эффективность и результат</li>
          </ul>
          <p>
            Мы гордимся тем, что помогаем бизнесу расти и развиваться.
            Присоединяйтесь к нам и достигайте новых высот вместе с нами!
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AboutPage;
