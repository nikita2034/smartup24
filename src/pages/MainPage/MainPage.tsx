import React, { useEffect } from "react";
import type { RootState } from "../../store";
import styles from "./MainPage.module.scss";
import ProductCard from "../../components/ProductCard/ProductCard";
import Header from "../../components/Header/Header";
import CategoryDropdown from "../../components/CategoryDropdown/CategoryDropdown";
import ImageSlider from "../../components/ImageSlider/ImageSlider";
// import { query, where, getDocs,collection } from 'firebase/firestore';
import { Link } from "react-router-dom";
// import { Product } from "../../store/slices/productsSlice";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../features/products/productsThunks";
import {
  selectProducts,
  selectProductsLoading,
  selectProductsError,
} from "../../features/products/productsSelectors";
import axios from "axios";
import { selectUser } from "../../features/user/userSlice";
import { fetchUser } from "../../features/user/userThunks";
import { userLoaded } from "../../features/user/userSlice";
type Props = {};

function MainPage({}: Props) {
  // let products: Product[] = useSelector(
  //   (state: RootState) => state.products
  // ).products;

  const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>();
  // const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(fetchUser("b1wVPIvhLFW9S26A51NHYWLYyZB3")); // Здесь '12345' - это id пользователя
    console.log(products);
    console.log(user);
  }, [dispatch]);

  const companies = [
    { title: "Савушкин Продукт", selected: false },
    { title: "Компания 'Комарово'", selected: false },
    { title: "Агрофирма 'Свитлогорье'", selected: false },
    { title: "Минский пивоваренный завод", selected: false },
    { title: "Беларускалий", selected: false },
    { title: "Свитлогорский молочный завод", selected: false },
    { title: "Агрофирма 'Молодечно'", selected: false },
    { title: "Минский масложировой комбинат", selected: false },
    { title: "Агрофирма 'Заря'", selected: false },
    { title: "Белорусская хлебопекарня", selected: false },
    { title: "Фабрика 'Алёнка'", selected: false },
    { title: "Агрофирма 'Радамир'", selected: false },
    { title: "Минский завод орехопереработки", selected: false },
    { title: "ОАО 'Сладкоежка'", selected: false },
    { title: "ЗАО 'Молочные продукты'", selected: false },
  ];
  const productCategories = [
    { title: 'Фрукты и овощи', selected: false },
      { title: 'Молочные продукты', selected: false },
      { title: 'Мясо и птица', selected: false },
      { title: 'Рыба и морепродукты', selected: false },
      { title: 'Замороженные продукты', selected: false },
      { title: 'Напитки', selected: false },
      { title: 'Детское питание', selected: false },
      { title: 'Экологически чистые продукты', selected: false },
  ]
  const suppliers = [
    { title: "Савушкин Продукт", selected: false },
    { title: "Компания 'Комарово'", selected: false },
    { title: "Агрофирма 'Свитлогорье'", selected: false },
    { title: "Минский пивоваренный завод", selected: false },
    { title: "Беларускалий", selected: false },
    { title: "Свитлогорский молочный завод", selected: false },
    { title: "Агрофирма 'Молодечно'", selected: false },
    { title: "Минский масложировой комбинат", selected: false },
    { title: "Агрофирма 'Заря'", selected: false },
    { title: "Белорусская хлебопекарня", selected: false },
    { title: "Фабрика 'Алёнка'", selected: false },
    { title: "Агрофирма 'Радамир'", selected: false },
    { title: "Минский завод орехопереработки", selected: false },
    { title: "ОАО 'Сладкоежка'", selected: false },
    { title: "ЗАО 'Молочные продукты'", selected: false }
  ];

  const images = ["/img/milka.jpg", "/img/milka.jpg", "/img/milka.jpg"];
  let listProducts = products.map((product) => (
    <Link className={styles.link} to={`/product/${product._id}`}>
      <ProductCard
        id={product._id}
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
    </Link>
  ));

  // useEffect(() => {
  //   // b1wVPIvhLFW9S26A51NHYWLYyZB3
  //   axios.get('http://localhost:3300/user/b1wVPIvhLFW9S26A51NHYWLYyZB3')
  //   .then((response) => {
  //     console.log(response);
  //   })
  //   .catch((error) => {
  //     console.error('Error fetching products:', error);
  //   });
  // }, []);

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
                <CategoryDropdown title="Категории" categories={productCategories} />
              </div>
              <div>
                {/* <div className={styles.filter_title}>Производители</div> */}
                <CategoryDropdown
                  title="Производители"
                  categories={companies}
                />
              </div>
              {/* <div className={styles.filter_title}>Поставщики</div> */}
              <CategoryDropdown title="Поставщики" categories={suppliers}/>
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
