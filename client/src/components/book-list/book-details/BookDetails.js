import * as bookService from '../../../services/bookService'
import { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../../../contexts/AuthContext";
import styles from './BookDetails.module.css'


export const BookDetails = ({
}) => {
    const { bookId } = useParams();
    const [currentGame, setCurrentBook] = useState({});
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    console.log(user);

    useEffect(() => {
        bookService.getOne(bookId)
            .then(result => {
                setCurrentBook(result);
            });
    }, [])

    const cancelClickHandler = () => {
        navigate(`/catalog`);
    }

    const bookDeleteHandler = () => {
        const confirmation = window.confirm('Are you sure you want to delete this book?');

        if (confirmation) {
            bookService.remove(bookId)
                .then(() => {
                    navigate('/catalog');
                })
        }
    }

    return (
        <div className={styles.bookItem}>
            <h1 className={styles.title}>Details</h1>
            <img className={styles.img} src={currentGame.bookImage} alt="" />
            <h1 className={styles.title}>{currentGame.bookName}</h1>
            <p className={styles.info}>Author: <span className={styles.bold}>{currentGame.author}</span></p>
            <p className={styles.info}>Genre: <span className={styles.bold}>{currentGame.genre}</span></p>
            <p className={styles.info}>Book details: <span className={styles.bold}>{currentGame.details}</span></p>
            <div><Link className={styles.btnEdit} to={`/catalog/${bookId}/edit`}>
                Edit
            </Link>
                <button className={styles.btnCancel} onClick={bookDeleteHandler}>Delete</button>
            </div>
            <button className={styles.btnBack} id="action-cancel" type="button" onClick={cancelClickHandler}>
                Back to library
            </button>
        </div>
    )
}