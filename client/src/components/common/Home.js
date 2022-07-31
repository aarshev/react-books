import styles from './Home.module.css'
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';

import { Link } from 'react-router-dom'

export const Home = () => {
    const { user } = useContext(AuthContext);
    return (
        <>
            <h2 className={styles.header}>Welcome to our shared library</h2>
            {!user.email && <p className={styles.para}>
                <span>If you dont have a profile, you can make a free one here - <Link className={styles.link} to="/register">Create Profile</Link> </span>
            </p>}
        </>
    )

}