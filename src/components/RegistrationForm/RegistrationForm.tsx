import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RegistrationForm.module.scss";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../../firebase";
import { doc, setDoc, addDoc } from "firebase/firestore";
interface RegistrationFormProps {
  onClose: () => void;
}

// блок для отработки различных ошибок при регистрации
//   .catch((error) => {
//     if (error.message == "Firebase: Error (auth/missing-email).") {
//       setErrorDescription("Fill in the email field!");
//       setSpinner(!spinner);
//     }
//     if (
//       error.message == "Firebase: Error (auth/email-already-in-use)."
//     ) {
//       setErrorDescription("The user already exists!");
//       setSpinner(!spinner);
//     }
//     if (error.message == "Firebase: Error (auth/invalid-email).") {
//       setErrorDescription("Invalid email!");
//       setSpinner(!spinner);
//     }
//     if (error.message == "Firebase: Error (auth/internal-error).") {
//       setErrorDescription("Fill in the password field!");
//       setSpinner(!spinner);
//     }
//   });

// };
type UserType = "supplier" | "pointOfSale";

function RegistrationForm({ onClose }: RegistrationFormProps) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [userType, setUserType] = useState<UserType>("supplier");
  const [error, setError] = useState(null||'');

  const handleRegister = (email: string, password: string) => {
    const auth = getAuth();
    console.log(auth);
    createUserWithEmailAndPassword(auth, email, password).then(({ user }) => {
      
          setDoc(doc(db, "users", user.uid), {
            name: name,
            surname:surname,
            organizationName:organizationName,
            userType:userType,
            email: user.email,
            cart: [],
          });
      
      navigate("/main");
      onClose();
    })
    .catch((error) => {
      if (error.message === "Firebase: Error (auth/missing-email).") {
        setError("Fill in the email field!");
        // setSpinner(!spinner);
      }
      if (
        error.message === "Firebase: Error (auth/email-already-in-use)."
      ) {
       setError("The user already exists!");
       // setSpinner(!spinner);
      }
      if (error.message === "Firebase: Error (auth/invalid-email).") {
        setError("Invalid email!");
       // setSpinner(!spinner);
      }
      if (error.message === "Firebase: Error (auth/internal-error).") {
       setError("Fill in the password field!");
      // setSpinner(!spinner);
      }
    });
  };

  const handleUserTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserType(event.target.value as UserType);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleRegister(email, password);
  };

  return (
    <div className={styles.login_form_overlay}>
      <div className={styles.login_form_container}>
        <button className={styles.close_button} onClick={onClose}>
          X
        </button>
        <h2>Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.form_group}>
            <label className={styles.label}>Выберите тип пользователя:</label>
            <div className={styles.user_selection}>
              <label>
                <input
                  type="radio"
                  name="userType"
                  value="supplier"
                  checked={userType === "supplier"}
                  onChange={handleUserTypeChange}
                />
                Поставщик
              </label>
              <label>
                <input
                  type="radio"
                  name="userType"
                  value="pointOfSale"
                  checked={userType === "pointOfSale"}
                  onChange={handleUserTypeChange}
                />
                Торговая точка
              </label>
            </div>
            <div className={styles.flex_block}>
              <div>
                <label className={styles.label}>Имя:</label>
                <input
                  className={styles.flex_block_input}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className={styles.label}>Фамилия:</label>
                <input
                  className={styles.flex_block_input}
                  type="text"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  required
                />
              </div>
            </div>
            <label className={styles.label}>Название организации</label>
            <input
              className={styles.input}
              type="text"
              value={organizationName}
              onChange={(e) => setOrganizationName(e.target.value)}
              required
            />
            <label className={styles.label}>Email:</label>
            <input
              className={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.form_group}>
            <label className={styles.label}>Password:</label>
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            onClick={() => handleSubmit}
            className={styles.button}
            type="submit"
          >
            Sing Up
          </button>
          {error && <div style={{ color: 'red' }}>{error}</div>} {/* Вывод ошибки */}
        </form>
      </div>
    </div>
  );
}
export default RegistrationForm;
