import React from "react";
import StartPage from "./pages/StartPage/StartPage";
// import { useSelector} from "react-redux/es/hooks/useSelector";
// import { useDispatch } from "react-redux";
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
import MainPage from "./pages/MainPage/MainPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import OrderPage from "./pages/OrderPage/OrderPage";
// import type { RootState } from "../../my-app/src/store";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./pages/ProtectedRoute/ProtectedRoute";
import CooperationPage from "./pages/СooperationPage/СooperationPage";
import SupplierPage from "./pages/SupplierPage/SupplierPage";
import CartPage from "./pages/CartPage/CartPage";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import ContactsPage from "./pages/ContactsPage/ContactsPage";
import AdvantagesPage from "./pages/AdvantagesPage/AdvantagesPage";
import "./App.css";

function App() {
  let userJson = localStorage.getItem("userData");
  // useEffect(() => {
  //   console.log(user);
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {

  //       dispatch(
  //         setUser({
  //           email: user.email || '',
  //           id: user.uid,
  //           name: 'peter',
  //           auth:true,
  //         })
  //       );

  //     } else {
  //       // User is signed out, dispatch clearUser action
  //       // dispatch(clearUser());
  //     }
  //   });

  //   return () => {
  //     // Unsubscribe when the component unmounts
  //     unsubscribe();
  //   };

  // }, [dispatch, auth]);

  // dispatch, auth

  console.log(userJson);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/advantages" element={<AdvantagesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route
          path="/main"
          element={
            <ProtectedRoute
              isAuthenticated={Boolean(userJson)}
              component={MainPage}
            />
          }
        />
        <Route
          path="/product/:id"
          element={
            <ProtectedRoute
              isAuthenticated={Boolean(userJson)}
              component={ProductPage}
            />
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute
              isAuthenticated={Boolean(userJson)}
              component={OrderPage}
            />
          }
        />
        <Route
          path="/suppliers"
          element={
            <ProtectedRoute
              isAuthenticated={Boolean(userJson)}
              component={() => <CooperationPage path="suppliers" />}
            />
          }
        />
        <Route
          path="/suppliers/:id"
          element={
            <ProtectedRoute
              isAuthenticated={Boolean(userJson)}
              component={() => <SupplierPage path="suppliers" />}
            />
          }
        />
        <Route
          path="/partners"
          element={
            <ProtectedRoute
              isAuthenticated={Boolean(userJson)}
              component={() => <CooperationPage path="partners" />}
            />
          }
        />
        <Route
          path="/partners/:id"
          element={
            <ProtectedRoute
              isAuthenticated={Boolean(userJson)}
              component={() => <SupplierPage path="partners" />}
            />
          }
        />
        <Route
          path="/partner-requests"
          element={
            <ProtectedRoute
              isAuthenticated={Boolean(userJson)}
              component={() => <CooperationPage path="partner-requests" />}
            />
          }
        />
        <Route
          path="/partner-requests/:id"
          element={
            <ProtectedRoute
              isAuthenticated={Boolean(userJson)}
              component={() => <SupplierPage path="partner-requests" />}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute
              isAuthenticated={Boolean(userJson)}
              component={CartPage}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute
              isAuthenticated={Boolean(userJson)}
              component={FavoritesPage}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
