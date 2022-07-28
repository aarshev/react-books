const mongoose = require('mongoose');

const tokenBlacklistSchema = new mongoose.Schema({
    token: String,
}, { timestamps: { createdAt: 'created_at' } });


const Token = mongoose.model('TokenBlacklist', tokenBlacklistSchema);
module.exports = Token;