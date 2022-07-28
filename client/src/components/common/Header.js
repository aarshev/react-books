import Navigation from "./Navigation"
import styles from './Header.module.css'
import { Link } from 'react-router-dom';


export const Header = () => {
    return(
        <header className={styles.header}>
            <div className={styles['header-div']}>
            <Link className="home" to="/">
                    Book Library
                </Link>
            </div>
            <Navigation/>
        </header>
    )
}