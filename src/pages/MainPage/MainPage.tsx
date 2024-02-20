import React, { useEffect, useState } from "react";
import type { RootState } from "../../store";
import styles from "./MainPage.module.scss";
import ProductCard from "../../components/ProductCard/ProductCard";
import Header from "../../components/Header/Header";
import CategoryDropdown from "../../components/CategoryDropdown/CategoryDropdown";
import ImageSlider from "../../components/ImageSlider/ImageSlider";
import Pagination from "../../components/Pagination/Pagination";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../features/products/productsThunks";
import { fetchFilteredProducts, selectFilteredProducts } from '../../features/productsFilters/productsFiltersSlice';
import { fetchProductCount } from "../../features/products/productsCountSlice";
import { fetchFilters} from '../../features/filters/filtersSlice'
import axios from "axios";
import {
  selectProducts,
  selectProductsLoading,
  selectProductsError,
} from "../../features/products/productsSelectors";

import { selectUser } from "../../features/user/userSlice";
import { getUser } from "../../features/user/userThunks";
import { userLoaded } from "../../features/user/userSlice";
import { title } from "process";
type Props = {};

type MyStoredData={
  uid:string
}

interface FilterOptions {
  minPrice?: number;
  maxPrice?: number;
  categories?: string[];
  manufacturers?: string[];
  suppliers?: string[];
}

function MainPage({}: Props) {
  const initialFilters: FilterOptions = {
    minPrice: undefined,
    maxPrice: undefined,
    categories: [],
    manufacturers: [],
    suppliers: [],
  };

  const [currentPage, setCurrentPage]=useState<number>(1)
  const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>();
  const [filters, setFilters] = useState<FilterOptions>(initialFilters);


  const filteredProducts = useSelector(selectFilteredProducts);
  const { categories,suppliers, manufacturers} = useSelector((state:RootState) => state.filters);
  const products = useSelector(selectProducts);
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);

  console.log(categories)
  // console.log(suppliers)
  console.log(manufacturers)

  useEffect(() => {
    dispatch(getProducts(currentPage));
    dispatch(fetchProductCount());
    dispatch(fetchFilters());
    let userJson = localStorage.getItem("userData");
    if(userJson){
       const parsedData: MyStoredData = JSON.parse(userJson);
         dispatch(getUser(parsedData.uid));
    }
  }, [dispatch,currentPage,filters]);

  const categoriesWithSelection = categories.map((category) => ({
    title: category,
    selected: false,
  }));
  const suppliersWithSelection = suppliers.map((supplier) => ({
    title: supplier,
    selected: false,
  }));
  const manufacturersWithSelection = manufacturers.map((manufacturer) => ({
    title: manufacturer,
    selected: false,
  }));

 async function addToFavorites(productId:string) {
    try {
      const response = await axios.post(`http://localhost:3500/user/addToFavorites/651c51ea284dfbe21b627c33/${productId}`);
      if (response.status === 200) {
        console.log('Товар успешно добавлен в избранное');
      } else {
        console.error('Произошла ошибка при добавлении товара в избранное');
      }
    } catch (error) {
      console.error('Произошла ошибка при выполнении запроса', error);
    }
  }

  const images = ["/img/milka.jpg", "/img/milka.jpg", "/img/milka.jpg"];
  let listProducts = products.map((product) => (
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
        handleFavorites={addToFavorites}
      />
  ));

useEffect(()=>{
  const fetchData = async () => {
    try {
      await dispatch(fetchFilteredProducts(filters)); // Вызов thunk action creator без аргументов
    } catch (error) {
      console.error('Failed to fetch filtered products:', error);
    }
  };

  fetchData();
  console.log(filters)
    console.log(filteredProducts)
},[filters])
 
  const handleInputChange = (property: keyof FilterOptions, value: string) => {
    setFilters((prevFilters:any) => {
      const updatedCategories = [...(prevFilters[property] || [])];
      const categoryIndex = updatedCategories.indexOf(value);
  
      if (categoryIndex === -1) {
        updatedCategories.push(value);
      } else {
        updatedCategories.splice(categoryIndex, 1);
      }
  
      return {
        ...prevFilters,
        [property]: updatedCategories,
      };
    });
  };

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
                <CategoryDropdown title="categories" handleInputChange={handleInputChange} categories={categoriesWithSelection} />
              </div>
              <div>
                <CategoryDropdown title="manufacturers" handleInputChange={handleInputChange} categories={manufacturersWithSelection}/>
              </div>
              <CategoryDropdown title="suppliers" handleInputChange={handleInputChange} categories={suppliersWithSelection}/>
            </div>
          </div>

          <div className={styles.main_content}>
            <div className={styles.special_offers}>
              <ImageSlider images={images} />
            </div>
            <div className={styles.page_details}>
              <div className={styles.context_info}>Продукты</div>
            </div>

            <div className={styles.product_gallery}>{listProducts}</div>
          
          </div>
        </main>
        <footer className={styles.footer}> <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage}/></footer>
      </div>
    </>
  );
}
export default MainPage;
