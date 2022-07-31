import { Link } from 'react-router-dom';
import styles from './BookItem.module.css'

export const BookItem = ({
    bookName,
    author,
    genre,
    bookImage,
    _id
}) => {
    return (
        <div className={styles.bookItem}>
            <img className={styles.img} src={bookImage} alt="" />
            <h1 className={styles.title}>{bookName}</h1>
            <div className={styles.redLine}></div>
            <p className={styles.info}>Author: <span className={styles.bold}>{author}</span></p>
            <p className={styles.info}>Genre: <span className={styles.bold}>{genre}</span></p>
            <div className={styles.btnDiv}>
                <Link className={styles.btn} to={`/catalog/${_id}`} >
                    Details
                </Link>
            </div>
        </div>
    )
}