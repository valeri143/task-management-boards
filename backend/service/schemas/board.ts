import mongoose, { Document, Model, Schema as MongooseSchema } from 'mongoose';
export interface IBoard extends Document {
  name: string;
  ToDo: mongoose.Types.ObjectId[];
  InProgress: mongoose.Types.ObjectId[];
  Done: mongoose.Types.ObjectId[];
}

const { Schema } = mongoose;

const board: MongooseSchema = new Schema(
  {
    name: {
      type: String,
      required: true, 
    },
    ToDo: [
      {
        type: Schema.Types.ObjectId,
        ref: "cards"
      }
    ],
    InProgress: [
      {
        type: Schema.Types.ObjectId,
        ref: "cards"
      }
    ],
    Done: [
      {
        type: Schema.Types.ObjectId,
        ref: "cards"
      }
    ]
  },
  { versionKey: false}
);

const Board: Model<IBoard> = mongoose.model<IBoard>("boards", board);

export default Board