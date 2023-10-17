const express = require("express");
const router = express.Router();
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");
const archiver = require("archiver");

const customWritePath = path.join(
  __dirname,
  "../iOS/CarteAdherent.pass/pass.json"
);

// TODO : remplacer par vrai fichier .pkpass
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

router.put("/apple", (req, res, next) => {
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
      console.log("Fichier JSON enregistré avec succès.");
      res.json({ message: "Données mises à jour avec succès" });
    });
  } catch (err) {
    next(err);
  }
});

// TODO : zip le fichier .pass
const output = fs.createWriteStream("CarteAdherent.zip");
const archive = archiver("zip", { zlib: { level: 9 } });

// Écrit l'archive sur le disque
output.on("close", () => {
  console.log("Archive créée avec succès");
});

archive.on("error", (err) => {
  throw err;
});

archive.pipe(output);

// Ajoute le dossier à l'archive
archive.directory(path.join(__dirname, "../iOS/CarteAdherent.pass"), false);

// Finalise l'archive
archive.finalize();

// TODO : changer extension du fichier .zip en .pkpass
fs.rename("CarteAdherent.zip", "CarteAdherent.pkpass", (err) => {
  if (err) throw err;
  console.log("Le fichier a été renommé avec succès");
});

// télécharge le fichier .pkpass
router.get("/apple/download", (req, res, next) => {
  res.download(customDownloadPath);
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
