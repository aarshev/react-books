import * as bookService from '../../../services/bookService'
import { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../../../contexts/AuthContext";


export const BookDetails = ({
}) => {
    const { bookId } = useParams();
    const [currentGame, setCurrentBook] = useState({});
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    console.log(user);

    useEffect(() => {
        bookService.getOne(bookId)
            .then(result => {
                setCurrentBook(result);
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

    return (
        <div className="bookItem">
            <img src={currentGame.bookImage} alt="" />
            <h1>{currentGame.bookName}</h1>
            <p>{currentGame.author}</p>
            <p>{currentGame.genre}</p>
            <p>{currentGame.details}</p>
            <Link to={`/catalog/${bookId}/edit`} className="button">
                Edit
            </Link>
            <button onClick={bookDeleteHandler}>Delete</button>
            <button id="action-cancel" className="btn" type="button" onClick={cancelClickHandler}>
                Back to library
            </button>
        </div>
    )
}