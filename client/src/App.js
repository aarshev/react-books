import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import * as bookService from '../src/services/bookService'

import './reset.css'
import './App.css';

import { Search } from './components/search/Search'
import { BookList } from './components/book-list/BookList';
import { Home } from './components/common/Home';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { BookCreate } from './components/book-list/book-create/BookCreate';

function App() {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        bookService.getAll()
            .then(books => setBooks(books));
    }, []);

    const bookCreateHandler = (bookData) => {
        bookService.create(bookData)
            .then(book => {
                setBooks(oldBooks => [...oldBooks, book]);
                navigate('/catalog');
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <div>
            <Header/>
            {/* <main>
                <button>Add Book</button>
                <Search />

                <BookList books={books}/>
            </main> */}

            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/catalog' element={<BookList  books={books}/>} />
                <Route path='/create' element={<BookCreate onBookCreate={bookCreateHandler}/>} />
            </Routes>

            <Footer/>
        </div>
    );
}

export default App;
