const { bookModel } = require('../models/Book');
const { errorHandler } = require('../utils/errorHandler');
const { ValidationError } = require('../utils/createValidationError');

const getBook = async (req, res) => {
  const { bookId } = req.params;

  try {
    const book = await bookModel.findById(bookId, '-__v -isDeleted');

    if (!book) {
      throw new ValidationError('There is no such book with provided id.', 404);
    }

    res.status(200).json({ book: book.toObject() });
  } catch (error) {
    errorHandler(error, res, req);
  }
};

const addBook = async (req, res) => {
  const { bookName, author, genre, bookImage, details } = req.body;
  const data = { bookName, author, genre, bookImage, details};
  try {
    const createdBook = await bookModel.create({ ...data });
    console.log(createdBook);
    const book = { ...data, createdAt: createdBook.createdAt, updatedAt: createdBook.updatedAt };

    res.status(200).json({ book });
  } catch (error) {
    errorHandler(error, res, req);
  }
};

const updateBook = async (req, res) => {
  const { bookId } = req.params;
  const { bookName, author, genre, bookImage, details } = req.body;
  const data = { bookName, author, genre, bookImage, details };

  try {
    const book = await bookModel
      .findByIdAndUpdate(bookId, data, { runValidators: true, new: true })
      .select('bookName author genre bookImage details createdAt updatedAt');

    res.status(200).json({ book: book.toObject() });
  } catch (error) {
    errorHandler(error, res, req);
  }
};

const deleteBook = async (req, res) => {
  const { bookId } = req.params;

  try {
    await bookModel.findByIdAndUpdate(bookId, { isDeleted: true });

    res.status(200).json({ bookId });
  } catch (error) {
    errorHandler(error, res, req);
  }
};

const getBooks = async (req, res) => {
  const page = parseInt(req?.query?.page) || 1;
  const limit = parseInt(req?.query?.limit) || 5;
  const sort = req?.query?.sort;
  const order = req?.query?.order;
  const search = req?.query?.search;
  const criteria = (req?.query?.criteria || '').trim();
  const skipIndex = (page - 1) * limit;

  const query = { isDeleted: false };
  const sortCriteria = {};

  if (sort && sort !== 'null' && order && order !== 'null') {
    sortCriteria[sort] = order;
  }

  if (search && search !== 'null' && criteria && criteria !== 'null') {
    query[criteria] = criteria == '_id' ? search : new RegExp(search, 'i');
  }

  try {
    const count = await bookModel.countDocuments(query);
    let books = await bookModel
      .find(query)
      .select('bookName author genre bookImage details createdAt updatedAt')
      .limit(limit)
      .skip(skipIndex)
      .sort(sortCriteria)
      .lean();

    res.status(200).json({ books, count });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(200).json({ books: [], count: 0 });
    }

    errorHandler(error, res, req);
  }
};

module.exports = {
  getBook,
  addBook,
  updateBook,
  deleteBook,
  getBooks,
};
