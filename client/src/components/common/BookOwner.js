import { useContext, useState, useEffect } from "react";
import { Outlet, useParams, Navigate } from "react-router-dom";
import { AuthContext } from '../../contexts/AuthContext';

import * as bookService from '../../services/bookService';

export default function BookOwner({ children }) {
    const { user } = useContext(AuthContext);
    const { bookId } = useParams();
    const [currentBook, setCurrentBook] = useState({});
    let isOwner = true;

    useEffect(() => {
        bookService.getOne(bookId)
            .then(bookData => {
                setCurrentBook(bookData.book);
            })
    }, []);


    if(currentBook.owner){
        isOwner = currentBook.owner === user._id;
        if (!isOwner) {
            return <Navigate to='/catalog' replace />
        }
    
        return children ? children : <Outlet />;
    }

    




};