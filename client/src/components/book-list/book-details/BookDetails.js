import * as bookService from '../../../services/bookService'
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';


export const BookDetails = ({
}) => {
    const { bookId } = useParams();
    const [currentGame, setCurrentBook] = useState({});

    useEffect(() => {
        bookService.getOne(bookId)
            .then(result => {
                setCurrentBook(result);
            });
    })


    return (
        <div className="bookItem">
            <img src={currentGame.bookImage} alt="" />
            <h1>{currentGame.bookName}</h1>
            <p>{currentGame.author}</p>
            <p>{currentGame.genre}</p>
            <p>{currentGame.details}</p>
            <button>Edit</button>
            <button>Delete</button>
            
        </div>
    )
}