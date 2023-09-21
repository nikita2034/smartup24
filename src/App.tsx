import React from "react";
import StartPage from "./pages/StartPage/StartPage";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { getAuth } from "firebase/auth";
import MainPage from "./pages/MainPage/MainPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import OrderPage from "./pages/OrderPage/OrderPage";
import type { RootState } from "../../my-app/src/store";
import { Route, Routes} from "react-router-dom";
import ProtectedRoute from "./pages/ProtectedRoute/ProtectedRoute";
import CooperationPage from "./pages/СooperationPage/СooperationPage";
import CartPage from "./pages/CartPage/CartPage";
import "./App.css";

function App() {
  // const isAuthenticated = useSelector(
  //   (state: RootState) => state.user.user?.auth
  // );
  const user = useSelector((state: RootState) => state.user.user);
  const auth = getAuth();
  console.log(auth.currentUser)
  return (
    <div className="App">
      <Routes>
         <Route path="/" element={<StartPage />} />
         <Route
        path="/main"
        element={<ProtectedRoute isAuthenticated={Boolean(user)} component={MainPage} />}
      />
        <Route
        path="/product"
        element={<ProtectedRoute isAuthenticated={Boolean(user)} component={ProductPage} />}
      />
       <Route
        path="/orders"
        element={<ProtectedRoute isAuthenticated={Boolean(user)} component={OrderPage} />}
      />
      <Route
        path="/cooperation"
        element={<ProtectedRoute isAuthenticated={Boolean(user)} component={CooperationPage} />}
      />
       <Route
        path="/cart"
        element={<ProtectedRoute isAuthenticated={Boolean(user)} component={CartPage} />}
      />
       
       {/* <Route path="/main" element={<MainPage />} /> 
        <Route path="/product" element={<ProductPage />} />
        <Route path="/orders" element={<OrderPage />} />  */}

      </Routes>
    </div>
  );
}

export default App;
