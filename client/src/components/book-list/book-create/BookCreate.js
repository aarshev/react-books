import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './BookCreate.module.css'


export const BookCreate = ({onBookCreate}) =>{

    const [values, setValues] = useState({
        bookName: '',
        author: '',
        genre: '0',
        imageUrl: '',
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
                    <label htmlFor="">Book name:</label>
                    <input
                        type="text"
                        id="bookName"
                        name="bookName"
                        placeholder="Book name"
                        onChange={changeHandler}
                        value={values.bookName}
                    />
                </div>
                <div>
                    <label htmlFor="">Author:</label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        placeholder="Author"
                        onChange={changeHandler}
                        value={values.author}
                    />
                </div>
                <div>
                    <label htmlFor="genre">Genre:</label>
                    <select name="genre" id="genre" value={values.genre} onChange={changeHandler}>
                        <option value="0">-- Choose a genre --</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="Biography">Biography</option>
                        <option value="Mystery">Mystery</option>
                        <option value="Crime">Crime</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="">Cover Image:</label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        placeholder="Image URL"
                        onChange={changeHandler}
                        value={values.imageUrl}
                    />
                </div>
                <div>
                    <label htmlFor="details">Details:</label>
                    <textarea name="details" id="details" cols="30" rows="10" value={values.details} onChange={changeHandler} />
                </div>
                <div id="form-actions">
                    <button id="action-save" className="btn" type="submit">Submit</button>
                    <button id="action-cancel" className="btn" type="button" onClick={cancelClickHandler}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}