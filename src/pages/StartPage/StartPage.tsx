import React from "react";
import styles from "./StartPage.module.scss";
import { Link } from "react-router-dom";
import HeaderStartPage from "../../components/HeaderStartPage/HeaderStartPage";
import Footer from "../../components/Footer/Footer";
type Props = {};

function StartPage({}: Props) {
  
  return (
    <div className={styles.container}>
      <HeaderStartPage/>
      <main className={styles.main}>
        <div className={styles.main_container}>
        <div className={styles.flex_block}>
          <div>
          <div className={styles.title}>
            Online платформа
            <br /> B2B продаж
          </div>
          <div className={styles.description}>
            Платформа, которая даёт возможность магазинам, ресторанам
            отправлять прямые заказы поставщикам, дистрибьютерам,
            производителям.
          </div>
          </div>
          <img src='/img\fon.png' className={styles.image_fon}/>
          </div>
          <button className={styles.get_started_button}>
          <Link to='/main' className={styles.link}>  Начать пользовать</Link> 
          </button>
        </div>
      </main>
      <Footer/>
    </div>
  );
}
export default StartPage;
