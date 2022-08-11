import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './BookCreate.module.css'


export const BookCreate = ({ onBookCreate }) => {

    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        bookName: '',
        author: '',
        genre: '0',
        bookImage: '',
        details: '',
        owner: JSON.parse(localStorage.auth)._id
    });
    const navigate = useNavigate();

    const changeHandler = (e) => {
        if (e.target.name == "genre") {
            setErrors(state => ({
                ...state,
                "genre": false,
            }));
        }
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.type == 'checkbox' ? e.target.checked : e.target.value
        }));
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (values["bookName"].length == 0) {
            setErrors(state => ({
                ...state,
                "bookName": true,
            }));
            return;
        }
        if (values["author"].length == 0) {
            setErrors(state => ({
                ...state,
                "author": true,
            }));
            return;
        }
        if (values["genre"] == 0) {
            setErrors(state => ({
                ...state,
                "genre": true,
            }));
            return;
        }

        onBookCreate(values)
    }

    const cancelClickHandler = () => {
        navigate('/');
    }

    const minLength = (e, bound) => {
        setErrors(state => ({
            ...state,
            [e.target.name]: values[e.target.name].length < bound,
        }));
    }

    const maxLength = (e, bound) => {

        setErrors(state => ({
            ...state,
            [e.target.name]: values[e.target.name].length > bound,
        }));

    }

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.heading}>Add a book</h1>
            <form onSubmit={submitHandler}>
                <div>
                    <label className={styles.label} htmlFor="">Book name:</label>
                    <input
                        type="text"
                        id="bookName"
                        name="bookName"
                        placeholder="Book name"
                        onChange={changeHandler}
                        onBlur={(e) => minLength(e, 3)}
                        value={values.bookName}
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
                        onChange={changeHandler}
                        onBlur={(e) => minLength(e, 3)}
                        value={values.author}
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
                    <select className={styles.dropdown} name="genre" id="genre" value={values.genre} onChange={changeHandler}>
                        <option value="0" disabled="disabled">-- Choose a genre --</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="Biography">Biography</option>
                        <option value="Mystery">Mystery</option>
                        <option value="Crime">Crime</option>
                    </select>
                    {errors.genre &&
                        <p className={styles["form-error"]}>
                            You must select a genre!
                        </p>
                    }
                </div>
                <div>
                    <label className={styles.label} htmlFor="">Cover Image:</label>
                    <input
                        type="text"
                        id="bookImage"
                        name="bookImage"
                        placeholder="Image URL"
                        onChange={changeHandler}
                        value={values.bookImage}
                        className={styles.dropdown}
                    />
                </div>
                <div>
                    <label className={styles.label} htmlFor="details">Details:</label>
                    <textarea className={styles.dropdown} name="details" id="details" cols="30" rows="10" value={values.details} onChange={changeHandler} onBlur={(e) => maxLength(e, 60)} />
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