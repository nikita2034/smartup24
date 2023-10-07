import React, { useState,useEffect } from "react";
import Header from "../../components/Header/Header";
import styles from "./СooperationPage.module.scss";
// import { Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cooperation from "../../components/Сooperation/Сooperation";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectButton } from "../../store/slices/pageSlice";
import type { RootState } from "../../store";
import type { AppDispatch } from '../../store';
import { useDispatch } from "react-redux";
import { fetchSuppliersAsync } from "../../features/suppliers/SuppliersSlice";
import { selectSuppliers, selectLoading, selectError } from '../../features/suppliers/supplierSelectors';
type Props = {
  path: string;
};

type ButtonId = "button1" | "button2" | "button3";


function CooperationPage({ path }: Props) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

 const button = useSelector((state: RootState) => state.page).selectedButton;
 const [selectedButton, setSelectedButton] = useState<ButtonId | null>(button);

//  const [partnersOrSuppliersOrRequests, setPartnersOrSuppliersOrRequests] = useState<Supplier[]>();

  const handleButtonClick = (selectedButton: ButtonId) => {
    setSelectedButton(selectedButton);
     dispatch(selectButton(selectedButton));
    // Дополнительные действия при нажатии на кнопку
  };

  const suppliers=useSelector(selectSuppliers);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);


  useEffect(() => {
    dispatch(fetchSuppliersAsync());
    console.log(suppliers)
  }, [dispatch]);

  let title;
  let date=null;

  // const suppliers = useSelector((state: RootState) => {
    switch (path) {
      case "suppliers":
        title = "Поставщики";
        date=suppliers
        break;
      case "partners":
        title = "Партнеры";
        // setPartnersOrSuppliersOrRequests([])
        break;
      case "partner-requests":
        title = "Заявки";
        // setPartnersOrSuppliersOrRequests([])
        break;
      default:
        return []; 
    }




  return (
    <div>
      <Header />

      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.header}>
          <button
            onClick={() => {
              handleButtonClick("button1");
              navigate("/suppliers");
            }}
            className={`${styles.header_button} ${
              selectedButton === "button1" ? styles.active : ""
            }`}
          >
            Поставщики
          </button>
          <button
            onClick={() => {
              handleButtonClick("button2");
              navigate("/partners"); 
            }}
            className={`${styles.header_button} ${
              selectedButton === "button2" ? styles.active : ""
            }`}
          >
            Партнеры
          </button>
          <button
            onClick={() => {
              handleButtonClick("button3");
              navigate("/partner-requests");
            }}
            className={`${styles.header_button} ${
              selectedButton === "button3" ? styles.active : ""
            }`}
          >
            Заявки
          </button>
        </div>
        {date !== null ? ( <ul>
          {date.map((supplier) => (
            <li key={supplier.id} className={styles.li}>
              <Cooperation
                id={supplier.id}
                logo={supplier.logo}
                name={supplier.title}
                categories={supplier.categories}
                path={path}
                onCollaborate={() => {
                  alert(`Вы начали сотрудничество с ${supplier.title}`);
                }}
              />
            </li>
          ))}
        </ul>):(
          <></>
        )}
      </div>
    </div>
  );
}

export default CooperationPage;
