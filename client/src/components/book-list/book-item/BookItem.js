import { Link } from 'react-router-dom';
export const BookItem = ({
    bookName,
    author,
    genre,
    bookImage,
    _id
}) => {
    return (
        <div className="bookItem">
            <img src={bookImage} alt="" />
            <h1>{bookName}</h1>
            <p>{author}</p>
            <p>{genre}</p>
            <Link to={`/catalog/${_id}`} className="details-button">
                    Details
            </Link>
            
        </div>
    )
}