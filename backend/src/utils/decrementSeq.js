import Counter from "../models/Counter.js";

const decrementSeq = async (key) => {
  const counter = await Counter.findOne({ key });

  if (!counter || counter.seq <= 1) {
    return counter?.seq || 1; // Do nothing or return minimum
  }

  const updated = await Counter.findOneAndUpdate(
    { key },
    { $inc: { seq: -1 } },
    { new: true }
  );

  return updated.seq;
};

export default decrementSeq;
