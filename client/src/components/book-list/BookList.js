import { useState, useEffect } from "react";
import * as bookService from '../../services/bookService'

import styles from './BookList.module.css'


import { BookItem } from "./book-item/BookItem";


export const BookList = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        bookService.getAll()
            .then(books => setBooks(books));
    }, []);

    return (
        <div className={styles.bookComponent}>
            {books.length > 0
                ? books.map(book =>
                    <BookItem
                        key={book._id} {...book}
                    />)
                : <h3 className="bookItem">No books yet</h3>}


        </div>
    );
}
