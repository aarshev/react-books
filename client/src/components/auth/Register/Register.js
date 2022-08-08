import { useState, useContext } from "react";
import { useNavigate, Link } from 'react-router-dom';

import { AuthContext } from "../../../contexts/AuthContext";
import * as authService from "../../../services/authService";

import styles from './Register.module.css'

const Register = () => {
    const { userLogin } = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirm-password');

        if (password !== confirmPassword) {
            return;
        }

        authService.register(email, password)
            .then(authData => {
                if (authData.message) {
                    throw new Error("error")
                }
                userLogin(authData);
                navigate('/');
            }).catch((e) => {
                console.log(e)
                setErrors(state => ({
                    ...state,
                    "register": true,
                }));
            });;
    }

    return (
        <div id="register-page" className={styles.wrapper}>
            <form id="register" onSubmit={onSubmit}>
                <div >
                    <div />
                    <h1 className={styles.heading}>Register</h1>
                    <div>
                        <label className={styles.label} htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="aarshev@email.com"
                            className={styles.dropdown}
                        />
                    </div>
                    <div>
                        <label className={styles.label} htmlFor="pass">Password:</label>
                        <input className={styles.dropdown} type="password" name="password" id="register-password" />
                    </div>
                    <div>
                        <label className={styles.label} htmlFor="con-pass">Confirm Password:</label>
                        <input className={styles.dropdown} type="password" name="confirm-password" id="confirm-password" />
                        {errors.register &&
                            <>
                                <p className={styles["form-error"]}>
                                    Email must contain only English letters.
                                </p>
                                <p className={styles["form-error"]}>
                                    Password must be at least 5 letters and/or numbers and should match Confirm password.
                                </p>
                            </>
                        }
                    </div>
                    <div className={styles.btnDiv}>
                        <button className={styles.btn} type="submit" defaultValue="Register" >Submit</button>
                    </div>
                    <p >
                        <span>
                            If you already have profile click <Link className={styles.link} to="/login">here</Link>
                        </span>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Register;