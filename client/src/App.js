import { useEffect, useState } from 'react';

import * as bookService from '../src/services/bookService'

import { Header } from './components/common/Header'
import { Footer } from './components/common/Footer'
import { Search } from './components/search/Search'
import { BookList } from './components/book-list/BookList';
import './App.css';

function App() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        bookService.getAll()
            .then(books => setBooks(books));
    }, []);

    console.log(books);

    return (
        <div>
            <Header />

            <main>
                <button>Add Book</button>
                <Search />

                <BookList books={books}/>
            </main>

            <Footer />
        </div>
    );
}

export default App;
