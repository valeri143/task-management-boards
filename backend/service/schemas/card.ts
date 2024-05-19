import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const card = new Schema(
  {
    title: {
      type: String,
      minlength: 2,
      maxlength: 70,
      required: true
    },
    
    description: {
      type: String,
      minlength: 3,
      maxlength: 170,
      required: true
    },
    column: {
      type: String,
      required: true,
      enum: ['To Do', 'In Progress', 'Done'] 
    }
  },
  { versionKey: false}
);

const Card = mongoose.model("cards", card);

module.exports = Card;