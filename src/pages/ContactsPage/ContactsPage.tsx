import React from 'react'
import HeaderStartPage from '../../components/HeaderStartPage/HeaderStartPage'
import styles from './Contacts.module.scss'
import Footer from '../../components/Footer/Footer'
function ContactsPage() {
  return (
    <>
    <div className={styles.container}>
    <HeaderStartPage/>
    <div className="contact-page">
    
    <h1>Контакты</h1>
    <div className="contact-info">
      <p>
        <strong>Адрес:</strong> 123456, Город, Улица, Дом, Офис
      </p>
      <p>
        <strong>Телефон:</strong> +7 (123) 456-7890
      </p>
      <p>
        <strong>Электронная почта:</strong> info@yourb2bplatform.com
      </p>
      <p>
        <strong>Часы работы:</strong> <br />
        Понедельник - Пятница: 9:00 - 18:00 <br />
        Суббота - Воскресенье: Выходной
      </p>
    </div>
    <div className="customer-support">
      <h2>Поддержка клиентов</h2>
      <p>
        <strong>Телефон для связи с поддержкой:</strong> +7 (123) 456-7890
      </p>
      <p>
        <strong>Электронная почта поддержки:</strong>{' '}
        support@yourb2bplatform.com
      </p>
    </div>
    <div className="social-media">
      <h2>Следите за нами в социальных сетях:</h2>
      <ul>
        <li>
          <a href="https://www.facebook.com/yourb2bplatform">Facebook</a>
        </li>
        <li>
          <a href="https://twitter.com/yourb2bplatform">Twitter</a>
        </li>
        <li>
          <a href="https://www.linkedin.com/company/yourb2bplatform">
            LinkedIn
          </a>
        </li>
      </ul>
    </div>
  </div>
  </div>
  <Footer/>
  </>
  )
}

export default ContactsPage