import {useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import { AuthContext } from "../../../contexts/AuthContext";
import * as authService from "../../../services/authService";

import styles from './Login.module.css'

const Login = () => {
    const { userLogin } = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();

        const {
            email,
            password,
        } = Object.fromEntries(new FormData(e.target));

        authService.login(email, password)
            .then(authData => {
                if(authData.message)
                {
                    throw new Error("error");
                }
                userLogin(authData);
                navigate('/')
                
            })
            .catch((e) => {
                setErrors(state => ({
                    ...state,
                    "login": true,
                }));
            });
    };

    return (
        <div id="login-page" className={styles.wrapper}>
            <form id="login" onSubmit={onSubmit}>
                <div>
                    <div />
                    <h1 className={styles.heading}>Login</h1>
                    <div>
                        <label className={styles.label} htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="aarshev@gmail.com"
                            className={styles.dropdown}
                        />
                    </div>
                    <div>
                        <label className={styles.label} htmlFor="login-pass">Password:</label>
                        <input className={styles.dropdown} type="password" id="login-password" name="password" />
                        {errors.login &&
                        <p className={styles["form-error"]}>
                            Email or password do not match!
                        </p>
                    }
                    </div>
                    <div className={styles.btnDiv}>
                        <button className={styles.btn} type="submit" defaultValue="Login">Submit</button>
                    </div>
                    <p className="field">
                        <span >
                            If you don't have profile click <Link className={styles.link} to="/register">here</Link>
                        </span>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Login;