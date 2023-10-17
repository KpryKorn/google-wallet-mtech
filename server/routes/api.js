const express = require("express");
const router = express.Router();
const path = require("path");
const bodyParser = require("body-parser");

// middleware pour gérer les corps de requêtes PUT et POST
router.use(bodyParser.json());

// gère les requêtes spécifiques à iOS sous "/api/apple"
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

router.put("/apple", (req, res, next) => {
  try {
    const updatedAppleData = req.body;

    console.log(`Serveur: - Req Body: ${JSON.stringify(updatedAppleData)}`);

    res.json({ message: "Données mises à jour avec succès" });
  } catch (err) {
    next(err);
  }
});

// gère les requêtes spécifiques à android sous "/api/android"
router.get("/android", (req, res, next) => {
  try {
    res.send("Android");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
