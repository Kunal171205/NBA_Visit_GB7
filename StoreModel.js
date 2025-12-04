import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
  type: String,
  geometry: {
    type: { type: String },
    coordinates: [Number]
  },
  properties: {
    name: String,
    address: String,
    sector: String,
    category: String,
    phone: String,
    website: String
  }
});

export default mongoose.model("Store", storeSchema);
