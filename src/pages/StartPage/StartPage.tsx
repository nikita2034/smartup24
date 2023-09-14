import React,{useState} from "react";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import styles from "./StartPage.module.scss";
import { Link } from "react-router-dom";
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
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src='/img\logo.png' alt='logo' className={styles.logo_img} />
          <div className={styles.logo_text}>smartup24</div>
        </div>
        <div className={styles.navlink}>
          <div>Преимущества</div>
          <div>Видеопрезентация</div>
          <div>О компании</div>
          <div>Вопро ответ</div>
          <div>Контакты</div>
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
        <button className={styles.language_selector}>Ru</button>
      </header>

      <main className={styles.main}>
        <div className={styles.main_container}>
          <div className={styles.title}>
            Online платформа
            <br /> B2B продаж
          </div>
          <div className={styles.description}>
            Платформа, которая даёт возможность магазинам, ресторанам
            отправлять прямые заказы поставщикам, дистрибьютерам,
            производителям.
          </div>
          <button className={styles.get_started_button}>
          <Link to='/main' className={styles.link}>  Начать пользовать</Link> 
          </button>
        </div>
      </main>
      <footer className={styles.footer}>
        <div>MERLIN</div>
        <div>Dirol</div>
        <div>Old Spice</div>
        <div>HACI SAKIR</div>
        <div>Чистин</div>
        <div>LQ</div>
        <div>BonUz</div>
        <div>blend-a-med</div>
        <div>LISTERINE</div>
      </footer>
    </div>
  );
}
export default StartPage;
