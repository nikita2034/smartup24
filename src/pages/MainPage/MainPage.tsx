import React, { useEffect } from "react";
import type { RootState } from "../../store";
import styles from "./MainPage.module.scss";
import ProductCard from "../../components/ProductCard/ProductCard";
import Header from "../../components/Header/Header";
import CategoryDropdown from "../../components/CategoryDropdown/CategoryDropdown";
import ImageSlider from "../../components/ImageSlider/ImageSlider";
import { useSelector } from "react-redux";
import {doc, query, where, getDocs,collection } from 'firebase/firestore';
import { db } from "../../firebase";
import { Product } from "../../store/slices/productsSlice";
type Props = {};

function MainPage({}: Props) {
  let products: Product[] = useSelector(
    (state: RootState) => state.products
  ).products;
  const user = useSelector((state: RootState) => state.user.user);
  const images=['/img/milka.jpg','/img/milka.jpg','/img/milka.jpg']
  let listProducts=products.map((product) => (
    <ProductCard
      id={product.id}
      title={product.title}
      trademark={product.trademark}
      caviar={product.caviar}
      barcode={product.barcode}
      supplier={product.supplier}
      price_per_box={product.price_per_box}
      weight={product.weight}
      quantity_per_box={product.quantity_per_box}
      photos={product.photos}
    />
  ));
  async function getData() {
    console.log('1')
    try {
      console.log('2')
      const userCollection = collection(db, 'users'); // Replace 'users' with your Firestore collection name
      const userQuery = query(userCollection, where('email', '==', 'loki@mail.ru')); // You can specify the conditions here
  
      const querySnapshot = await getDocs(userQuery);
  
      querySnapshot.forEach((doc) => {
        if (doc.exists()) {
          console.log('User data:', doc.data());
        } else {
          console.log('No such document!');
        }
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }
  useEffect(() => {
    if (user) {
      console.log('start')

      getData()
    }
  }, []);

  return (
    <>
      <Header />
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.navbar}>
            <div className={styles.sort_actions}>
              <button className={styles.filter_button}>Продукты</button>
              <button className={styles.filter_button}>Акции</button>
            </div>

            <div className={styles.filter}>
              <div>
                {/* <div className={styles.filter_title}>Категории</div> */}
                <CategoryDropdown title="Категории" />
                {/* <div>Овощи</div>
              <div>Мясная продукция</div>
              <div>Фрукты</div>
              <div>Полуфабрикаты</div>
              <div>Бакалея</div>
              <div>Соусы</div> */}
              </div>
              <div>
                {/* <div className={styles.filter_title}>Отрасль</div> */}
                <CategoryDropdown title="Отрасль" />
                {/* <CategoryDropdown/> */}
                {/* <div>Стройматериалы</div>
              <div>Продовольствие</div>
              <div>Хоз товары</div>
              <div>Бытовая химия</div> */}
              </div>
              <div>
                {/* <div className={styles.filter_title}>Производители</div> */}
                <CategoryDropdown title="Производители" />
                {/* <div>ганна</div>
              <div>Санта</div>
              <div>Местное Известное</div>
              <div>Кока-Кола</div>
              <div>Савушкин</div>
              <div>М1</div> */}
              </div>
              {/* <div className={styles.filter_title}>Поставщики</div> */}
              <CategoryDropdown title="Поставщики" />
            </div>
          </div>

          <div className={styles.main_content}>
            <div className={styles.special_offers}>
              {" "}
              <ImageSlider images={images} />
            </div>
            {/* <ImageSlider images={images}/> */}
            <div className={styles.page_details}>
              <div className={styles.context_info}>Продукты</div>
              <div className={styles.pagination_control}>
                <select className={styles.element_count}>
                  <option value="40">40</option>
                  <option value="60">60</option>
                  <option value="120">120</option>
                </select>
                <div>Из 120 товаров на странице</div>
              </div>
            </div>

            <div className={styles.product_gallery}>{listProducts}</div>
          </div>
        </main>
        <footer></footer>
      </div>
    </>
  );
}
export default MainPage;
