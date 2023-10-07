import React,{useState} from 'react'
import styles from './HeaderStartPage.module.scss'
import { Link } from 'react-router-dom'
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import LoginForm from "../../components/LoginForm/LoginForm";
 function HeaderStartPage() {

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
    <header className={styles.header}>
    <Link to='/' className={styles.logo}>
      <img src='/img\logo.png' alt='logo' className={styles.logo_img} />
      <div className={styles.logo_text}>smartup24</div>
    </Link>
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
  </header>
  )
}
export default HeaderStartPage