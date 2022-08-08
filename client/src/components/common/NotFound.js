import styles from './Home.module.css'


import { Link } from 'react-router-dom'

export const NotFound = () => {
    return (
        <>
            <h2 className={styles.header}>The Page you are looking for does not exist</h2>
            <p className={styles.para}>
                <span>Please go back to the home page - <Link className={styles.link} to="/">Home</Link> </span>
            </p>
        </>
    )

}