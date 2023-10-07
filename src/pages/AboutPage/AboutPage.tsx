import React from 'react'
import HeaderStartPage from '../../components/HeaderStartPage/HeaderStartPage'
import styles from './AboutPage.module.scss'
import Footer from '../../components/Footer/Footer'
function AboutPage() {
  return (
    <>
    <div className={styles.container}><HeaderStartPage/>
    <div className="company-info-page">
    <h1>О нашей компании</h1>
    <p>
      Мы - это современная B2B платформа, предоставляющая уникальные
      возможности для бизнеса. Наша миссия - сделать процесс закупок и
      продаж более эффективным и выгодным для наших клиентов.
    </p>
    <h2>Наши преимущества:</h2>
    <ul>
      <li>Широкий ассортимент товаров и услуг</li>
      <li>Простой и удобный интерфейс</li>
      <li>Поддержка клиентов 24/7</li>
      <li>Гарантия качества и надежности</li>
      <li>Сотрудничество с проверенными поставщиками</li>
    </ul>
    <h2>Наши ценности:</h2>
    <ul>
      <li>Профессионализм и ответственность</li>
      <li>Инновации и развитие</li>
      <li>Уважение к клиентам и партнерам</li>
      <li>Эффективность и результат</li>
    </ul>
    <p>
      Мы гордимся тем, что помогаем бизнесу расти и развиваться. Присоединяйтесь
      к нам и достигайте новых высот вместе с нами!
    </p>
  </div>
  </div>
  <Footer/>
  </>
  )
}

export default AboutPage