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
        <strong>Телефон:</strong> +375445673247
      </p>
      <p>
        <strong>Электронная почта:</strong>evtukh.nikitka@mail.ru
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
        <strong>Телефон для связи с поддержкой:</strong> +375445673247
      </p>
      <p>
        <strong>Электронная почта поддержки:</strong>{' '}
      evtukh.nikitka@mail.ru
      </p>
    </div>

  </div>
  </div>
  <Footer/>
  </>
  )
}

export default ContactsPage