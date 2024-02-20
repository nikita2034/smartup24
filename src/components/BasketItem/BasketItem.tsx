import { useState } from "react";
import { BsCheckSquare, BsSquare } from "react-icons/bs";
import styles from "./BasketItem.module.scss";
import { Product } from "@/features/products/ProductsSlice";
import { Link } from "react-router-dom";
import axios from "axios";
import { addToFavorites } from "../../features/userCart/favoritesProductsSlice";
import { useDispatch } from "react-redux";
import type { RootState } from "../../store";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { updateCartItemQuantityInCart } from "../../features/userCart/userCartSlice";
import { notification } from "antd";

interface CartItem {
  quantityItem: number;
  product: Product;
}
interface BasketItemProps {
  item: CartItem;
  isSelected: boolean;
  onToggleSelect: () => void;
}

function BasketItem({ item, isSelected, onToggleSelect }: BasketItemProps) {
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> =
    useDispatch();

  const [quantity, setQuantity] = useState(item.quantityItem);
  const userId = "651c51ea284dfbe21b627c33";

  const deleteProductFromCart = async () => {
    axios
      .delete(
        `http://localhost:3500/user/removeFromCart/${userId}/${item.product._id}`
      )
      .then((response) => {
        if (response.status === 200) {
          notification.success({
            message: "Товар удален из корзины",
            description: "Товар успешно удален из корзины.",
          });
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAddToFavorites = () => {
    dispatch(
      addToFavorites({ userId: userId, productId: String(item.product._id) })
    );
    notification.open({
      message: "Товар добавлен в избранное",
      description: "Этот товар добавлен в список ваших избранных товаров.",
      duration: 1,
    });
  };

  const updateCartItemQuantity = (
    userId: string,
    productId: string,
    newQuantity: number
  ) => {
    dispatch(updateCartItemQuantityInCart({ userId, productId, newQuantity }));
  };

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      try {
        await updateCartItemQuantity(
          userId,
          String(item.product._id),
          newQuantity
        );
        setQuantity(newQuantity);
        console.log("Quantity updated successfully");
      } catch (error) {
        // Handle errors, show an error message, etc.
        console.error("Error updating item quantity:", error);
      }
    } else {
      // Handle cases where newQuantity is out of the allowed range
      console.error("Quantity out of range (1-10)");
      // You can display an error message to the user here.
    }
  };

  console.log(isSelected);
  return (
    <li className={styles.selected_product}>
      <div className={styles.block}>
        <img
          src={item.product.photos[0]}
          className={styles.selected_product_image}
        />
        <div className={styles.flex_block}>
          <Link
            to={`/product/${item.product._id}`}
            className={styles.selected_product_title}
          >
            {item.product.title}
          </Link>
          <div className={styles.selected_product_provider}>
            {item.product.trademark}
          </div>

          <div className={styles.selected_product_quantity_selection}>
            <button onClick={() => handleQuantityChange(quantity - 1)}>
              -
            </button>
            <div>{quantity}</div>
            <button onClick={() => handleQuantityChange(quantity + 1)}>
              +
            </button>
          </div>
          <div>
            <button onClick={() => handleAddToFavorites()}>В избранное</button>
            <button onClick={() => deleteProductFromCart()}>Удалить</button>
          </div>
        </div>
      </div>
      <div className={styles.block}>
        <div className={styles.selected_product_price}>
          {item.product.price_per_box}$
        </div>
        {isSelected ? (
          <BsCheckSquare className={styles.icon} onClick={onToggleSelect} />
        ) : (
          <BsSquare className={styles.icon} onClick={onToggleSelect} />
        )}
      </div>
    </li>
  );
}

export default BasketItem;
