import { useState } from "react";

import * as bookService from '../../services/bookService'
import { BookEdit } from "./book-edit/BookEdit";

import { BookItem } from "./book-item/BookItem";

const BookActions = {
    Details: 'details',
    Edit: 'edit',
    Delete: 'delete'
}

export const BookList = ({ books }) => {

    const [bookAction, setBookAction] = useState({ book: null, action: null });

    const userActionClickHandler = (bookId, actionType) => {
        bookService.getOne(bookId)
            .then(book => {
                setBookAction({
                    book,
                    action: actionType
                });
            });
    }

    const deleteClickHandler = (bookId) => {
        bookService.getOne(bookId)
            .then(book => {
                setBookAction({
                    book,
                    action: BookActions.Delete
                });
            });
    }

    return (
        <div className="bookComponent">
            {/* {
                bookAction.action == bookAction.Edit &&
                <BookEdit
                    book={bookAction.book}
                />
            } */}

            {books.map(book =>
                <BookItem
                    key={book._id} {...book}
                />)}
        </div>
    );
}
