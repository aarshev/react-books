import {  useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import styles from './BookEdit.module.css'

import * as bookService from '../../../services/bookService';



export const BookEdit = () => {
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
        setCurrentBook(state => ({
            ...state,
            [e.target.name]: e.target.type == 'checkbox' ? e.target.checked : e.target.value
        }));
    };

    const submitHandler = (e) => {
        e.preventDefault();
    
        const bookData = Object.fromEntries(new FormData(e.target));
    
        bookService.edit(bookId, bookData)
            .then(result => {
                navigate(`/catalog/${bookId}`);
            });
    };
    
    
    const cancelClickHandler = () => {
        navigate(`/catalog/${bookId}`);
    }
    


    return (
        <div className={styles.wrapper}>
            <h1 className={styles.heading}>Edit book</h1>
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor="">Book name:</label>
                    <input
                        type="text"
                        id="bookName"
                        name="bookName"
                        placeholder="Book name"
                        defaultValue={currentBook.bookName}
                    />
                </div>
                <div>
                    <label htmlFor="">Author:</label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        placeholder="Author"
                        defaultValue={currentBook.author}
                    />
                </div>
                <div>
                    <label htmlFor="genre">Genre:</label>
                    <select name="genre" id="genre" value={currentBook.genre} onChange={changeHandler}>
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
                        id="bookImage"
                        name="bookImage"
                        placeholder="Image URL"
                        defaultValue={currentBook.bookImage}
                    />
                </div>
                <div>
                    <label htmlFor="details">Details:</label>
                    <textarea name="details" id="details" cols="30" rows="10" defaultValue={currentBook.details}  />
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
