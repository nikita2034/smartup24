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
// import { fetchSuppliersAsync } from "../../features/suppliers/SuppliersSlice";
import { getSuppliers } from "../../features/suppliers/supplierThunks";
import { getPartners } from "../../features/partners/partnersThunks";
import { selectSuppliers, selectLoading, selectError } from '../../features/suppliers/supplierSelectors';
import { selectPartners} from '../../features/partners/partnersSelectors'
import { selectPartnerRequests } from "../../features/partner_requests/partnerRequestsSelectors";
import { fetchPartnerRequests } from "../../features/partner_requests/partnerRequestsSlice";
import { addSupplierToPartners } from "../../features/adding_to_partners/addingToPartnersAction";
import { selectUserId } from "../../features/user/userSelectors";

type Props = {
  path: string;
};

type ButtonId = "button1" | "button2" | "button3";


function CooperationPage({ path }: Props) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

 const button = useSelector((state: RootState) => state.page).selectedButton;
 const [userId,setUserId]=useState<string>(String(useSelector(selectUserId)))
 const [selectedButton, setSelectedButton] = useState<ButtonId | null>(button);

  const handleButtonClick = (selectedButton: ButtonId) => {
    setSelectedButton(selectedButton);
     dispatch(selectButton(selectedButton));
  };

  const suppliers=useSelector(selectSuppliers);
  const partners=useSelector(selectPartners);
  const partnerRequests = useSelector(selectPartnerRequests);

  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(getSuppliers());
    dispatch(getPartners());
    dispatch(fetchPartnerRequests());
  }, [dispatch]);

  let title;
  let date=null;

    switch (path) {
      case "suppliers":
        title = "Поставщики";
        date=suppliers
        console.log(date)
        break;
      case "partners":
        title = "Партнеры";
        date=partners;
        console.log(date)
        break;
      case "partner-requests":
        title = "Заявки";
        date=partnerRequests;
        console.log(date)
        break;
      default:
        return []; 
    }


function onCollaborate(supplierId:string){
  dispatch(addSupplierToPartners({userId, supplierId }));
  // console.log(userId)
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
            <li key={supplier._id} className={styles.li}>
              <Cooperation
                id={supplier._id}
                logo={supplier.logo}
                name={supplier.title}
                // categories={supplier.categories}
                path={path}
                onCollaborate={onCollaborate}
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
