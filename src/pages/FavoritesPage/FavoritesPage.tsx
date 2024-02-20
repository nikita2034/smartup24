import React,{useEffect} from 'react'
import Header from '../../components/Header/Header'
import styles from './FavoritesPage.module.scss'
import ProductCard from "../../components/ProductCard/ProductCard";
import { RootState } from "@/store";
import { fetchFavorites} from '../../features/userCart/favoritesProductsSlice'
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import axios from 'axios';

 function FavoritesPage() {
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch();

    const favoritesProducts = useSelector(
      (state: RootState) => state.favoritesProducts
    ).favorites;

    useEffect(() => {
      // Запуск запроса на получение избранных товаров после загрузки компонента
      dispatch(fetchFavorites());
    }, [dispatch,favoritesProducts]);

    async function removeFromFavorites(productId:string) {
      try {
        const response = await axios.delete(`http://localhost:3500/user/removeFromFavorites/651c51ea284dfbe21b627c33/${productId}`);
        if (response.status === 200) {
          // console.log('Товар успешно удален из избранного');
        } else {
          // console.error('Произошла ошибка при удалении товара из избранного');
        }
      } catch (error) {
        // console.error('Произошла ошибка при выполнении запроса', error);
      }
    }

    let listProducts=favoritesProducts?.map((product) => (
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
          handleFavorites={removeFromFavorites}
          favorite={true}
        />
      ));

  return (
    <>
    <Header/>
    <div className={styles.container}>
      <div className={styles.header}>Избранные товары</div>
       <div className={styles.product_gallery}>
              {listProducts}
    </div>
    </div>
   
    </>
  )
}
export default FavoritesPage