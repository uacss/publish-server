const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: 1
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    }
  },
  { collection: 'users' }
);

mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
