const express = require("express");
const router = express.Router();
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");
const zipper = require("../common/zipper");

const customWritePath = path.join(
  __dirname,
  "../iOS/CarteAdherent.pass/pass.json"
);

const customDownloadPath = path.join(__dirname, "../CarteAdherent.pkpass");

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

// lors d'une requête PUT => met à jour les données; crée l'archive
router.put("/apple", async (req, res, next) => {
  try {
    const updatedAppleData = req.body; // Corps de la requête
    // enregistre les données dans un fichier JSON
    fs.writeFile(customWritePath, JSON.stringify(updatedAppleData), (err) => {
      if (err) {
        console.error("Erreur lors de l'enregistrement du fichier JSON :", err);
        return res
          .status(500)
          .json({ error: "Erreur lors de l'enregistrement du fichier JSON" });
      }
      console.log("---> Fichier JSON enregistré avec succès.");
      zipper
        .zipAndRename()
        .then(() => {
          res.sendStatus(200);
        })
        .catch((err) => {
          console.error("Erreur lors de la création de l'archive :", err);
          return res
            .status(500)
            .json({ error: "Erreur lors de la création de l'archive" });
        });
    });
  } catch (err) {
    next(err);
  }
});

// gère le téléchargement du .pkpass
router.get("/apple/download", (req, res, next) => {
  res.download(customDownloadPath, (err) => {
    if (err) {
      console.error("Erreur lors du téléchargement du fichier :", err);
      return res
        .status(500)
        .json({ error: "Erreur lors du téléchargement du fichier" });
    }
  });
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
