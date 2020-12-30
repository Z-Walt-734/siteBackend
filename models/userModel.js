const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userModel = new Schema(
    {
      fName: {
        type: String,
        required: true,
      },

      lName: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
      },

      password: {
        type: String,
        required: true,
      },

      posts: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'postModel',
        },
      ],
    },
    {timestamps: true},
);

module.exports = mongoose.model('userModel', userModel);
