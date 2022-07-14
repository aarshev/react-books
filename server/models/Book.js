const {Schema, model, Types: { ObjectId }} = require('mongoose');

const URL_PATTERN = /^http{1}s?:\/\/(.+)/;

const bookSchema = new Schema({
    bookName : { type: String, minlength: [3, 'Book Name must be at least 3 characters long']}
    , author  : { type: String, minlength: [4, 'Book Author name must be at least 4 characters long'] }
    , genre  : { type: String, required: true, enum: ['Fantasy', 'Biography', 'Mystery', 'Crime'] }
    , bookImage  : { type: String}
    , details : { type: String, maxlength: [60, 'Description must be max 60 symbols'] }
    , owner : { type: ObjectId, ref: 'User', required: true }
    ,
    isDeleted: {
      type: Boolean,
      default: false,
    }
},
{ timestamps: true });

const bookModel = model('Book', bookSchema);

module.exports = {bookModel};
