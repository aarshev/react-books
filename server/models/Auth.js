const {Schema, model, Types: { ObjectId }} = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = Number(process.env.SALTROUNDS) || 5;

const EMAIL_PATTERN = /.{6,}@([a-zA-Z]+)\.([a-zA-Z]+)$/

const userSchema = new Schema({
    email: {
        type: String, required: [true, 'Email is required'], validate:{
            validator(value){
                return EMAIL_PATTERN.test(value);
            },
            message: 'Email must be valid may contain only english letters'
        }
    }, 
    password: {
        type: String,
        required: true,
        minlength: [5, 'Password should be at least 5 characters'],
        validate: {
            validator: function (v) {
                return /[a-zA-Z0-9]+/g.test(v);
            },
            message: props => `${props.value} must contains only latin letters and digits!`
        },
    },
    books : { type: [ObjectId], ref: 'Book', default: []}
});

userSchema.methods = {
    matchPassword: function (password) {
        return bcrypt.compare(password, this.password);
    }
}

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) {
                next(err);
            }
            bcrypt.hash(this.password, salt, (err, hash) => {
                if (err) {
                    next(err);
                }
                this.password = hash;
                next();
            })
        })
        return;
    }
    next();
});


//for unique email
userSchema.index({ email: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;

