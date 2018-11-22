const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema(
  {
    id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      lowercase: true,
      unique: true,
      trim: true,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
      index: true
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      trim: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      index: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
  { collection: 'users' }
);

UserSchema.plugin(uniqueValidator, { message: 'is already taken.' });

mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
