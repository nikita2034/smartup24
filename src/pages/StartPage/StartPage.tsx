import React,{useState} from "react";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import styles from "./StartPage.module.scss";
import { Link } from "react-router-dom";
import HeaderStartPage from "../../components/HeaderStartPage/HeaderStartPage";
import Footer from "../../components/Footer/Footer";
type Props = {};

function StartPage({}: Props) {

  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  const [isRegistrationFormVisible, setIsRegistrationFormVisible] = useState(false);

  const handleLoginButtonClick = () => {
    setIsLoginFormVisible(true);
  };

  const handleLoginFormClose = () => {
    setIsLoginFormVisible(false);
  };

  const handleRegistrationButtonClick = () => {
    setIsRegistrationFormVisible(true);
  };

  const handleRegistrationFormClose = () => {
    setIsRegistrationFormVisible(false);
  };

  
  return (
    <div className={styles.container}>
      <HeaderStartPage/>
      {/* <header className={styles.header}>
        <div className={styles.logo}>
          <img src='/img\logo.png' alt='logo' className={styles.logo_img} />
          <div className={styles.logo_text}>smartup24</div>
        </div>
        <div className={styles.navlink}>
          <Link to='/advantages'   className={styles.navlink_title}>Преимущества</Link>
          <Link to='/about'  className={styles.navlink_title}>О компании</Link>
          <Link to='/contacts'  className={styles.navlink_title}>Контакты</Link>
        </div>
        <div className={styles.authentication_panel}>
          <button  onClick={handleRegistrationButtonClick}
           className={styles.authentication_panel_singup}>
            Зарегистрироваться
          </button>
          {isRegistrationFormVisible && (
        <RegistrationForm onClose={handleRegistrationFormClose} />
      )}
          <button  onClick={handleLoginButtonClick}
                   className={styles.authentication_panel_login} >
                    Войти
          </button>
          {isLoginFormVisible && (
        <LoginForm onClose={handleLoginFormClose} />
      )}
        </div>
      </header> */}

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
      {/* <footer className={styles.footer}>
        <div>MERLIN</div>
        <div>Dirol</div>
        <div>Old Spice</div>
        <div>HACI SAKIR</div>
        <div>Чистин</div>
        <div>LQ</div>
        <div>BonUz</div>
        <div>blend-a-med</div>
        <div>LISTERINE</div>
      </footer> */}
    </div>
  );
}
export default StartPage;
