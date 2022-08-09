import { useEffect, useState, lazy, Suspense } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { AuthContext } from './contexts/AuthContext';
import * as bookService from '../src/services/bookService'

import './reset.css'
import './App.css';

//import { Search } from './components/search/Search'
import { BookList } from './components/book-list/BookList';
import { BookDetails } from './components/book-list/book-details/BookDetails';
import { Home } from './components/common/Home';
import { Header } from './components/common/Header';
import { NotFound } from './components/common/NotFound';
import { Footer } from './components/common/Footer';
import { BookCreate } from './components/book-list/book-create/BookCreate';
import Login from './components/auth/Login/Login'
import Logout from './components/auth/Logout/Logout'
import { useLocalStorage } from "./hooks/useLocalStorage";
import { BookEdit } from './components/book-list/book-edit/BookEdit';
import PrivateGuard from "./components/common/PrivateGuard";
import { UserBooks } from './components/book-list/user-books/UserBooks';
import BookOwner from './components/common/BookOwner';

const Register = lazy(() => import('./components/auth/Register/Register'));

function App() {
    const [books, setBooks] = useState([]);
    const [auth, setAuth] = useLocalStorage('auth', {});
    const navigate = useNavigate();


    const userLogin = (authData) => {
        setAuth(authData);
    };

    const userLogout = () => {
        setAuth({});
    };

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
            <AuthContext.Provider value={{ user: auth, userLogin, userLogout }}>
                <Header />

                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={
                        <Suspense fallback={<span>Loading....</span>}>
                            <Register />
                        </Suspense>
                    } />

                    <Route path='/catalog' element={<BookList />} />
                    <Route path="/catalog/:bookId" element={<BookDetails books={books} />} />
                    <Route path="*" element={<NotFound />} />

                    <Route element={<BookOwner />}>
                        <Route path="/catalog/:bookId/edit" element={<BookEdit />} />
                    </Route>

                    <Route element={<PrivateGuard />}>
                        <Route path="/logout" element={<Logout />} />
                        <Route path='/create' element={<BookCreate onBookCreate={bookCreateHandler} />} />
                        <Route path="/profile/:userId" element={<UserBooks />} />
                    </Route>

                </Routes>

                <Footer />
            </AuthContext.Provider>
        </div>
    );
}

export default App;
