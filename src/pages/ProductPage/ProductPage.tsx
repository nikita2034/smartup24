import React, { useState,useEffect } from "react";
import styles from "./ProductPage.module.scss";
import Header from "../../components/Header/Header";
import ImageViewer from "../../components/ImageViewer/ImageViewer";
import { useSelector } from "react-redux";
import { PiPlusSquareLight, PiMinusSquareLight } from "react-icons/pi";
import type { RootState } from "../../store";
import { useDispatch } from "react-redux";
// import { addOrder } from "../../store/slices/userSlice";
import { addToFavorites} from "../../features/userCart/favoritesProductsSlice";
import { useParams } from "react-router-dom";
// import { selectProductById} from '../../features/products/ProductsSlice'
// import { selectProductById } from "../../features/products/productsSelectors";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import axios from "axios";
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { fetchProduct} from '../../features/products/productByIdSlice'
import { Product } from "@/features/products/ProductsSlice";
import { notification} from 'antd';
type Props = {};

function ProductPage({}: Props) {
  const userId = "651c51ea284dfbe21b627c33";
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams(); // Получаем id из URL с использованием useParams
  const product = useSelector((state: RootState) => state.productById.product);

  useEffect(() => {
    dispatch(fetchProduct(String(id)));
  }, [dispatch,id ]);

  // const product = useSelector((state) => selectProductById(state, id));
  console.log(product, id);


  const handleAddToFavorites = () => {
    showNotification();
    dispatch(addToFavorites({ userId: userId, productId: String(product?._id)}));
  };
  
  const showNotification = () => {
    notification.open({
      message: 'Товар добавлен в избранное',
      description: 'Этот товар добавлен в список ваших избранных товаров.',
      duration: 1, // длительность уведомления в секундах
    });
  }
  function reducingQuantity() {
    if (quantity !== 1) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(1);
    }
  }
  let _id = id;
 
  const handleAddToCart = async () => {
    try {
      await axios.post("http://localhost:3500/user/add-to-cart", {
        userId,
        _id,
        quantity,
      });
      notification.success({
        message: 'Товар добавлен в корзину',
        description: 'Товар успешно добавлен в корзину.',
      });
    } catch (error) {
      console.error(error);
      alert("Произошла ошибка при добавлении товара в корзину");
    }
  };
  
  return (
    <>
      <Header />
      {product&&(
        <div className={styles.container}>
          <div className={styles.product_gallery}>
            <ImageViewer images={product.photos} />
          </div>

          <div className={styles.product_description}>
            <div className={styles.product_description_title}>
              {product.title}
            </div>

            <div className={styles.product_toolbar}>
              <div className={styles.product_tags}>
                <div className={styles.product_tags_novelty}>Новинка</div>
                <div className={styles.product_tags_promotion}>Акция</div>
                <div className={styles.product_tags_hit}>Хит</div>
              </div>
              <div className={styles.product_selection_block}>
                <div>ящики</div>
                <div>доллар</div>
              </div>
            </div>

            <div className={styles.product_detailed_description}>
              <div className={styles.line}></div>
              <div className={styles.product_detailed_description_title}>
                Торговая марка: {product.trademark}
              </div>
              <div className={styles.product_detailed_description_title}>
                ИКПУ:{product.caviar}
              </div>
              <div className={styles.product_detailed_description_title}>
                Штрих-код: {product.barcode}
              </div>
              <div className={styles.product_detailed_description_title}>
                Поставщик: {product.caviar}
              </div>
              <div className={styles.product_detailed_description_title}>
                Цена за ящ: {product.price_per_box}$
              </div>
              <div className={styles.product_detailed_description_title}>
                Самое выгодное предложение на рынке 19$
              </div>
            </div>
            <div className={styles.line}></div>

            <div className={styles.element_display_control}>
              <div className={styles.product_package_info}>
                <div className={styles.product_package_info_block}>
                  <div>Вес</div>
                  <div>{product.weight}гр.</div>
                </div>

                <div className={styles.vertical_line}> </div>

                <div className={styles.product_package_info_block}>
                  <div>В ящике</div>
                  <div>{product.quantity_per_box}шт</div>
                </div>
              </div>
              <div className={styles.quantity_selector}>
                <PiMinusSquareLight
                  className={styles.icon}
                  onClick={() => reducingQuantity()}
                />
                <div className={styles.quantity_control}>{quantity}</div>
                <PiPlusSquareLight
                  className={styles.icon}
                  onClick={() => setQuantity(1 + quantity)}
                />
              </div>
            </div>

            <div className={styles.line}></div>

            <div className={styles.order_block}>
              <div className={styles.product_price_block}>
                <div className={styles.product_price}>
                  {quantity * product.price_per_box}$
                </div>
                <div className={styles.product_price_title}>
                  Общая стоимость
                </div>
              </div>
              <div className={styles.block}>
                <button
                  className={styles.order_button}
                  onClick={() => handleAddToCart()}
                >
                  В корзину
                </button>
                <MdOutlineFavoriteBorder className={styles.icon} onClick={()=>handleAddToFavorites()}/>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default ProductPage;
