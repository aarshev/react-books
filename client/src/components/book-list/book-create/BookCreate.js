import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './BookCreate.module.css'


export const BookCreate = ({onBookCreate}) =>{

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
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.type == 'checkbox' ? e.target.checked : e.target.value
        }));
    };

    const submitHandler = (e) =>{
        e.preventDefault();
        onBookCreate(values)
    }

    const cancelClickHandler = () =>{
        navigate('/');
    }

    return(
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
                        defaultValue={values.bookName}
                        className={styles.dropdown}
                    />
                </div>
                <div>
                    <label className={styles.label} htmlFor="">Author:</label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        placeholder="Author"
                        onChange={changeHandler}
                        defaultValue={values.author}
                        className={styles.dropdown}
                    />
                </div>
                <div>
                    <div>
                        <label className={styles.label} htmlFor="genre">Genre:</label>
                    </div>
                    <select className={styles.dropdown} name="genre" id="genre" value={values.genre} onChange={changeHandler}>
                        <option value="0">-- Choose a genre --</option>
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
                        onChange={changeHandler}
                        defaultValue={values.bookImage}
                        className={styles.dropdown}
                    />
                </div>
                <div>
                    <label className={styles.label} htmlFor="details">Details:</label>
                    <textarea className={styles.dropdown} name="details" id="details" cols="30" rows="10" value={values.details} onChange={changeHandler} />
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