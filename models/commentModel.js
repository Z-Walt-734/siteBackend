const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentModel = new Schema(
    {
      comment: {
        type: String,
        required: true,
      },

      post: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'postModel',
        },
      ],

      author: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'userModel',
        },
      ],
    },
);

module.exports = mongoose.model('commentModel', commentModel);
