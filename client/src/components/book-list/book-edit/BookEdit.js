import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import styles from './BookEdit.module.css'

import * as bookService from '../../../services/bookService';



export const BookEdit = () => {
    const [errors, setErrors] = useState({});
    const [currentBook, setCurrentBook] = useState({});
    const { bookId } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        bookService.getOne(bookId)
            .then(bookData => {
                setCurrentBook(bookData);
            })
    }, [])

    const changeHandler = (e) => {
        if (e.target.name == "genre") {
            setErrors(state => ({
                ...state,
                "genre": false,
            }));
        }
        setCurrentBook(state => ({
            ...state,
            [e.target.name]: e.target.type == 'checkbox' ? e.target.checked : e.target.value
        }));
    };

    const submitHandler = (e) => {
        e.preventDefault();

        const bookData = Object.fromEntries(new FormData(e.target))


        if (bookData.bookName.length < 3) {
            setErrors(state => ({
                ...state,
                "bookName": true,
            }));
            return;
        }
        if (bookData.author.length < 4) {
            setErrors(state => ({
                ...state,
                "author": true,
            }));
            return;
        }

        bookService.edit(bookId, bookData)
            .then(result => {
                navigate(`/catalog/${bookId}`);
            });
    };


    const cancelClickHandler = () => {
        navigate(`/catalog/${bookId}`);
    }

    const minLength = (e, bound) => {
        setErrors(state => ({
            ...state,
            [e.target.name]: e.target.value.length < bound,
        }));
    }

    const maxLength = (e, bound) => {

        setErrors(state => ({
            ...state,
            [e.target.name]: e.target.value.length > bound,
        }));

    }


    return (
        <div className={styles.wrapper}>
            <h1 className={styles.heading}>Edit book</h1>
            <form onSubmit={submitHandler}>
                <div>
                    <label className={styles.label} htmlFor="">Book name:</label>
                    <input
                        type="text"
                        id="bookName"
                        name="bookName"
                        placeholder="Book name"
                        defaultValue={currentBook.bookName}
                        onBlur={(e) => minLength(e, 3)}
                        className={styles.dropdown}
                    />
                    {errors.bookName &&
                        <p className={styles["form-error"]}>
                            Book name should be at least 3 characters long!
                        </p>
                    }
                </div>
                <div>
                    <label className={styles.label} htmlFor="">Author:</label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        placeholder="Author"
                        defaultValue={currentBook.author}
                        onBlur={(e) => minLength(e, 4)}
                        className={styles.dropdown}
                    />
                    {errors.author &&
                        <p className={styles["form-error"]}>
                            Author name should be at least 4 characters long!
                        </p>
                    }
                </div>
                <div>
                    <div>
                        <label className={styles.label} htmlFor="genre">Genre:</label>
                    </div>
                    <select className={styles.dropdown} name="genre" id="genre" value={currentBook.genre} onChange={changeHandler}>
                        <option value="0" disabled="disabled">-- Choose a genre --</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="Biography">Biography</option>
                        <option value="Mystery">Mystery</option>
                        <option value="Crime">Crime</option>
                    </select>
                </div>
                <div>
                    <label className={styles.label} htmlFor="">Cover Image:</label>
                    <input
                        type="text"
                        id="bookImage"
                        name="bookImage"
                        placeholder="Image URL"
                        defaultValue={currentBook.bookImage}
                        className={styles.dropdown}
                    />
                </div>
                <div>
                    <label className={styles.label} htmlFor="details">Details:</label>
                    <textarea className={styles.dropdown} name="details" id="details" cols="30" rows="10" defaultValue={currentBook.details} onBlur={(e) => maxLength(e, 60)} />
                    {errors.details &&
                        <p className={styles["form-error"]}>
                            Details should be at max 60 characters long!
                        </p>
                    }
                </div>
                <div className={styles.btnDiv} id="form-actions">
                    <button id="action-save" className={styles.btn} type="submit">Submit</button>
                    <button id="action-cancel" className={styles.btnCancel} type="button" onClick={cancelClickHandler}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}
