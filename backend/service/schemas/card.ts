import mongoose, { Document, Model, Schema as MongooseSchema } from 'mongoose';
export interface ICard extends Document {
  title: string;
  description: string;
  column: 'To Do' | 'In Progress' | 'Done';
  boardId: string;
}

const { Schema } = mongoose;

const card: MongooseSchema = new Schema(
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
    },
    boardId:{
      type: String,
      required: true,
      ref: 'boards'
    }
  },
  { versionKey: false}
);

const Card: Model<ICard> = mongoose.model<ICard>("cards", card);

export default Card;