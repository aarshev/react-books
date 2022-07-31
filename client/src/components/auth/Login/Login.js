import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import { AuthContext } from "../../../contexts/AuthContext";
import * as authService from "../../../services/authService";

import styles from './Login.module.css'

const Login = () => {
    const { userLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();

        const {
            email,
            password,
        } = Object.fromEntries(new FormData(e.target));

        authService.login(email, password)
            .then(authData => {
                userLogin(authData);
                navigate('/');
            })
            .catch(() => {
                navigate('/404');
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