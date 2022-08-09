import { useState, useEffect, useContext } from "react";
import * as bookService from '../../../services/bookService'
import { AuthContext } from "../../../contexts/AuthContext";

import styles from './UserBooks.module.css'


import { BookItem } from "../book-item/BookItem";


export const UserBooks = () => {
    const [books, setBooks] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        bookService.getBooksUser(user._id)
            .then(books => setBooks(books));
    }, []);

    return (
        <div className={styles.bookComponent}>
            {books.length > 0
                ? books.map(book =>
                    <BookItem
                        key={book._id} {...book}
                    />)
                : <h3 className={styles["bookItem"]}>You haven't added any books</h3>}


        </div>
    );
}
