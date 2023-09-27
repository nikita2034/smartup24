
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from '../../store/slices/userSlice';
import styles from './LoginForm.module.scss';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
interface LoginFormProps {
  onClose: () => void;
}

function LoginForm ({ onClose }:LoginFormProps){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(email,password);
    onClose();
  };


  const handleLogin = (email:string, password:string) => {
    const auth = getAuth();
    
        signInWithEmailAndPassword(auth, email, password)
          .then(({ user }) => {
            console.log(user)
              dispatch(
              setUser({
                email: user.email|| '',
                id: user.uid,
                name:'peter',
                auth:true
              })  
            );
            localStorage.setItem('userData', JSON.stringify(user));
            navigate("/main");
          
          })
          // блок для отработки различных ошибок при авторизации
          .catch((error) => {
            // if (error.message == "Firebase: Error (auth/user-not-found).") {
            //   setErrorDescription(
            //     "The user was not found. Check that your username and correct!"
            //   );
            //   setSpinner(!spinner);
            // }
            // if (error.message == "Firebase: Error (auth/internal-error).") {
            //   setErrorDescription("Fill in the password field!");
            //   setSpinner(!spinner);
            // }
            // if (error.message == "Firebase: Error (auth/invalid-email).") {
            //   setErrorDescription("Invalid email value!");
            //   setSpinner(!spinner);
            // }
            // if (error.message == "Firebase: Error (auth/wrong-password).") {
            //   setErrorDescription("Wrong password!");
            //   setSpinner(!spinner);
            // }
          });
  };


  return (
    <div className={styles.login_form_overlay}>
      <div className={styles.login_form_container}>
        <button className={styles.close_button} onClick={onClose}>
          X
        </button>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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
          <button onClick={()=>handleSubmit} className={styles.button} type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;