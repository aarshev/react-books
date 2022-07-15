export const BookItem = ({
    bookName,
    author,
    genre,
    bookImage
}) => {
    return (
        <div className="bookItem">
            <img src={bookImage} alt="" />
            <h1>{bookName}</h1>
            <p>{author}</p>
            <p>{genre}</p>
            <button>Details</button>
            
        </div>
    )
}