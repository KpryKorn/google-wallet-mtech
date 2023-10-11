const express = require("express");
const router = express.Router();
const path = require("path");

// gère les requêtes GET spécifiques à iOS sous "/api/apple"
router.get("/apple", (req, res, next) => {
  try {
    const filePath = path.join(
      __dirname,
      "../iOS/carteAdherent.pass/pass.json"
    );
    res.sendFile(filePath);
  } catch (err) {
    next(err);
  }
});

// gère les requêtes GET spécifiques à android sous "/api/android"
router.get("/android", (req, res, next) => {
  try {
    res.send("Android");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
