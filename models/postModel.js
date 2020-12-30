const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postModel = new Schema(
    {
      title: {
        type: String,
        required: true,
      },

      body: {
        type: String,
        required: true,
      },

      author: [
        {
          type: Schema.Types.ObjectId,
          ref: 'userModel',
        }],


    },
    {timestamps: true},
);

module.exports = mongoose.model('postModel', postModel);
