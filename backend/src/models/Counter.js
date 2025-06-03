import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
  key: {
    type: String,
    required: Number,
    unique: true,
  },
  seq: { type: Number, default: 1000 },
});

const Counter = mongoose.model("Counter", counterSchema);

export default Counter