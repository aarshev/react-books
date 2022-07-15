import { NavLink } from 'react-router-dom'
import styles from './Navigation.module.css'

export default function Navigation(){
    return(
        <nav>
            <ul className={styles.ul}>
                <li><NavLink className={styles.li} to='/'>Home</NavLink></li>
                <li><NavLink className={styles.li} to='/catalog'>All books</NavLink></li>
                <li><NavLink className={styles.li} to='/create'>Add a book</NavLink></li>
            </ul>
        </nav>
    )
}