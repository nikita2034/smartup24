import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync} from '../../features/Auth/authAsync';
import type { RootState } from "../../store";
import styles from "./LoginForm.module.scss";
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
interface LoginFormProps {
  onClose: () => void;
}

function LoginForm({ onClose }: LoginFormProps) {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [error, setError] = useState(null || "");

  // const navigate = useNavigate();
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   handleLogin(email, password);
  // };

  // const handleLogin = (email: string, password: string) => {
  //   const auth = getAuth();

  //   signInWithEmailAndPassword(auth, email, password)
  //     .then(({ user }) => {
  //       localStorage.setItem("userData", JSON.stringify(user));
  //       console.log(user)
  //       // setError(null);
  //       navigate("/main");
  //       // onClose();
  //     })
  //     // блок для отработки различных ошибок при авторизации
  //     .catch((error) => {
  //       if (error.message === "Firebase: Error (auth/user-not-found).") {
  //         setError(
  //           "The user was not found. Check that your username and correct!"
  //         );
  //         // setSpinner(!spinner);
  //       }
  //       if (error.message === "Firebase: Error (auth/internal-error).") {
  //         setError("Fill in the password field!");
  //         // setSpinner(!spinner);
  //       }
  //       if (error.message === "Firebase: Error (auth/invalid-email).") {
  //         setError("Invalid email value!");
  //         // setSpinner(!spinner);
  //       }
  //       if (error.message === "Firebase: Error (auth/wrong-password).") {
  //         setError("Wrong password!");
  //         // setSpinner(!spinner);
  //       }
  //     });
  // };


  const dispatch : ThunkDispatch<RootState, undefined, AnyAction>= useDispatch();
  const { user, token } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = () => {
    // Вызываем асинхронную операцию входа
    dispatch(loginAsync({ email, password }));
  };


  return (
    <div className={styles.login_form_overlay}>
      <div className={styles.login_form_container}>
        <button className={styles.close_button} onClick={onClose}>
          X
        </button>
        <h2>Login</h2>
        {/* <form onSubmit={handleSubmit}> */}
        <form onSubmit={handleLogin}>
          <div className={styles.form_group}>
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
            // onClick={() => handleSubmit}
            onClick={() => handleLogin}
            className={styles.button}
            type="submit"
          >
            Login
          </button>
          {/* {error && <div style={{ color: "red" }}>{error}</div>}{" "} */}
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
