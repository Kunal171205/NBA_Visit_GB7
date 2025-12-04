import express from "express";
import Store from "./StoreModel.js";
import storeList from "./storeList.js";

const router = express.Router();

// INSERT ALL INDUSTRIES (RUN IN BROWSER)
router.get("/insert", async (req, res) => {
  try {
    await Store.deleteMany();
    await Store.insertMany(storeList);
    res.json({ message: "Inserted Successfully!" });
  } catch (e) {
    res.status(500).json(e);
  }
});

// GET ALL INDUSTRIES
router.get("/all", async (req, res) => {
  const stores = await Store.find();
  res.json(stores);
});

export default router;
