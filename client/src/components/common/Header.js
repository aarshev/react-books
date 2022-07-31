import Navigation from "./Navigation"
import styles from './Header.module.css'
import { NavLink } from 'react-router-dom';


export const Header = () => {
    return(
        <header className={styles.header}>
            <div className={styles['header-div']}>
            <NavLink className={styles.link} to="/">
                    Book Library
            </NavLink>
            </div>
            <Navigation/>
        </header>
    )
}