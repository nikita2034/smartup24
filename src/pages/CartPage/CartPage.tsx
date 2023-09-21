import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import styles from './CartPage.module.scss';
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: 'Product 1', price: 10, quantity: 2 },
    { id: 2, name: 'Product 2', price: 15, quantity: 1 },
    // Добавьте сюда другие товары в корзине
  ]);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCartItems);
  };

  const handleRemoveItem = (itemId: number) => {
    const updatedCartItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCartItems);
  };

  return (
    <div className="cart">
    <Header/>
      <h2>Корзина</h2>
      <div className={styles.container}>
        <div>
          {cartItems.map(item => (
            <div key={item.id}>
              <div>{item.name}</div>
              <div>${item.price}</div>
              <div>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={e =>
                    handleQuantityChange(item.id, parseInt(e.target.value))
                  }
                />
              </div>
              <div>${item.price * item.quantity}</div>
              <div>
                <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="total">
        <p>Total: ${calculateTotal()}</p>
        <button>Checkout</button>
      </div>
    </div>
  );
};

export default CartPage;