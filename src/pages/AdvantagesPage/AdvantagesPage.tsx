import React from 'react'
import styles from './AdvantagesPage.module.scss'
import HeaderStartPage from '../../components/HeaderStartPage/HeaderStartPage'
import Footer from '../../components/Footer/Footer'
function AdvantagesPage() {
  return (
    <>
    <div className={styles.container}>
    <HeaderStartPage/>
    <div>
      <h1>Преимущества B2B Платформы</h1>
      <ul>
        <li className={styles.li}>
          <div className={styles.li_header}>Увеличение доступности рынка:</div> 
          <div> B2B платформы позволяют поставщикам достичь глобального рынка и привлечь клиентов со всего мира. Это увеличивает шансы на расширение бизнеса и нахождение новых партнеров.</div>
        </li>
        <li  className={styles.li}>
          <div  className={styles.li_header}>Эффективность и экономия времени:</div> 
          <div>Электронная торговля на B2B платформах сокращает время, затрачиваемое на оформление заказов и сделки. Все операции проходят онлайн, что уменьшает бумажную работу и упрощает процессы.</div>
        </li>
        <li className={styles.li}>
          <div  className={styles.li_header}>Снижение издержек:</div>
          <div> Возможность сравнивать цены и условия поставщиков позволяет покупателям выбирать наилучшие предложения. Это способствует снижению затрат на закупки.</div>
        </li>
        <li className={styles.li}>
          <div  className={styles.li_header}>Расширенный ассортимент товаров:</div> 
          <div>Покупатели могут легко находить разнообразные товары и услуги на B2B платформах, что позволяет им разнообразить ассортимент и удовлетворить потребности своих клиентов.</div>
        </li>
        <li className={styles.li}>
          <div  className={styles.li_header}>Улучшенное управление заказами и инвентаризацией:</div> 
          <div>Платформы предоставляют инструменты для более эффективного управления заказами, инвентаризацией и отслеживанием поставок.</div>
        </li>
        <li className={styles.li}>
          <div  className={styles.li_header}>Повышенная видимость и аналитика:</div> 
          <div>B2B платформы предоставляют подробную информацию о продажах, заказах и клиентских предпочтениях. Это помогает компаниям анализировать данные и принимать более обоснованные решения.</div>
        </li>
        <li className={styles.li}>
          <div  className={styles.li_header}>Поддержка клиентов:</div> 
          <div>Поставщики могут предоставлять лучшую поддержку клиентам через онлайн-чаты, электронную почту и телефон. Это способствует укреплению отношений с клиентами.</div>
        </li>
        <li className={styles.li}>
          <div  className={styles.li_header}>Автоматизация и интеграция:</div> 
          <div>B2B платформы интегрируются с системами управления запасами, бухгалтерскими программами и другими инструментами, что упрощает автоматизацию бизнес-процессов.</div>
        </li>
        <li  className={styles.li}>
          <div  className={styles.li_header}>Улучшенная безопасность данных:</div>
          <div> Большинство B2B платформ обеспечивают высокий уровень безопасности данных, что защищает информацию о клиентах и заказах.</div>
        </li>
        <li className={styles.li}>
          <div className={styles.li_header}>Гибкость и настраиваемость:</div>
          <div> Платформы часто предоставляют возможность настраивать условия сделок, цены и сроки доставки в соответствии с потребностями каждого клиента.</div>
        </li>
      </ul>
    </div>
    </div>
    <Footer/>
    </>
  )
}

export default AdvantagesPage