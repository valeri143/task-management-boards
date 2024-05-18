import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const card = new Schema(
  {
    title: {
      type: String,
      minlength: 2,
      maxlength: 70
    },
    
    description: {
      type: String,
      minlength: 3,
      maxlength: 170
    },
  },
  { versionKey: false}
);

const Card = mongoose.model("cards", card);

module.exports = Card;