import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const board = new Schema(
  {
    name: {
      type: String,
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

const Board = mongoose.model("boards", board);

module.exports = Board;