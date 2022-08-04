import { NavLink } from 'react-router-dom'
import styles from './Navigation.module.css'
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';

export default function Navigation(){
    const { user } = useContext(AuthContext);
    return(
        <nav className={styles.nav}>
            {user.email && <span className={styles.emailPlain}>User: <NavLink to={`/profile/${user._id}`} className={styles.email}>{user.email}</NavLink></span>}
            <ul className={styles.ul}>
                <li><NavLink className={styles.li} to='/catalog'>All books</NavLink></li>
                {user.email
                    ? <>
                        <li><NavLink className={styles.li} to='/create'>Add a book</NavLink></li>
                        <li><NavLink className={styles.li} to="/logout">Logout</NavLink></li>
                    </>
                    : <>
                        <li><NavLink className={styles.li} to="/login">Login</NavLink></li>
                        <li><NavLink className={styles.li} to="/register">Register</NavLink></li>
                    </>
                }
                
            </ul>
        </nav>
    )
}