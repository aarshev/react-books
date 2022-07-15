import Navigation from "./Navigation"
import styles from './Header.module.css'

export const Header = () => {
    return(
        <header className={styles.header}>
            <div className={styles['header-div']}>
                <span className="">Book Library</span>
            </div>
            <Navigation/>
        </header>
    )
}