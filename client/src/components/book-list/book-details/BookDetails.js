import * as bookService from '../../../services/bookService'
import { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../../../contexts/AuthContext";
import styles from './BookDetails.module.css'


export const BookDetails = ({
}) => {
    const { bookId } = useParams();
    const [currentBook, setCurrentBook] = useState({});
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    let isLiked = false;

    const isOwner = currentBook.owner === user._id




    useEffect(() => {
        bookService.getOne(bookId)
            .then(result => {
                setCurrentBook(result.book);
                if (result.book.likes.includes(user._id)) {
                    isLiked = true;
                    setToDisabled("likeBtn", result.book.likes.length)
                }
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

    const bookLikeHandler = () => {
        bookService.likeBook(bookId, { 'user': user._id })
            .then((book) => {
                setToDisabled("likeBtn", book.likes.length)
            });

    }

    const setToDisabled = (btnId, likes) => {
        let btn = document.getElementById(btnId)
        btn.disabled = true;
        btn.innerText = `Likes: ${likes}` ;
    }

    return (
        <div className={styles.bookItem}>
            <h1 className={styles.title}>Details</h1>
            <img className={styles.img} src={currentBook.bookImage} alt="" />
            <h1 className={styles.title}>{currentBook.bookName}</h1>
            <p className={styles.info}>Author: <span className={styles.bold}>{currentBook.author}</span></p>
            <p className={styles.info}>Genre: <span className={styles.bold}>{currentBook.genre}</span></p>
            <p className={styles.info}>Book details: <span className={styles.bold}>{currentBook.details}</span></p>
            {isOwner &&
                <div>
                    <Link className={styles.btnEdit} to={`/catalog/${bookId}/edit`}>
                        Edit
                    </Link>
                    <button className={styles.btnCancel} onClick={bookDeleteHandler}>Delete</button>
                </div>
            }
            {user.email &&!isOwner  &&
                <div>
                    <button id="likeBtn" className={styles.btnLike} onClick={bookLikeHandler}>Like</button>
                </div>
            }
            <button className={styles.btnBack} id="action-cancel" type="button" onClick={cancelClickHandler}>
                Back to library
            </button>
        </div>
    )
}